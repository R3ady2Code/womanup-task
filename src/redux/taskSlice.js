import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const tasksCollectionRef = collection(db, 'tasks');

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async function () {
  const querySnaphot = await getDocs(tasksCollectionRef);
  let tasks = [];
  querySnaphot?.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
});

export const createTask = createAsyncThunk(
  'task/createTask',
  async function (newTask, { dispatch }) {
    const responce = await addDoc(tasksCollectionRef, newTask);
    dispatch(addTask({ ...newTask, id: responce.id }));
  },
);

export const deleteTask = createAsyncThunk('task/deleteTask', async function (id, { dispatch }) {
  const taskDoc = doc(db, 'tasks', id);
  await deleteDoc(taskDoc);
  dispatch(removeTask({ id }));
});

export const updateTask = createAsyncThunk('task/updateTask', async function ({ id, updatedTask }) {
  const taskDoc = doc(db, 'tasks', id);
  updateDoc(taskDoc, updatedTask);
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
  },
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    },
    [fetchTasks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { addTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;
