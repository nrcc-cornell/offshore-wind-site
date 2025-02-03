<script>
  import { downloadNodeAs, downloadCsv } from "$lib/utilities/downloadFns";
  import Dropdown from "../Dropdown/Dropdown.svelte";
  
  let {
    node,              // String: id of node to download
    gutter = 0,        // Number: pixels to offset from the bottom of the chart drawing area
    align = 'start',   // Sets the CSS flexbox justify-content setting for the box as a whole. Can be 'start', 'center' or 'end'.
    data = [],         // Data formatted as grouped data for CSV downloads
    metadata           // Only necessary for CSV download metadata
  } = $props();

  function handleDownload(saveAsType) {
    if (saveAsType === 'csv') {
      downloadCsv(data, 'offshore-winds-chart.csv', metadata);
    } else {
      downloadNodeAs(saveAsType, node, 'offshore-winds-chart', ['options', 'export']);
    }
  }

  const options = [['png', 'As PNG'], ['jpeg', 'As JPEG'], ['svg', 'As SVG'], ['csv', 'As CSV']]
</script>

<div class="export" style="justify-content: {align === 'end' ? 'flex-end' : align}; top: {-gutter - 20}px;">
  <Dropdown
    onselect={s => handleDownload(options.find(arr => arr[1] === s)[0])}
    options={options.map(arr => arr[1])}
  />
</div>

<style>
  .export {
    display: flex;
    position: relative;
  }
</style>