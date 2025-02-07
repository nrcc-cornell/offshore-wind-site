<!-- Adapted from Layer Cake map example  https://layercake.graphics/example/MapLayered -->

<script lang="ts">
	import RegionalMap from './RegionalMap.svelte';

	type RegionalMapsProps = {
		selectedFeature: any;
		regions: RegionsObj;
	}

	// Map state and props declarations
	let { selectedFeature = $bindable(), regions }: RegionalMapsProps = $props();
</script>

<div class="maps-container">
	{#each ['North','South'] as mapArea}
		<div class="map-container">
			<RegionalMap
				bind:selectedFeature
				regions={regions.filter(r => r.map === mapArea.toLowerCase()) as unknown as RegionObj[]}
				oceanRegionsName='{mapArea.toLowerCase()}_atlantic_regions'
				oceanRegionsOutlineName='{mapArea.toLowerCase()}_atlantic_regions_outline'
			/>
			<h2 class='map-title'>{mapArea} Atlantic</h2>
		</div>
	{/each}
</div>

<style>
	.maps-container {
		@apply w-full max-w-[850px] h-[400px] flex gap-2 justify-center;
	}

	.map-container {
		@apply relative flex-1 overflow-hidden border border-gray-500 rounded-md;
	}
	.map-title {
		@apply absolute top-0 left-0 bg-black text-white px-3 py-1 rounded-br-md;
	}
	
	@media (max-width: 768px) {
		.maps-container {
			@apply h-[300px];
		}

		.map-title {
			font-size: 13px;
			@apply px-1.5 py-0.5;
		}
	}

	@media (max-width: 650px) {
		.maps-container {
			@apply h-[250px];
		}

		.map-title {
			font-size: 11px;
		}
	}

	@media (max-width: 575px) {
		.maps-container {
			@apply h-[200px];
		}

		.map-title {
			font-size: 9px;
		}
	}

	@media (max-width: 500px) {
		.maps-container {
			@apply w-[300px] h-[500px] flex-col;
		}

		.map-title {
			font-size: 13px;
		}
	}
</style>