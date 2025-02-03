<script lang="ts">
  import BasicSelect from "./BasicSelect.svelte";
  import type { SelectOption } from "./BasicSelect.svelte";

  type OptionsProps = {
    selectedWindSpeed: WindSpeedNames;
    windSpeed: WindSpeedObjs;
    selectedSpatial: SpatialNames;
    spatial: SpatialObjs;
    selectedTimeFrame: TimeFrameNames;
    timeFrame: TimeFrameObjs;
  }

  let {
    selectedWindSpeed = $bindable(),
    windSpeed,
    selectedSpatial = $bindable(),
    spatial,
    selectedTimeFrame = $bindable(),
    timeFrame
  }: OptionsProps = $props();
</script>

<div class='options flex gap-3'>
  <BasicSelect
    bind:selected={selectedWindSpeed}
    options={windSpeed as unknown as SelectOption[]}
    label='Wind Speed'
  />
  <BasicSelect
    bind:selected={selectedSpatial}
    options={spatial as unknown as SelectOption[]}
    label='Event Area Coverage'
  />
  <BasicSelect
    bind:selected={selectedTimeFrame}
    options={timeFrame as unknown as SelectOption[]}
    label='Timeframe'
  />
</div>