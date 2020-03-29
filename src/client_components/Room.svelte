
<script>
  import { getContext } from "svelte";
  import MessageList from "./MessageList.svelte";

  export let id = null;
  export let room;
  let user = getContext("user")();
</script>

<aside>
  <p>Welcome, {user.name}.</p>
</aside>
<header>
  <h1 data-id={id}>{room.name || "Room"}</h1>
  <p>{room.description}</p>
</header>
<form class="chat">
  <section class="messages">
    <MessageList />
  </section>

  <section class="message-input">
    <textarea placeholder="Enter a message"></textarea>
    <button type="submit">Send</button>
  </section>
</form>
