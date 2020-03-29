<script>
  export let isLoading = false;
  export let message = "Loading...";

</script>

<style>
  .loading {
    background-color: #d2d2d2;
    color: #000;
    padding: 1rem 2rem;
    width: auto;
  }

</style>
{#if isLoading}
  <div class="loading">{message}</div>
{:else}
  <slot />
{/if}