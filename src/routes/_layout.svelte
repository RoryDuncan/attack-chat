<script>
  import Nav from '../components/Navigation/Nav.svelte';

  export let segment;
</script>

<style>

  :global(html) {
    --background-color: #fefefe;
    --text-color: #335;
    --sidebar-background-color: #fefefe;
    --sidebar-text-color: #000;
  }

  :global(body) {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  main {
    margin: 0 auto;
    height: 100vh;
  }
</style>

<!-- <Nav {segment}/> -->

<main>
  <svelte:component this={Nav}></svelte:component>
  <slot></slot>
  <!-- TODO: add footer -->
</main>