import { database } from "./firebase.js";
import { loadUser } from "./user.js";

export const refName = "messages";

/**
 *
 * @param {Function} callback
 * @returns {Function} A function to call for unlistening to new messages
 */
export const listenForNewMessages = (id, callback) => {
  console.log("Listening for messages on", id);
  const ref = database.ref(`${refName}/${id}`).limitToLast(1);
  const getSnapshot = (snapshot) => callback(snapshot.val());
  const thenable = ref.on("child_added", getSnapshot);
  return () => ref.off("child_added", thenable);
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