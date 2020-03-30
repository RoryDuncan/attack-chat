
<script>
  import { getContext } from "svelte";
  import MessageList from "./MessageList.svelte";
  import MessageComposer from "./MessageComposer.svelte";

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

<div class="chat">

  <MessageList />
  <MessageComposer id={id} />

</div>
