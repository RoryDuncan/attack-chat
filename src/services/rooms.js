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
      console.err(err)
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

export const deleteRoom = async () => {};

export const getAllRooms = async () => {};