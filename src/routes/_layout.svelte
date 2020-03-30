<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  main {
    max-width: 56em;
    margin: 0 auto;
    padding: 2em 2em;
  }
</style>

<Nav {segment}/>

<main>
  <slot></slot>
</main>