<script>

  import { setContext } from "svelte";
  import Room from "./Room.svelte";
  import { getIDfromURL, getRoomByID } from "../services/rooms.js"

  export const id = getIDfromURL(window.location);
  export let room = null;

  const hasValidID = id !== null;

  if (hasValidID) {
    room = getRoomByID(id);
  }

  setContext("room", room);

</script>

{#if hasValidID}
  <Room {id} {room} />
{:else}
  <h2>Invalid ID</h2>
  <p><em>{id}</em> is not valid.</p>
{/if}