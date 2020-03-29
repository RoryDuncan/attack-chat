import { database } from "./firebase.js";

export const refName = "messages";

/**
 *
 * @param {Function} callback
 * @returns {Function} A function to call for unlistening to new messages
 */
export const listenForNewMessages = (id, callback) => {
  const ref = database.ref(`${refName}/${id}`).limitToLast();
  const thenable = ref.on("child_added", callback);
  return () => ref.off("child_added", thenable);
}

export const getMessageHistory = async (id) => {

}

export const sendMessage = async (id, message) => {

};