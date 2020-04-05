<script>
  export let id;
  export let html;
  export let author;
  export let isAuthor = false;
  export let executed = false;
</script>

<style>

.annotation {
  font-size: 0.8em;
  text-transform: uppercase;
  color: #888;
  font-weight: 600;
  margin: 0 0;
}

pre {
  margin: 0 0 0.5em 0;
}

pre > code {
  display: block;
  padding: 1em 1em;
  background-color: #111;
  color: #08a;
}

</style>

<div class="message-script">
  <p class="annotation">{isAuthor ? "You" : author} added a script:</p>

  <pre>
    <code>{html}</code>
  </pre>
</div>
