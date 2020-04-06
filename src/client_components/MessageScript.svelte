<script>
  import { getContext, onMount } from "svelte";

  const autoEval = getContext("autoEval");
  const autoEvalTimeStart = getContext("autoEvalTimeStart");
  export let id;
  export let html;
  export let author;
  export let isAuthor = false;
  export let timestamp;

  function evaluate() {
    window.eval(html);
  }

  onMount(() => {
    if ($autoEval && timestamp >= autoEvalTimeStart()) {
      window.setTimeout(() => evaluate(), 2000);
    }
  });
</script>

<style>
  .message-script {
    position: relative;
    background-color: #eee;
    display: block;
    width: 100%;
  }

  header {
    text-align: right;
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }

  pre {
    margin: 0em 0 0.25em 0em;
  }

  pre > code {
    display: block;
    padding: 1em 1em;
    background-color: #eee;
    color: #08a;
  }
</style>

<div class="message-script">
  <header>
    <button class="secondary" type="button" on:click={evaluate}>Eval</button>
  </header>
  <pre>
    <code>{html}</code>
  </pre>
</div>
