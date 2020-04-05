<script>
  export let id;
  export let author;
  export let isAuthor;
  export let text;
  export let timestamp;
  export let hasAttachment = false;
  export let isGroup = false;
</script>

<style>
  .message {
    padding: 0.5em 1em;
  }

  .author {
    font-weight: 600;
    margin-right: 0.5rem;
  }

  .text {
    white-space: pre-line;
    word-break: break-all;
  }

  .is-group {
    padding-top: 0;
    margin-top: -0.25em;
  }
</style>

<div id={id} class="message" class:is-group={isGroup} data-timestamp={timestamp}>

  {#if hasAttachment || !isGroup}
    <div class="author" class:is-author={isAuthor}>{author}</div>
  {/if}
  <div class="text">{text}</div>

  {#if hasAttachment}
    <slot />
  {/if}
</div>
