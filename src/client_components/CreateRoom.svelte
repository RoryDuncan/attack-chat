<script>
  import { createRoom } from "../services/rooms.js";

  let roomName = "Test Room";
  let isLoading = false;

  let room = null;

  $: isDisabled = roomName.length <= 3 && !isLoading;

  const submitHandler = (e) => {
    e.preventDefault();
    isLoading = true;

    createRoom(roomName)
      .then(createdRoom => {
        roomName = "";
        room = createdRoom;
      })
      .finally(() => {
        isLoading = false;
      })
  }

</script>

{#if room !== null}
  <div>
    <p>Room was created</p>
    <p>{room.name} was created.</p>
    <a href={room.url}>Go to {room.name}</a>
  </div>
{:else}
  <form class="create-room"  on:submit={submitHandler}>
    <label for="room_name">Room Name</label>
    <input type="text" id="room_name" name="name" bind:value={roomName} />
    <button type="submit" disabled={isDisabled}>Add Room</button>
  </form>

{/if}