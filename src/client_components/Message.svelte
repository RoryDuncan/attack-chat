<script>
  export let id;
  export let author;
  export let isAuthor;
  export let text;
  export let timestamp;
  export let hasAttachment = false;
  export let isGroup = false;

  const date = new Date(timestamp);
  let time = date.toLocaleTimeString("en-us", { timeStyle: "short" });
</script>

<style>
  .message {
    padding: 0.5em 1em;
    display: flex;
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

  .timestamp {
    font-size: 0.75em;
    padding: 0.25em 0;
    width: 5rem;
    color: #ccc;
  }

  .hide-time .timestamp {
    visibility: hidden;
  }
</style>

<div
  {id}
  class="message"
  class:hide-time={!hasAttachment && isGroup}
  class:is-group={isGroup}
  data-timestamp={timestamp}>
  <div class="timestamp">{time}</div>
  <div class="message-content">
    {#if hasAttachment || !isGroup}
      <div class="author" class:is-author={isAuthor}>{author}</div>
    {/if}

    <div class="text">{text}</div>

    {#if hasAttachment}
      <slot />
    {/if}
  </div>
</div>
