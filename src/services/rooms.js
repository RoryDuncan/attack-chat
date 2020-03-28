import { database } from "./firebase.js";

export const refName = "rooms";

export const createRoom = async (name) => {

  const room = database.ref(refName).push();

  return room.set({ name })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.err(err)
    })

};

export const deleteRoom = async () => {};

export const getAllRooms = async () => {};