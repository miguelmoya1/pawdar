import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

const db = getFirestore();

db.settings({
  host: "localhost:8080",
  ssl: false,
});

export { db };
