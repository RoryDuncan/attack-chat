<script>
  export let id;
  export let html;
  export let author;
  export let isAuthor = false;
  export let executed = false;
</script>

<style>

.annotation {
  font-size: 0.6em;
  text-transform: uppercase;
  color: #888;
  margin: 0 0;
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
  <pre>
    <code>{html}</code>
  </pre>
</div>
