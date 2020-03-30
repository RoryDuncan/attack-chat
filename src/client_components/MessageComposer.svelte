<script>
  import { sendMessage } from "../services/messages.js";

  export let id;
  export let inputText = "";

  let form;

  $: text = inputText.trim();
  $: isDisabled = text.length === 0;


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
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #bbb;
    background-color: #fff;
  }

  button {
    background-color: #fff;
    border: 1px solid #08b;
    padding: 0.5em 1em;
    color: #08b;
    margin-left: 0.5em;
    border-radius: 3px;
    font-weight: 600;
  }

  button[disabled] {
    filter: grayscale(1);
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
    padding: 0.5rem;
    border-radius: 3px;
    border: 1px solid #fff;
  }

  .message:focus {
    border: 1px solid #bbb;
  }
</style>

<form class="container" on:submit|preventDefault={submitHandler} bind:this={form}>
  <div class="composer">
    <textarea
      class="message"
      rows="3"
      autofocus="autofocus"
      placeholder="Type a message here"
      on:keydown={keyDownHandler}
      bind:value={inputText} />
    <button class="send" type="submit" disabled={isDisabled}>Send</button>
  </div>

</form>
