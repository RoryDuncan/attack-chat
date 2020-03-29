
<script>
  export let id = null;
  export let room;
</script>

<h1>{room.name || "Room"}</h1>
<section class="messages">

</section>

<section class="message-input">
  <textarea placeholder="Enter a message">

  </textarea>
  <button>Send</button>
</section>