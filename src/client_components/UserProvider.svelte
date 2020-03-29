<script>
  import { setContext } from "svelte";
  export let name = null;
  $: hasName = name !== null;

  let enteredName = "";
  $: isValidName = enteredName.length > 3 && enteredName.length <= 60;

  setContext("user", () => ({ name }));


  function submitHandler(e) {
    if (isValidName) {
      name = enteredName;
    }

    return false;
  }
</script>

{#if hasName}
  <slot />
{:else}
  <form on:submit|preventDefault={submitHandler} autocomplete="off">
    <h3>Enter a username</h3>
    <label for="weird_username">name</label>
    <input id="weird_username" type="text" bind:value={enteredName} />
    <button type="submit" disabled={!isValidName}>Proceed</button>
  </form>
{/if}
