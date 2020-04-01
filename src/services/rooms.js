import { database } from "./firebase.js";

export const refName = "rooms";

export const createRoom = async (fields) => {

  const roomRef = database.ref(refName).push();
  const { name } = fields;

  return roomRef.set(fields)
    .then(() => {
      const id = roomRef.key;
      const url = getRoomURL(id);
      return { name, id, url };
    })
    .catch((err) => {
      console.error(err)
    })

};
export const getRoomByID = async (id) => {
  const snapshot = await database.ref(`${refName}/${id}`).once("value");

  const room = Object.assign({ id }, snapshot.val());

  console.log(room);

  return room;
}

// one day we'll use full paths, but for this mvp we'll use query params
export const getRoomURL = (id) => `/room?id=${id}`;

export const parseLocationForID = (location) => {
  if (location && location.search.length > 1) {
    const search = new URLSearchParams(location.search.substring(1));
    const id = search.get("id") || "";
    if (id.length === 0) return null;
    return id;
  }

  return null;
};

export const deleteRoom = async () => { };

export const getAllRooms = async () => { };



export const joinRoom = async (id, name) => {

  if (typeof id === "string" && typeof name === "string") {
    const ref = database.ref(`${refName}/${id}/users/${name}`);
    const thenable = ref.set({ name, isOnline: true });
    ref.onDisconnect().set({ name, isOnline: false });
    return thenable;
  }

  return Promise.reject();
};

export const leaveRoom = async (id, name) => {
  if (typeof id === "string" && typeof name === "string") {
    const ref = database.ref(`${refName}/${id}/users/${name.replace(/\//gi, "-")}`);
    const thenable = ref.set(false);
    ref.onDisconnect().cancel();
    return thenable;
  }
  return Promise.reject();
};

export const listenForRoomChanges = async (id, callback, path = null) => {
  const optionalPath = path === null ? "" : `/${path}`;
  const ref = database.ref(`${refName}/${id}${optionalPath}`);
  const getSnapshot = (snapshot) => callback(snapshot.val());

  const thenable = ref.on("value", getSnapshot);
  return () => ref.off("value", thenable);
}

export const listenForOnlineStatusChanges = async (id, callback) => {

  const ref = database.ref(`${refName}/${id}/users`);
  const getSnapshot = (snapshot) => {
    const value = snapshot.val();
    const userList = Object.keys(value).map(key => value[key]);
    callback(userList);
  }

  const thenable = ref.on("value", getSnapshot);
  return () => ref.off("value", thenable);
}