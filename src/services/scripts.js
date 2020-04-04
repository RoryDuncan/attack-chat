import { database } from "./firebase.js";


export const refName = "scripts";

/**
 *
 * @param {Function} callback
 * @returns {Function} A function to call for unlistening to new scripts
 */
export const listenForNewScripts = (roomID, callback) => {

  const ref = database.ref(`${refName}/${roomID}`);
  const getSnapshot = (snapshot) => {
    const id = snapshot.key;
    const values = snapshot.val();
    const message = { ...values, id, };
    callback(message);
  }
  const thenable = ref.on("child_added", getSnapshot);
  return () => ref.off("child_added", thenable);
}