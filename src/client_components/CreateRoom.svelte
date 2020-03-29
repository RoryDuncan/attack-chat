<script>
  import { createRoom } from "../services/rooms.js";

  let roomName = "Test Room";
  let roomDescription = "";
  let isLoading = false;

  let room = null;

  $: isDisabled = roomName.length <= 3 && !isLoading;

  const submitHandler = e => {
    e.preventDefault();
    isLoading = true;

    createRoom({ name: roomName, description: roomDescription})
      .then(createdRoom => {
        roomName = "";
        room = createdRoom;
      })
      .finally(() => {
        isLoading = false;
      });
  };
</script>

<style>

  form {
    border: 1px solid #eee;
    padding: 1rem 1rem;
  }

  fieldset {
    border: none;
    display: block;
    margin: 1rem 0;
  }

  label {
    display: block;
  }
</style>

{#if room !== null}
  <div>
    <p>Room was created</p>
    <p>{room.name} was created.</p>
    <a href={room.url}>Go to {room.name}</a>
  </div>
{:else}
  <form class="create-room" on:submit={submitHandler}>
    <h3>Create a Room</h3>
    <fieldset>
      <label for="room_name">Name</label>
      <input type="text" id="room_name" name="name" bind:value={roomName} />
    </fieldset>

    <fieldset>
      <label for="room_name">Description</label>
      <input
        type="text"
        id="room_description"
        name="description"
        bind:value={roomDescription} />
    </fieldset>
    <button type="submit" disabled={isDisabled}>Add Room</button>
  </form>
{/if}
