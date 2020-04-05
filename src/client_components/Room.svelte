<script>
  import { getContext } from "svelte";
  import { joinRoom } from "../services/rooms.js";
  import MessageProvider from "./MessagesProvider.svelte";
  import MessageList from "./MessageList.svelte";
  import MessageComposer from "./MessageComposer.svelte";
  import ScriptComposer from "./ScriptComposer.svelte";
  import UserList from "./UserList.svelte";

  export let id = null;
  export let room;
  let user = getContext("user")();
  let isScripting = true;

  $: buttonText = isScripting ? "Cancel" : "Add Script";
  joinRoom(id, user.name);

  function toggleComposer() {
    isScripting = !isScripting;
  }

</script>

<style>

  .room {
    height: 100vh;
    display: flex;
    flex: 0 1 auto;
    justify-content: space-between;
    flex-flow: column nowrap;
  }

  .chat {
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;
    height: 100%;
    justify-content: space-between;
  }

  .sidebar {
    padding: 1em 1em;
    background-color: var(--sidebar-background-color);
    color: var(--sidebar-text-color);
    border-bottom: 2px solid var(--sidebar-text-color);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    z-index: 1;
  }

  .sidebar p {
    margin: 0;
  }

  .name {
    font-weight: 600;
    font-size: 3em;
    margin: 0 0;
  }

  .description {
    opacity: 0.5;
  }

  @media (min-width: 768px) {

    .sidebar {
      padding: 2em 2em;
      width: 25vw;
      border-bottom: none;
    }
    .chat {
      width: 75vw;
      max-height: 100vh;
      justify-content: space-between;
    }

    .room {
      flex-flow: row nowrap;
    }

  }

</style>

<div class="room">
  <div class="sidebar">

    <header>
      <h1 class="name" data-id={id}>{room.name || 'Unnamed Room'}</h1>
      <p class="description">{room.description}</p>
    </header>

    <div class="users">
      <UserList {id} />
    </div>

    <div class="scripts">
      <button on:click={toggleComposer}>{buttonText}</button>
    </div>
  </div>

  <div class="chat">
    <MessageProvider {id}>
      <MessageList />
    </MessageProvider>

    {#if isScripting}
      <ScriptComposer {id} />
    {:else}
      <MessageComposer {id} />
    {/if}
  </div>
</div>
