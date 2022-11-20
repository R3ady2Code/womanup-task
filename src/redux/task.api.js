import { db } from '../firebase';

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const tasksCollectionRef = collection(db, 'tasks');

class TaskAPI {
  addTask = (newTask) => {
    return addDoc(tasksCollectionRef, newTask);
  };
  updateTask = (id, updatedTask) => {
    const taskDoc = doc(db, 'tasks', id);
    return updateDoc(taskDoc, updatedTask);
  };
  deleteTask = (id) => {
    const taskDoc = doc(db, 'tasks', id);
    return deleteDoc(taskDoc);
  };
  getAllTasks = () => {
    return getDocs(tasksCollectionRef);
  };
}

export default new TaskAPI();
