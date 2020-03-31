<script>
  import { getContext } from "svelte";
  import MessageList from "./MessageList.svelte";
  import MessageComposer from "./MessageComposer.svelte";

  export let id = null;
  export let room;
  let user = getContext("user")();
</script>

<style>
  .chat {
    display: flex;
    height: 100vh;
    flex-flow: column nowrap;
    overflow-y: scroll;
  }

  .sidebar {
    padding: 2em 2em;
    position: sticky;
    top: 0;
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

  @media (min-width: 1024px) {

    .sidebar {
      width: 25vw;
      border-bottom: none;
    }
    .chat {
      width: 75vw;
      justify-content: space-between;
    }

    .room {
      display: flex;
      flex: 0 1 auto;
      justify-content: space-between;
      flex-flow: row nowrap;
    }

  }

</style>

<div class="room">

  <div class="sidebar">

    <header>
      <h1 class="name" data-id={id}>{room.name || 'Room'}</h1>
      <p class="description">{room.description}</p>
    </header>
    <aside>
      <p>Welcome, {user.name}.</p>
    </aside>
  </div>

  <div class="chat">
    <MessageList />
    <MessageComposer {id} />

  </div>
</div>
