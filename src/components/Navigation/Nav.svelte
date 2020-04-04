<script>
  import Dropdown from './Dropdown.svelte';

  export let segment;
  console.log({ segment });
</script>

<style>

  nav {
    border-bottom: 1px solid rgba(255,62,0,0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  li {
    display: block;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255,62,0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .dropdown {

  }

</style>

<nav>
  <ul>
    <li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
    <li class="dropdown">
      <Dropdown dropDownTitle={"rooms"}>
        <li><a href="room/create">Create</a></li>
        <li><a href="room/subscribed">Subscribed</a></li>
        </Dropdown>
    </li>
    <li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>friends</a></li>
    <li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>enemies</a></li>
  </ul>
</nav>
