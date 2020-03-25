import * as firebase from "firebase/app";
import config from "../config/firebase.config.js";

firebase.initializeApp(config);

export const database = firebase.database();

