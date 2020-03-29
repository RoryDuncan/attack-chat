<script>

  import { setContext } from "svelte";
  import Room from "./Room.svelte";
  import { parseLocationForID, getRoomByID } from "../services/rooms.js"

  export const id = parseLocationForID(window.location);
  export let room = null;

  const hasValidID = id !== null;

  if (hasValidID) {
    room = getRoomByID(id);
  }

  setContext("room", room);

</script>

{#if hasValidID}
  {#if room !== null}
    <Room {id} {room} />
  {:else}
    <h2>404</h2>
    <p>This room doesn't exist.</p>
  {/if}

{:else}
  <h2>Invalid ID</h2>
  <p><em>{id}</em> is not valid.</p>
{/if}