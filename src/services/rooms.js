import { database } from "./firebase.js";

export const refName = "rooms";

export const createRoom = async (name) => {

  const roomRef = database.ref(refName).push();


  return roomRef.set({ name })
    .then(() => {
      const id = roomRef.key;
      const url = getRoomURL(id);
      return { name, id, url };
    })
    .catch((err) => {
      console.err(err)
    })

};

// one day we'll use full paths, but for this mvp we'll use query params
export const getRoomURL = (id) => `/room?id=${id}`;

export const deleteRoom = async () => {};

export const getAllRooms = async () => {};