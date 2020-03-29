<script>
  import { onMount } from "svelte";

  let isReady = false;
  let RoomProvider = null;
  let roomID = null;

  onMount(async () => {
    const module = await import("../../client_components/RoomProvider.svelte");
    RoomProvider = module.default;
    isReady = true;
  })
</script>

{#if isReady}
  <RoomProvider />
{:else}
  <p>
    Loading...
  </p>
{/if}
