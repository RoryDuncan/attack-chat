<script>
  import { createRoom } from "../services/rooms.js";

  let roomName = "";
  let isLoading = false;
  $: isDisabled = roomName.length > 3 && !isLoading;

  const submitHandler = (e) => {
    console.log("creating room", { roomName });
    e.preventDefault();
    isLoading = true;

    createRoom(roomName)
      .then(() => roomName = "")
      .finally(() => isLoading = false)
  }

</script>


<form class="create-room"  on:submit={submitHandler}>
  <label for="room_name">Room Name</label>
  <input type="text" id="room_name" name="name" bind:this={roomName} />
  <button type="submit" disabled={isDisabled}>Add Room</button>
</form>



