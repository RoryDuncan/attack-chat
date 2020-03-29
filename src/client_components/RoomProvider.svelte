<script>

  import { setContext } from "svelte";
  import Room from "./Room.svelte";
  import UserProvider from "./UserProvider.svelte";
  import { parseLocationForID, getRoomByID } from "../services/rooms.js"

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
{#if isLoading}
  <p>Loading room...</p>
{:else}
{#if hasValidID}
  {#if room !== null}
    <UserProvider>
      <Room {id} {room} />
    </UserProvider>

  {:else}
    <h2>404</h2>
    <p>This room doesn't exist.</p>
  {/if}

{:else}
  <h2>Invalid ID</h2>
  <p><em>{id}</em> is not valid.</p>
{/if}
{/if}
