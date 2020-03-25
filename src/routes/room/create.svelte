<script>
  import { onMount } from "svelte";

  let isReady = false;
  let CreateRoom = null;

  onMount(async () => {
    const module = await import("../../client_components/CreateRoom.svelte");
    CreateRoom = module.default;
    isReady = true;
  })
</script>

{#if isReady}
  <CreateRoom />
{:else}
  <p>
    Loading...
  </p>
{/if}
