<script lang="ts">
  export type SelectOption = {
    name: string;
    displayName: string;
  }
  
  type SelectProps = {
    selected: string,
    options: SelectOption[],
    label?: string
  };
  
  let {
    selected = $bindable(),
    options,
    label
  }: SelectProps = $props();
</script>

<div class='relative rounded-md border border-gray-400 bg-white'>
  {#if label}
    <p class='text-[10px] text-nowrap bg-white px-[2px] absolute -top-2.5 left-1 pointer-events-none'>
      {label}
    </p>
    <div class='pl-1.5 pr-4 h-0 text-[10px] text-nowrap text-white'>{label}</div>
  {/if}
  <select
    bind:value={selected}
    class='w-full bg-transparent pl-2 py-1'
  >
    {#each options as option}
      <option class='bg-blue' value={option.name}>
        {option.displayName}
      </option>
    {/each}
  </select>
</div>