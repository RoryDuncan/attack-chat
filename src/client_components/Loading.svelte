<script>
  export let isLoading = false;
  export let message = "Loading...";

</script>
{#if isLoading}
  <div class="loading">{message}</div>
{:else}
  <slot />
{/if}