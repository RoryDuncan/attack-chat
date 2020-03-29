<script>
  import { getContext } from "svelte";
  import Loading from "../components/Loading.svelte";

  const getRoom = getContext("room");
  const { id } = getRoom();

  let isLoading = true;

</script>

<Loading {isLoading} message="Loading messages...">

</Loading>

