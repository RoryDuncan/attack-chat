<script>
  import { appTitle } from "./_config.js";
</script>

<style>

</style>

<svelte:head>
  <title>{appTitle}</title>
</svelte:head>

<h1>{appTitle}</h1>

<h2>This is an experiment.</h2>
<p>
  What happens if XSS is a feature? {appTitle} attemps to find out.
</p>

<button>Create Room</button>
