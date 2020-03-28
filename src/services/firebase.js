import firebase from "firebase/app";
import "firebase/database";


import config from "../config/firebase.config.js";

firebase.initializeApp(config);

export const database = firebase.database();

