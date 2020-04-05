<script>

  import { onMount, setContext, getContext, } from "svelte";
  import { writable } from "svelte/store";
  import { listenForNewMessages, listenForDeletedMessages } from "../services/messages.js";
  import { listenForNewScripts, } from "../services/scripts.js";
  import Loading from "../components/Loading.svelte";

  export let id;
  let isLoading = true;

  const getUser = getContext("user");
  const user = getUser();
  const messages = writable([]);
  setContext("messages", () => messages);

  onMount(async () => {
    const unlistenForNewMessages = listenForNewMessages(id, appendMessage);
    const unlistenForDeletedMessages = listenForDeletedMessages(id, removeMessage);
    const unlistenForNewScripts = listenForNewScripts(id, appendMessage)

    isLoading = false;

    return () => {
      unlistenForDeletedMessages();
      unlistenForNewMessages();
      unlistenForNewScripts();
    };
  });

  function removeMessage(message) {
    messages.update(values => values.filter(m => m.id !== message.id))
  }

  function appendMessage(message) {

    const newMessage = {
      ...message,
      isAuthor: isAuthor(message)
    };

    messages.update(values => {
      const nextList = [...values, newMessage];

      return nextList.slice(Math.max(0, nextList.length - 100));
    });
  }

  function isAuthor(message) {
    return message.author.toLowerCase() === user.name.toLowerCase();
  }
</script>


<Loading {isLoading} message="Loading messages...">
  <slot />
</Loading>