<script>
  export let warningAccepted = false;

  function acceptWarning() {
    warningAccepted = true;
  }
  const hostName = window.location.hostname;
  let evaluated = false;
  function evaluate() {
    evaluated = !evaluated;
  }
</script>

<style>
  .warning-backdrop {
    width: 100%;
    height: 100vh;
    overflow: auto;

    background-color: #a22;
    color: #fff;
    transition: 0.1s ease-in all;
  }

  .evaluated {
    background-color: #fff;
    color: #b44;
  }

  .warning {
    padding: 2em 2em;
    max-width: 56em;
    margin: 10vh auto;
  }

  h1 {
    font-size: 4em;
    font-weight :800;
  }
</style>

{#if warningAccepted}
  <slot />
{:else}
  <div class="warning-backdrop" class:evaluated>

    <div class="warning">
      <h1>Warning from {hostName}</h1>
      <p>
        {hostName} has potential dangers due to the allowance of
        <abbr title="Cross-Site Scripting">XSS</abbr>.
      </p>
      <p>
        If you arrived here by link from someone you don't know,
        <strong>do not proceed</strong>.
      </p>
      <p>
        Upon joining the room, <strong>the evaluation of other users' code can occur on your device</strong> upon pressing the <strong>eval</strong> button, or enabling Auto-Evaluation.
      </p>
      <div class="example-button">
      Example of button:
        <button class="secondary" on:click={evaluate}>Eval</button>
      </div>

      <p>
        To continue, you must accept and understand the risk of users of this room
        running their code on your device.
      </p>
      <div>
        <button on:click={acceptWarning}>Proceed</button>
      </div>

    </div>
  </div>
{/if}
