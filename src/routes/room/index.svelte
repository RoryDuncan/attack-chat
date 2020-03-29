<script>
  import { onMount } from "svelte";
  import Loading from "../../components/Loading.svelte";

  let isLoading = true;
  let RoomProvider = null;
  let roomID = null;

  onMount(async () => {
    const module = await import("../../client_components/RoomProvider.svelte");
    RoomProvider = module.default;
    isLoading = false;
  })
</script>

<Loading {isLoading}>
  <svelte:component this={RoomProvider} />
</Loading>