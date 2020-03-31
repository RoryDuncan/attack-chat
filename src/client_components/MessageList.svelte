<script>
  import { getContext, onMount } from "svelte";
  import { listenForNewMessages } from "../services/messages.js";
  import Loading from "../components/Loading.svelte";

  const getRoom = getContext("room");
  const getUser = getContext("user");

  const { id } = getRoom();
  const user = getUser();

  let isLoading = true;
  let list = null;
  let messages = [];

  onMount(async () => {
    const unlistenForNewMessages = listenForNewMessages(id, appendMessage);
    isLoading = false;

    return () => {
      unlistenForNewMessages();
    };
  });

  function appendMessage(message) {
    const nextList = [...messages, message].map(message => {
      return { ...message, isAuthor: message.author.toLowerCase() === user.name.toLowerCase()};
    });

    messages = nextList.slice(Math.max(0, nextList.length - 100)); // limit to 100

    scrollToBottom(true);
  }

  function scrollToBottom(force) {
    if (list === null) return;
    const lastChild = list.querySelector("li:last-child");
    if (force) lastChild.scrollIntoView();
    else lastChild.scrollIntoViewIfNeeded();
  }

  function childrenMounted() {
    scrollToBottom(true);
  }
</script>

<style>
  .messages {
    list-style: none;
    min-height: 50vh;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;
    padding: 2rem 2rem;
    margin: 0 0;
  }

  .message {
    padding: 0.25em 1em;
  }

  .author {
    font-weight: 600;
    margin-right: 0.5rem;
    text-transform: lowercase;
  }

  .text {
    white-space: pre-line;
    word-break: break-all;
  }


</style>

<Loading {isLoading} message="Loading messages..." on:load={childrenMounted}>
  <ul class="messages" bind:this={list}>
    {#each messages as { id, author, isAuthor, text}, index}
      <li class="message" data-id={id} style={`opacity: ${index / messages.length};`} >
        <div class="author" class:is-author={isAuthor}>{author}</div>

        <div class="text">{text}</div>
      </li>
    {:else}
      <li class="empty">
        <p>No Messages Yet. Say Something!</p>
      </li>
    {/each}
  </ul>

</Loading>
