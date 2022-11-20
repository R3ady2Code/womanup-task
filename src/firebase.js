import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAaR3jROT_E4YCg3A7FdJI1I1xCAgxUxXU',
  authDomain: 'womanup-db.firebaseapp.com',
  projectId: 'womanup-db',
  storageBucket: 'womanup-db.appspot.com',
  messagingSenderId: '840799322392',
  appId: '1:840799322392:web:7fb81edbb5defaf7b09e6d',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
//service-840799322392@gs-project-accounts.iam.gserviceaccount.com
