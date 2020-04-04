<script>
  export function toggleDropDownOptions() {
    showDropdownOptions = showDropdownOptions === false ? true : false;
  }

  let showDropdownOptions = false;
  export let dropDownTitle;
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
  }
</style>

<!-- TODO: ask rory how to unify/share css between Nav components-->
<p on:click={toggleDropDownOptions}>{dropDownTitle}</p>
{#if showDropdownOptions}
  <slot />
{/if}