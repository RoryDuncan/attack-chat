<script>
  import { onMount } from "svelte";
  import Loading from "../../components/Loading.svelte";

  let isLoading = true;
  let CreateRoom = null;

  onMount(async () => {
    const module = await import("../../client_components/CreateRoom.svelte");
    CreateRoom = module.default;
    isLoading = false;
  })
</script>

<Loading {isLoading}>
  <svelte:component this={CreateRoom} />
</Loading>