<script>
  import { onMount } from "svelte";
  import { sendMessage } from "../services/messages.js";

  export let id;
  export let inputText = "";
  export const maxLength = 500;

  let form;
  let composer;

  $: text = inputText.trim();
  $: isTooLong = text.length > maxLength;
  $: isDisabled = text.length === 0 || isTooLong;

  onMount(() => {
    if (composer) {
      composer.focus();
    }
  })


  // when the user presses enter, send the messsage
  // except when shift is held
  function keyDownHandler(e) {
    const isEnterPress = e.key.toLowerCase() === "enter";

    if (isEnterPress && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
    }
  }

  function submitHandler(e) {
    if (isDisabled) return;
    sendMessage(id, text).then(() => {
      inputText = "";
    });
  }
</script>

<style>
  .container {
    padding: 1rem 2rem;
    border-top: 2px solid var(--sidebar-background-color);
    background-color: #fff;
    margin: 0 0;
  }
  .composer {
    display: flex;
    flex: 1 0 auto;
    justify-content: space-between;
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
  }

  .message {
    width: 100%;
    padding: 0rem;
    border: 1px solid transparent;
    resize: none;
  }

  .message:focus {
    border: 1px solid transparent;
    outline: transparent;
  }
</style>

<form class="container" on:submit|preventDefault={submitHandler} bind:this={form}>
  <div class="composer">
    <textarea
      class="message"
      rows="3"
      placeholder="Type a message here"
      on:keydown={keyDownHandler}
      bind:this={composer}
      bind:value={inputText} />
    <button class="send" type="submit" class:invalid={isTooLong} disabled={isDisabled}>{isTooLong ? "Too Long" : "Send"}</button>
  </div>
</form>
