<!-- Adapted from Layer Cake map example  https://layercake.graphics/example/MapLayered -->

<script lang="ts">
	import { LayerCake, Svg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoIdentity } from 'd3-geo';
	import { scaleOrdinal } from 'd3-scale';

	import MapSvg from './Map.svg.svelte';
	import MapLabels from './MapLabels.html.svelte';

	// Pre-projected topojson data, very small file
	import topoJsonData from '$lib/topojson/statesAndRegionsTopojson';

	type RegionalMapProps = {
		selectedFeature: any;
		regions: RegionsObj;
	}
	type Label = { center: number[], region: string };

	// Map state and props declarations
	let { selectedFeature = $bindable(), regions }: RegionalMapProps = $props();
	let evt: CustomEvent<any>|undefined = $state(undefined);

	// Data definitions
	const statesGeoJson = feature(topoJsonData, topoJsonData.objects['us_states']);
	const oceanRegionsGeoJson = feature(topoJsonData, topoJsonData.objects['ocean_regions']);
	const regionsOutlineGeoJson = feature(topoJsonData, topoJsonData.objects['ocean_regions_outline']);
	const projection = geoIdentity;

	// Flat array of data that is mandatory for layercake
	let flatData: any[] = $state([]);
	if ('features'  in oceanRegionsGeoJson) {
		flatData = oceanRegionsGeoJson.features.map(d => d.properties);
	}
	
	// Color and region names that will be used to color the state polygons
	const { regionNames, colors, labels } = regions.reduce((acc,{ name, labelLocation, color }) => {
		acc.regionNames.push(name);
		acc.colors.push(color);
		acc.labels.push({ center: labelLocation as unknown as number[], region: name });
		return acc;
	}, { regionNames: [] as string[], colors: [] as string[], labels: [] as Label[] });
</script>

<div class="map-container">
	<LayerCake
		data={oceanRegionsGeoJson}
		z='region'
		zScale={scaleOrdinal(regionNames, colors)}
		zDomain={regionNames}
		zRange={colors}
		padding={ { top: 20, right: 0, bottom: 20, left: 30 } }
		{flatData}
	>
		<!-- Layer for ocean regions border shadow -->
		<Svg>
			<MapSvg
				{projection}
				features={'features' in regionsOutlineGeoJson ? regionsOutlineGeoJson.features : undefined}
				shadow={true}
				fill='#00000000'
			/>
		</Svg>

		<!-- Layer for state polygons -->
		<Svg>
			<MapSvg
				{projection}
				features={'features' in statesGeoJson ? statesGeoJson.features : undefined}
				fill='#d6d6d6'
			/>
		</Svg>
	
		<!-- Colored layered, ocean region polygons -->
		<Svg>
			<MapSvg {projection} />
		</Svg>
		
		<!-- Mouse interaction layer, ocean region polygons -->
		<Svg>
			<MapSvg
				{projection}
				features={'features' in oceanRegionsGeoJson ? oceanRegionsGeoJson.features : undefined}
				bind:selectedFeature
				fill='#00000000'
				on:mousemove={event => {
					evt = event;
				}}
			/>
		</Svg>

		<!-- Region Labels -->
		<Html pointerEvents={false}>
      <MapLabels
        {projection}
        features={labels}
        getCoordinates={(d: Label) => d.center}
        getLabel={(d: Label) => d.region}
      />
    </Html>
	</LayerCake>
</div>

<style>
	.map-container {
		width: 600px;
		height: 400px;
		overflow: hidden;
		border: 1px solid rgb(100,100,100);
		border-radius: 5px;
	}

	@media (max-width: 615px) {
		.map-container {
			transform: scale(0.8);
		}
	}

	@media (max-width: 510px) {
		.map-container {
			transform: scale(0.7);
		}
	}

	@media (max-width: 430px) {
		.map-container {
			transform: scale(0.6);
		}
	}

	@media (max-width: 370px) {
		.map-container {
			transform: scale(0.55);
		}
	}
</style>