import firebase from 'firebase/app';

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
