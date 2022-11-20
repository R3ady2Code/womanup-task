import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const tasksCollectionRef = collection(db, 'tasks');

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Tasks'],
  endpoints: (build) => ({
    getTasks: build.query({
      async queryFn() {
        try {
          const querySnaphot = await getDocs(tasksCollectionRef);
          let tasks = [];
          querySnaphot?.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
          });
          return { data: tasks };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addTask: build.mutation({
      async queryFn(newTask) {
        addDoc(tasksCollectionRef, newTask);
      },
    }),
    deleteTask: build.mutation({
      async queryFn(id) {
        const taskDoc = doc(db, 'tasks', id);
        return deleteDoc(taskDoc);
      },
    }),
    updateTask: build.mutation({
      async queryFn(id, updatedTask) {
        const taskDoc = doc(db, 'tasks', id);
        return updateDoc(taskDoc, updatedTask);
      },
    }),
  }),
});
