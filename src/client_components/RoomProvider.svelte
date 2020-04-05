<script>
  import { setContext } from "svelte";
  import Loading from "../components/Loading.svelte";
  import Room from "./Room.svelte";
  import UserProvider from "./UserProvider.svelte";
  import WarningGate from "./WarningGate.svelte";
  import { parseLocationForID, getRoomByID } from "../services/rooms.js";

  export const id = parseLocationForID(window.location);
  export let room = null;
  setContext("room", () => room);

  const hasValidID = id !== null;

  let isLoading = hasValidID;

  loadRoom();

  async function loadRoom() {
    if (hasValidID) {
      room = await getRoomByID(id);
      isLoading = false;
    }
  }
</script>

<Loading {isLoading} message="Loading room...">
  {#if hasValidID}
    {#if room !== null}
      <WarningGate>
        <UserProvider>
          <Room {id} {room} />
        </UserProvider>
      </WarningGate>
    {:else}
      <h2>404</h2>
      <p>This room doesn't exist.</p>
    {/if}
  {:else}
    <h2>Invalid ID</h2>
    <p>
      <em>{id}</em>
      is not valid.
    </p>
  {/if}
</Loading>
