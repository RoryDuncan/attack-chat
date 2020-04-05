<script>
  import { onMount } from "svelte";
  import { addScript } from "../services/scripts.js";

  export let id;
  export let inputText = "";
  export let htmlText = `alert("hello");`;
  export const maxLength = 2000;
  export const maxScriptLength = 5000;

  let form;

  $: text = inputText.trim();
  $: html = htmlText.trim();
  $: isTooLong = text.length > maxLength || html.length > maxScriptLength;
  $: isDisabled = html.length === 0 || isTooLong;

  onMount(() => {

  });

  // when the user presses enter, send the messsage
  // except when shift is held
  function enterHandler(e) {
    const isEnterPress = e.key.toLowerCase() === "enter";

    if (isEnterPress && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
    }
  }

  function tabHandler(e) {
    if (e.key.toLowerCase() === "tab") {
      e.preventDefault();
    }
  }

  function submitHandler(e) {
    if (isDisabled) return;

    addScript(id, text, html).then(() => {
      inputText = "";
      clearScript();
    });
  }

  function evaluate(e) {
    window.eval(htmlText);
  }

  function clearScript() {
    htmlText = "";
  }
</script>

<style>
  .container {
    padding: 1rem 2rem;
    border: 1px solid #eee;
    background-color: #fff;
    margin: 0 0;
  }

  .button-group {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    min-width: 6em;
    height: 100%;
    justify-content: space-between;
  }

  button {
    display: block;
    cursor: pointer;
    background-color: #08b;
    border: 1px solid #08b;
    padding: 0.5em 1em;
    color: #fff;
    margin-left: 0.5em;
    border-radius: 3px;
    font-weight: 600;
    margin: 0em 0em 0.5em 0.5em;
  }

  button[disabled] {
    filter: grayscale(1);
    opacity: 0.5;
  }

  .secondary {
    background-color: #840;
    border: 1px solid transparent;
    color: #fff;
  }

  .send {
    margin-top: 1em;
  }

  .composer {
    display: flex;
    flex: 1 0 auto;
    justify-content: space-between;
    align-items: flex-start;
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .message {
    width: 100%;
    padding: 0.5rem 0.5rem;
    border: 1px solid transparent;
    border-radius: 3px;
    resize: none;
    background-color: #f2f2f2;
  }

  .message:focus {
    border: 1px solid #08a;
    background-color: #f8f8f8;
    outline: transparent;
  }

  .script {
    padding: 1rem 1rem;
    resize: vertical;
    max-height: 90vh;
    background-color: #111;
    color: #5cf;
  }

  .script:focus {
    background-color: #111;
    border: 1px solid #08a;
  }

  button.invalid {
    filter: grayscale(0);
    opacity: 1;
    color: #b44;
    border: 1px solid #b44;
  }
</style>

<form
  class="container"
  on:submit|preventDefault={submitHandler}
  bind:this={form}>

  <textarea
    class="message"
    rows="3"
    placeholder="Include a message with this script"
    on:keydown={enterHandler}
    bind:value={inputText} />

  <div class="composer">
    <textarea
      class="message script"
      rows="20"
      placeholder="Enter your code here"
      spellcheck="false"
      on:keydown={tabHandler}
      bind:value={htmlText} />

    <div class="button-group">
      <button type="button" class="secondary" on:click={evaluate}>Eval</button>

      <button class="secondary" type="button" on:click={clearScript}>Clear</button>

      <button
        class="send"
        type="submit"
        class:invalid={isTooLong}
        disabled={isDisabled}>
        {isTooLong ? 'Too Long' : 'Add Script'}
      </button>

    </div>
  </div>

</form>
