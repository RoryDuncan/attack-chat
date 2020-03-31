import { database } from "./firebase.js";
import { loadUser } from "./user.js";

const previousMessagesLoaded = 50;
export const refName = "messages";

/**
 *
 * @param {Function} callback
 * @returns {Function} A function to call for unlistening to new messages
 */
export const listenForNewMessages = (id, callback) => {

  const ref = database.ref(`${refName}/${id}`).limitToLast(previousMessagesLoaded);
  const getSnapshot = (snapshot) => {
    const id = snapshot.key;
    const values = snapshot.val();
    const message = { ...values, id, };
    callback(message);
  }
  const thenable = ref.on("child_added", getSnapshot);
  return () => ref.off("child_added", thenable);
}

export const listenForDeletedMessages = async (id, callback) => {

  const ref = database.ref(`${refName}/${id}`).limitToLast(previousMessagesLoaded);
  const getSnapshot = (snapshot) => {
    const id = snapshot.key;
    const values = snapshot.val();
    const message = { ...values, id, };
    callback(message);
  }
  const thenable = ref.on("child_removed", getSnapshot);
  return () => ref.off("child_removed", thenable);

}

export const getMessageHistory = async (id) => {

}


export const sendMessage = async (id, text) => {
  const user = loadUser();
  const ref = database.ref(`${refName}/${id}`).push();
  const message = {
    author: user.name || "unknown",
    text,
  };
  ref.set(message)
  .then(() => Object.assign({ id: ref.key, }, message))
  .catch((err) => console.err(err));

};

window.__send = sendMessage;