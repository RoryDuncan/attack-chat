import { database, TIMESTAMP } from "./firebase.js";
import { loadUser } from "./user.js";


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
    const message = { ...values, id, isScript: true, };
    callback(message);
  }
  const thenable = ref.on("child_added", getSnapshot);
  return () => ref.off("child_added", thenable);
};


export const addScript = (roomID, text, html) => {
  const ref = database.ref(`${refName}/${roomID}`).push();
  const { name: author } = loadUser();
  const script = {
    text,
    html,
    author,
    timestamp: TIMESTAMP
  };

  return ref.set(script)
}

export const removeScript = (roomID, scriptID) => {
  return database.ref(`${refName}/${roomID}.${scriptID}`).remove();
};