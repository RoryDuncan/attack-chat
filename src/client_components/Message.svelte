<script>
  export let id;
  export let author;
  export let isAuthor;
  export let text;
  export let timestamp;
</script>

<style>
  .message {
    padding: 0.25em 1em;
  }

  .author {
    font-weight: 600;
    margin-right: 0.5rem;
  }

  .text {
    white-space: pre-line;
    word-break: break-all;
  }
</style>

<div class="message">
  <div class="author" class:is-author={isAuthor}>{author}</div>
  <div class="text">{text}</div>
</div>
