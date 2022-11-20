import React from 'react';

import { storage } from '../../firebase';
import { ref, uploadBytes } from 'firebase/storage';

import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/taskSlice';

import Input from '../UI/Input';
import Button from '../UI/Button';

const CreatePanel = () => {
  const dispatch = useDispatch();

  const [file, setFile] = React.useState(null);

  const [newTask, setNewTask] = React.useState({
    title: '',
    description: '',
    deadline: { date: '', time: '' },
    fileUrl: null,
    completed: false,
  });

  //проверка валидности дедлайна
  const [isDeadlineInvalid, setIsDeadlineValid] = React.useState(false);
  React.useEffect(() => {
    if (newTask.deadline.date && newTask.deadline.time) setIsDeadlineValid(false);
    if (!newTask.deadline.date && !newTask.deadline.time) setIsDeadlineValid(false);

    if (newTask.deadline.date) {
      if (newTask.deadline.time === '') setIsDeadlineValid(true);
    }
    if (newTask.deadline.time) {
      if (newTask.deadline.date === '') setIsDeadlineValid(true);
    }
  }, [newTask.deadline.date, newTask.deadline.time]);

  //создание таска
  async function onClickToCreateButton() {
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file).then(() => {
        console.log('File uploaded');
      });
    }
    if (isDeadlineInvalid) return alert('Please text valid deadline');
    if (!newTask.title || !newTask.description)
      return alert('Please text the title and description');
    dispatch(createTask(newTask));
    setNewTask({
      title: '',
      description: '',
      deadline: { date: '', time: '' },
      fileUrl: null,
      completed: false,
    });
    setFile(null);
  }

  React.useEffect(() => {
    if (file) {
      setNewTask({ ...newTask, fileUrl: `images/${file.name}` });
    }
  }, [file]);

  return (
    <div className="createPanel">
      <div className="createPanel__header">
        <Input
          placeholder="Task title..."
          type="text"
          value={newTask.title}
          setValue={(e) => setNewTask({ ...newTask, title: e })}
        />
        <Input
          placeholder="Description..."
          type="text"
          value={newTask.description}
          setValue={(e) => setNewTask({ ...newTask, description: e })}
        />
      </div>
      <div className="createPanel__footer">
        <Input
          type="date"
          value={newTask.deadline.date}
          setValue={(e) => setNewTask({ ...newTask, deadline: { ...newTask.deadline, date: e } })}
        />
        <Input
          type="time"
          value={newTask.deadline.time}
          setValue={(e) => setNewTask({ ...newTask, deadline: { ...newTask.deadline, time: e } })}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button className="btn_primary btn_big" onClick={onClickToCreateButton}>
          Create task
        </Button>
      </div>
    </div>
  );
};

export default CreatePanel;
