<script>
  import { setContext } from "svelte";
  import { loadUser, saveUser } from "../services/user.js";

  export let user = loadUser();
  export let name = user ? user.name : null;
  $: hasName = name !== null;

  let enteredName = "";
  $: isValidName =
    enteredName.length > 1 &&
    enteredName.length <= 60 &&
    !enteredName.includes("/");

  setContext("user", () => { 
    const currentName = name === null ? "new user" : name;
    return { name: currentName, }
  });

  function submitHandler(e) {
    if (isValidName) {
      name = enteredName;
      saveUser(name);
    }

    return false;
  }
</script>

<style>


  .login-form {
    margin: 10vh 5vw;
    padding: 2em;
    border: 1px solid #b2b2b2;
    background-color: #fff;
  }
</style>

{#if hasName}
  <slot />
{:else}
  <div class="login-form">
    <h1>Join Room</h1>
    <p>You need a username to proceed.</p>
    <form on:submit|preventDefault={submitHandler} autocomplete="off">
      <label for="weird_username">name</label>
      <input id="weird_username" type="text" bind:value={enteredName} />
      <button type="submit" disabled={!isValidName}>Proceed</button>
    </form>
  </div>

{/if}
