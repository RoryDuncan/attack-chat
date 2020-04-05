<script>
  export let id;
  export let author;
  export let isAuthor;
  export let text;
  export let timestamp;
  export let hasAttachment = false;

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

<div id={id} class="message" data-timestamp={timestamp}>
  <div class="author" class:is-author={isAuthor}>{author}</div>
  <div class="text">{text}</div>

  {#if hasAttachment}
    <slot />
  {/if}
</div>
