<!-- Adapted from Layer Cake map example  https://layercake.graphics/example/MapLayered -->

<script lang="ts">
	import { LayerCake, Svg, Html } from 'layercake';
	import { geoIdentity } from 'd3-geo';
	import { scaleOrdinal } from 'd3-scale';
	import { feature } from 'topojson-client';

	import MapSvg from './Map.svg.svelte';
	import MapLabels from './MapLabels.html.svelte';

	// Pre-projected topojson data, very small file
	import topoJsonData from '$lib/topojson/statesAndRegionsTopojson';
	const nameKey = 'name';

	type RegionalMapProps = {
		selectedFeature: any;
		regions: RegionObj[];
		oceanRegionsName: string;
		oceanRegionsOutlineName: string;
	}
	type Label = { center: number[], region: string };

	// Map state and props declarations
	let {
		selectedFeature = $bindable(),
		regions,
		oceanRegionsName,
		oceanRegionsOutlineName
	}: RegionalMapProps = $props();
	let evt: CustomEvent<any>|undefined = $state(undefined);

	// Data definitions
	const statesGeoJson = feature(topoJsonData, topoJsonData.objects['us_states']);
	const oceanRegionsGeoJson = feature(topoJsonData, topoJsonData.objects[oceanRegionsName]);
	const regionsOutlineGeoJson = feature(topoJsonData, topoJsonData.objects[oceanRegionsOutlineName]);

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

	const projection = geoIdentity;
</script>

<LayerCake
	data={oceanRegionsGeoJson}
	z={nameKey}
	zScale={scaleOrdinal(regionNames, colors)}
	zDomain={regionNames}
	zRange={colors}
	padding={ { top: 20, right: 20, bottom: 20, left: 20 } }
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
			{nameKey}
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