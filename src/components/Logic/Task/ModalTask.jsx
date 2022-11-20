import React from 'react';
import { storage } from '../../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import Input from '../../UI/Input';
import Button from '../../UI/Button';

const ModalTask = ({ task, setTask, closeModal }) => {
  const clickOutsideModal = () => {
    closeModal();
  };

  const clickOnModal = (e) => {
    e.stopPropagation();
  };

  //иземение/добавление нового файла
  const [file, setFile] = React.useState(null);
  const [fileIsLoaded, setFileIsLoaded] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState('');

  React.useEffect(() => {
    if (task.fileUrl) {
      const imageRef = ref(storage, task.fileUrl);
      getDownloadURL(imageRef).then((url) => {
        setImageSrc(url);
        setFileIsLoaded(true);
      });
    }
  }, []);

  function onClickToDeleteFile() {
    setFileIsLoaded(false);
    setTask({ ...task, fileUrl: null });
  }

  React.useEffect(() => {
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file).then(() => {
        setTask({ ...task, fileUrl: `images/${file.name}` });
        setFileIsLoaded(true);
        console.log('File uploaded');
      });
    }
  }, [file]);

  return (
    <div className="modalTask-wrapper" onClick={clickOutsideModal}>
      <div className="modalTask" onClick={(e) => clickOnModal(e)}>
        <p>Title: </p>
        <Input type="text" value={task.title} setValue={(e) => setTask({ ...task, title: e })} />

        <p>Completed: </p>
        <Button
          className={`btn_big ${task.completed ? 'btn_red' : 'btn_primary'}`}
          onClick={() => setTask({ ...task, completed: !task.completed })}>
          {task.completed ? 'Cancel completed' : 'To complete task'}
        </Button>

        <p>Description: </p>
        <Input
          type="text"
          value={task.description}
          setValue={(e) => setTask({ ...task, description: e })}
        />

        <p>Deadline: </p>
        <div className="modalTask__deadline">
          <Input
            type="date"
            value={task.deadline.date}
            setValue={(e) => setTask({ ...task, deadline: { ...task.deadline, date: e } })}
          />
          <Input
            type="time"
            value={task.deadline.time}
            setValue={(e) => setTask({ ...task, deadline: { ...task.deadline, time: e } })}
          />
        </div>

        <p>Image: </p>
        {task.fileUrl && fileIsLoaded && (
          <div className="modalTask__image">
            <img src={imageSrc} alt="task_item" />
            <Button className="btn_red" onClick={onClickToDeleteFile}>
              Delete
            </Button>
          </div>
        )}
        {!task.fileUrl && !fileIsLoaded && (
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        )}
      </div>
    </div>
  );
};

export default ModalTask;
