<script lang="ts">
	import '../app.css';

	import { Toasts, Header, Footer } from '$lib/components';
	
	let { children } = $props();

	let latestResponse = $state({});
  ////////////////////////////////////
  ///// Dev Stuff vvv
  ////////////////////////////////////
	// const handleHydrate = async () => {
  //   try {
  //     const response = await fetch('/api/dev/devHydrateR2');
  //     latestResponse = await response.json();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // const handleList = async () => {
  //   try {
  //     const response = await fetch('/api/dev/listFiles');
  //     latestResponse = await response.json();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
	// const handleDeleteDates = async () => {
  //   try {
  //     const response = await fetch('/api/dev/emptyBucket');
  //     latestResponse = await response.json();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  ////////////////////////////////////
  ///// Dev Stuff ^^^
  ////////////////////////////////////
</script>

<!-- Dev Stuff vvv -->
<!-- <div>
	<h2>Dev Buttons</h2>
	<div class='flex gap-2'>
		<button class='bg-black text-white px-3 py-1' onclick={handleHydrate}>Hydrate Bucket</button>
		<button class='bg-black text-white px-3 py-1' onclick={handleList}>List Files</button>
		<button class='bg-black text-white px-3 py-1' onclick={handleDeleteDates}>Empty Bucket</button>
	</div>
	<pre>{JSON.stringify(latestResponse, null, 4)}</pre>
</div> -->
<!-- Dev Stuff ^^^ -->

<Header />
<main class='flex flex-col relative min-w-80 overflow-hidden'>
  <Toasts />
	{@render children()}
</main>
<Footer />

<style>
  main {
    min-height: calc(100vh - 136px);
  }
</style>
