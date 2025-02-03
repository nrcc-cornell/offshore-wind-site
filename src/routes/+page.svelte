<script lang="ts">
  import {
    RegionalMap,
    Options,
    Chart
  } from '$lib/components';
  import convertToChartData from '$lib/utilities/chartData';
  import { regions, spatial, timeFrame, windSpeed } from "$lib/constants";
  import { addToast } from '$lib/stores/toast.store.js';

  type PageProps = {
    data: FetchFileDataProp;
  }

	let { data }: PageProps = $props();

  // Display error notifications if data fetching fails
  if (data) {
    if (data.noaa.message !== undefined) {
      addToast({
        message: data.noaa.message,
        type: "error",
        dismissible: true,
        timeout: 0
      });
    }
    if (data.era5.message !== undefined) {
      addToast({
        message: data.era5.message,
        type: "error",
        dismissible: true,
        timeout: 0
      });
    }
  }

  // Set up state to hold user selections for data filtering
  let selectedRegion: RegionNames|null = $state(null);
  let selectedWindSpeed: WindSpeedNames = $state(windSpeed[0].name);
  let selectedSpatial: SpatialNames = $state(spatial[0].name);
  let selectedTimeFrame: TimeFrameNames = $state(timeFrame[0].name);
  
  let chartData = $derived(convertToChartData(data, selectedSpatial, selectedWindSpeed, selectedRegion, selectedTimeFrame));
  const chartId = 'chart-1';
</script>

<div class="w-full max-w-[1500px] min-w-[350px] mx-auto flex flex-col gap-4 items-center box-border p-4">
  <RegionalMap bind:selectedFeature={selectedRegion} {regions} />

  {#if selectedRegion}
    {@const timeFrameName = timeFrame.find(tf => tf.name === selectedTimeFrame)?.displayName}
    {@const windSpeedName = windSpeed.find(ws => ws.name === selectedWindSpeed)?.displayName}
    {@const spatialName = spatial.find(s => s.name === selectedSpatial)?.displayName}
    <div id={chartId} class='w-full max-w-[1000px] text-center flex flex-col items-center bg-white'>
      <h2 class='text-lg font-bold mb-2'>{timeFrameName} {windSpeedName} Events in {selectedRegion} with {spatialName} Coverage</h2>
      <Options
        bind:selectedWindSpeed
        {windSpeed}
        bind:selectedSpatial
        {spatial}
        bind:selectedTimeFrame
        {timeFrame}
      />
      <Chart
        groupedData={chartData}
        {chartId}
        metadata={{
          windspeed: windSpeedName || '',
          region: selectedRegion || '',
          spatial: spatialName || '',
          timeframe: timeFrameName || '',
        }}
      />
    </div>
  {/if}
</div>