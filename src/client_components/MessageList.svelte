<script>
  import { getContext, onMount } from "svelte";
  import { listenForNewMessages } from "../services/messages.js";
  import Loading from "../components/Loading.svelte";

  const getRoom = getContext("room");
  const { id } = getRoom();

  let isLoading = true;

  let messages = [];

  onMount(() => {
    const unlistenForNewMessages = listenForNewMessages(id, appendMessage);
    isLoading = false;
    return () => {
      unlistenForNewMessages();
    };
  });

  function appendMessage(message) {
    console.log(message);
    messages = [...messages, message];
  }
</script>

<style>
  .messages {
    list-style: none;
    min-height: 50vh;
    background-color: #cacfcc;
    padding: 2rem 2rem;
    margin: 1rem 0;
  }

</style>

<Loading {isLoading} message="Loading messages...">
  <ul class="messages">
    {#each messages as message}
      <li>
        {message.text}
        {message.author}
      </li>
    {:else}
      <li class="empty">
        <p>No Messages Yet. Say Something! </p>
      </li>
    {/each}
  </ul>


</Loading>
