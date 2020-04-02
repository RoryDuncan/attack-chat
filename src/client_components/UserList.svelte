<script>
  import { onMount } from "svelte";
  import { listenForOnlineStatusChanges } from "../services/rooms.js";

  export let id;
  let users = [];

  onMount(() => {
    const unlisten = listenForOnlineStatusChanges(
      id,
      _users => (users = _users)
    );

    return () => {
      unlistenForOnlineStatusChanges();
    };
  });
</script>

<style>
  .users {
    list-style: none;
    padding: 0 0;
    margin: 0 0;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .status {
    width: 0.65em;
    height: 0.65em;
    line-height: 1em;
    margin: 0em 0.5em;
    display: inline-block;
    background-color: #eee;
  }

  .name {
    opacity: 0.5;
  }

  .is-online .status {
    background-color: #65a195;
  }

  .is-online .name {
    opacity: 1;
  }

</style>

<ul class="users">
  {#each users as { name, id, isOnline } (name)}
    <li class="user" class:is-online={isOnline}>
      <div class="status"></div>
      <div class="name">{name}</div>
    </li>
  {:else}
    <li class="empty">This room is empty</li>
  {/each}
</ul>
