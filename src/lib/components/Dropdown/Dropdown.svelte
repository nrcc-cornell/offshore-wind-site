<script>
  let { onselect, options } = $props();
  
  let isOpen = $state(false);
  let container = $state(null);
  
  function handleToggle() {
    isOpen = !isOpen;
  }

  function handleSelect(selection) {
    onselect(selection);
    handleToggle();
  }

  function onWindowClick(e) {
    if (container.contains(e.target) == false) {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={onWindowClick} />
<div class='relative' bind:this={container}>
  <button
    id="DownloadDropdownButton"
    class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
    onclick={handleToggle}
    aria-label="Download chart"
  >
    <svg class="h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0, 0, 400,400">
      <g>
      <path id="path0" d="M196.592 56.613 C 192.740 57.986,189.260 61.257,187.419 65.234 C 186.041 68.209,185.971 72.107,185.955 146.480 L 185.938 224.601 158.789 197.532 C 129.820 168.648,128.980 167.969,122.279 167.969 C 108.709 167.969,101.226 182.497,109.000 193.750 C 113.184 199.806,191.697 277.213,195.313 278.846 C 199.263 280.631,202.820 280.858,207.422 279.618 C 211.387 278.550,294.447 196.339,296.940 191.016 C 302.063 180.074,294.441 167.969,282.428 167.969 C 274.847 167.969,274.079 168.575,245.508 197.091 L 218.750 223.798 218.750 147.401 C 218.750 91.751,218.502 70.021,217.838 67.382 C 215.628 58.606,205.459 53.452,196.592 56.613 M71.094 264.054 C 59.513 266.215,57.808 270.403,57.826 296.655 C 57.850 331.612,64.061 345.155,84.589 355.004 C 95.866 360.415,89.967 360.156,202.257 360.156 C 324.831 360.156,317.087 360.993,332.121 346.120 C 344.358 334.015,346.451 326.889,346.470 297.266 L 346.484 275.391 344.343 271.748 C 337.972 260.910,321.821 261.158,315.780 272.186 C 314.658 274.235,314.392 277.810,314.059 295.313 C 313.631 317.791,313.544 318.251,308.862 322.977 C 304.295 327.586,310.224 327.344,202.144 327.344 L 102.675 327.344 99.199 325.586 C 97.170 324.560,94.744 322.420,93.370 320.443 L 91.016 317.058 90.625 295.704 L 90.234 274.349 87.856 270.963 C 84.039 265.531,77.540 262.852,71.094 264.054 " stroke="currentColor" fill="currentColor" fill-rule="evenodd">
      </path>
      </g>
    </svg>
    <svg class="w-2 h-2 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
  </button>
  
  <div
    class="absolute top-[30px] -translate-x-1/4 z-10 bg-white border border-gray-400 rounded-lg shadow-sm {isOpen ? 'visible':'hidden'}"
    aria-labelledby="DownloadDropdownButton"
  >
    <div class='pt-2 text-md text-gray-700 font-bold'>Download:</div>
    <hr class='border-gray-400'/>
    <ul class="pb-2 w-24 text-sm text-gray-700">
      {#each options as option}
        <li class='w-full'>
          <button onclick={() => handleSelect(option)} class="block w-full py-2 hover:bg-gray-300">{option}</button>
        </li>
      {/each}
    </ul>
  </div>
</div>