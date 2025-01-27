<script lang="ts">
  import {
    RegionalMap
  } from '$lib/components';
  import { regions } from "$lib/constants";
  import type { Regions } from "$lib/constants";

  let selectedRegion: Regions|null = $state(null);
</script>

<div class="w-full max-w-[1500px] mx-auto flex flex-wrap justify-around items-center box-border p-4">
  <RegionalMap bind:selectedFeature={selectedRegion} {regions} />
</div>