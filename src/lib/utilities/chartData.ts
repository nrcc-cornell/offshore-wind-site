import { dataType } from "$lib/constants";

function convertDataTypeData(
  dataType: { name: DataTypeNames, displayName: DataTypeDisplayNames },
  data: FetchFileDataProp,
  selectedSpatial: SpatialNames,
  selectedWindSpeed: WindSpeedNames,
  selectedRegion: RegionNames,
  selectedTimeFrame: TimeFrameNames
): ChartGroupItem {
  const values: number[] = data[dataType.name]['data'][selectedSpatial][selectedWindSpeed][selectedRegion][selectedTimeFrame];
  const lastYear = parseInt(data[dataType.name]['end_month'].slice(0,4));
  const startYear = lastYear - (values.length - 1);

  const timeseries = [];
  for (let i = 0; i < values.length; i++) {
    timeseries.push({
      value: values[i],
      year: startYear + i,
      group: dataType.displayName
    });
  }
  return { group: dataType.displayName, values: timeseries };
}

export default function convertToChartData(
  data: FetchFileDataProp,
  selectedSpatial: SpatialNames,
  selectedWindSpeed: WindSpeedNames,
  selectedRegion: RegionNames|null,
  selectedTimeFrame: TimeFrameNames
): ChartGroupItem[] {
  if (selectedRegion === null) {
    return [];
  } else {
    return dataType.map(d => convertDataTypeData(d, data, selectedSpatial, selectedWindSpeed, selectedRegion, selectedTimeFrame));
  }
}