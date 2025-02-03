import { toPng, toJpeg, toSvg } from 'html-to-image';

const converters = {
  'png': {
    fn: toPng,
    ext: 'png'
  }, 
  'jpeg': {
    fn: toJpeg,
    ext: 'jpeg'
  }, 
  'svg': {
    fn: toSvg,
    ext: 'svg'
  }
};

export type ConverterNames = keyof typeof converters;

function filter(node: HTMLElement, excludeClasses: string[]) {
  return !excludeClasses.some((classname) => node.classList?.contains(classname));
}

export function downloadNodeAs(converterName: ConverterNames, nodeId: string, outputFileName: string, excludeClasses: string[]) {
  const { fn, ext } = converters[converterName];
  const node = document.getElementById(nodeId);
  if (node !== null) {
    fn(node, { filter: (node: HTMLElement) => filter(node, excludeClasses || []) })
      .then(dataUrl => {
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = dataUrl;
        link.target = '_self';
        link.download = `${outputFileName}.${ext}`;
        link.click();
      });
  }
}

type Dataset = {
  earliest: number;
  latest: number;
  data: number[];
  groupName: string;
}

export function downloadCsv(data: ChartGroupItem[], filename: string, metadata: Metadata) {
  const csvData: (string|number)[][] = [
    ['Wind Speed', metadata.windspeed],
    ['Region', metadata.region],
    ['Timeframe', metadata.timeframe],
    ['Event Area Coverage', metadata.spatial],
    ['']
  ];
  
  // Extract earliest and latest years to align datasets, convert datasets to usable format
  const datasets: Dataset[] = [];
  let earliestYear = Infinity;
  let latestYear = -Infinity;
  data.forEach(row => {
    const dataset: Dataset = {
      earliest: row.values[0].year,
      latest: row.values[row.values.length - 1].year,
      data: row.values.map(r => r.value),
      groupName: row.group
    };
    datasets.push(dataset);
    if (dataset.earliest < earliestYear) earliestYear = dataset.earliest;
    if (dataset.latest > latestYear) latestYear = dataset.latest;
  });

  if (earliestYear !== Infinity && latestYear !== -Infinity) {
    // Sets up header for CSV output
    const headerIdx = csvData.length;
    csvData.push(['Year']);

    // Create rows for each year
    for (let year = earliestYear; year <= latestYear; year++) {
      csvData.push([year]);      
    }
    
    // Add data to each row for each dataset/line
    datasets.forEach(({ earliest, latest, data, groupName }) => {
      csvData[headerIdx].push(groupName);

      let prepend: (string|number)[] = [];
      let append: (string|number)[] = [];
      if (earliest !== earliestYear) {
        prepend = [...new Array(earliest - earliestYear)].map(() => '');
      }
      if (latest !== latestYear) {
        append = [...new Array(latestYear - latest)].map(() => '');
      }
      
      const csvDataset = prepend.concat(data, append);
      csvDataset.forEach((v, i) => csvData[i + 1 + headerIdx].push(v));
    });
  }

  // Convert data to string for export
  const csvString = csvData.map(row => row.join(',')).join('\r\n');

  // Download data to file
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
}