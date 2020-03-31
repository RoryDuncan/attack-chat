<script>
  import { createEventDispatcher, afterUpdate } from "svelte";
  export let isLoading = false;
  export let message = "Loading...";


  // setup the event for when isLoaded changes
  // this creates a better fulfillment than onMount
  //  aka, bindings inside of this component won't be available until this event is fired
  let previousValue = isLoading;
  const dispatcher = createEventDispatcher();

  afterUpdate(() => {
    const hasChanged = isLoading !== previousValue;
    if (!isLoading && hasChanged) {
      dispatcher("load");
    }
    previousValue = isLoading;
  })
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