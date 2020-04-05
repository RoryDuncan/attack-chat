<script>
  import { getContext, onMount } from "svelte";
  import { fade } from "svelte/transition";

  import Loading from "../components/Loading.svelte";
  import Message from "./Message.svelte";
  import MessageScript from "./MessageScript.svelte";

  const getRoom = getContext("room");
  const getUser = getContext("user");
  const getMessages = getContext("messages");

  const { id } = getRoom();
  const user = getUser();
  const messages = getMessages();
  $: groupedMessages = groupMessages($messages);

  let list = null;

  onMount(async () => {
    scrollToBottom(true, "smooth");
    const unsub = messages.subscribe(() => {
      window.requestAnimationFrame(() => scrollToBottom(true, "smooth"));
    });

    return () => unsub();
  });



  // on changes this needs to run:
  // window.requestAnimationFrame(() => scrollToBottom(true, "smooth"));

  function scrollToBottom(force, behavior = "auto") {
    if (list === null) return;
    const lastChild = list.querySelector("li:last-child");

    const scrollOptions = {
      behavior,
      block: "end"
    };
    if (force) lastChild.scrollIntoView(scrollOptions);
    else lastChild.scrollIntoViewIfNeeded(scrollOptions);
  }

  function childrenMounted() {
    scrollToBottom(true, "auto");
  }

  function groupMessages(items) {

    let previousAuthor = null;
    return items.map( message => {

      const author = message.author.toLowerCase()
      const isGroup = previousAuthor !== null && author === previousAuthor;

      previousAuthor = author;

      return {...message, isGroup};
    });
  }

</script>

<style>
  .messages {
    list-style: none;
    min-height: 25vh;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;
    padding: 2rem 2rem 0rem 2rem;
    margin: 0 0 2rem 0;
  }
</style>

<ul class="messages" bind:this={list}>
  {#each groupedMessages as message (message.id) }
    <li class="message" out:fade={{duration: 1000}}>
      <Message
        isGroup={message.isGroup}
        id={message.id}
        author={message.author}
        text={message.text}
        isAuthor={message.isAuthor}
        timestamp={message.timestamp}
        hasAttachment={message.isScript}>
        {#if message.isScript}
          <MessageScript id={message.id} html={message.html} author={message.author} />
        {/if}
      </Message>
    </li>

  {:else}
    <li class="empty">
      <p>No Messages Yet. Say Something!</p>
    </li>
  {/each}
</ul>
