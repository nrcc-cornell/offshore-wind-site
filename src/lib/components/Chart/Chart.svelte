<script lang="ts">
  import { LayerCake, Svg, Html, flatten } from 'layercake';
  import { scaleOrdinal } from 'd3-scale';
  
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import MultiLine from './MultiLine.svelte';
  import SharedTooltip from './SharedTooltip.svelte';
  import Key from './Key.html.svelte';
  import Export from './Export.html.svelte';
  import ScatterSvg from './Scatter.svg.svelte';
  
  type ChartProps = {
    groupedData: ChartGroupItem[];
    chartId: string;
    metadata: Metadata;
  }

  type ShareTooltipDataItem = {
    year: number;
    [x:string]: number;
  }

  let { groupedData, chartId, metadata }: ChartProps = $props();

  const xKey = 'year';
  const yKey = 'value';
  const zKey = 'group';
  const seriesColors = ['#950B3080', '#0085CA'];

  let flatData = $derived(groupedData.reduce((acc, groupObj) => {
    groupObj.values.forEach(({ value, year, group }) => {
      const foundIdx = acc.findIndex((obj: ShareTooltipDataItem) => obj.year === year);
      if (foundIdx === -1) {
        acc.push({ year, [group]: value });
      } else {
        acc[foundIdx][group] = value;
      }
    });
    return acc;
  }, [] as ShareTooltipDataItem[]));
  $inspect(groupedData);
</script>

<div class="chart-container">
  <LayerCake
    padding={{ top: 21, right: 10, bottom: 35, left: 35 }}
    x={xKey}
    y={yKey}
    z={zKey}
    yDomain={[0, null]}
    zScale={scaleOrdinal()}
    zRange={seriesColors}
    flatData={flatten(groupedData, 'values')}
    data={groupedData}
  >
    <Svg>
      <AxisX
        gridlines={false}
        tickMarks
        title='Year'
        titleGutter={13}
      />
      <AxisY
        ticks={4}
        title='Event Count'
        titleGutter={23}
      />
      <MultiLine />
      <ScatterSvg />
    </Svg>

    <Html pointerEvents={false}>
      <Key shape="line" gutter={3} />
    </Html>

    <Html>
      <Export node={chartId} align='end' gutter={6} data={groupedData} {metadata} />
      <SharedTooltip dataset={flatData} />
    </Html>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
    margin-top: 15px;
  }
</style>