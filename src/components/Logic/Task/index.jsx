import React from 'react';

import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../../redux/taskSlice';

import Button from '../../UI/Button';
import ModalTask from './ModalTask';

const Task = (props) => {
  const dispatch = useDispatch();
  const [task, setTask] = React.useState({ ...props.task });

  function setCompletedTask(e) {
    e.stopPropagation();
    setTask({ ...task, completed: !task.completed });
  }

  function onClickToDeleteTask(e) {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  }

  React.useEffect(() => {
    dispatch(updateTask({ id: task.id, updatedTask: task }));
  }, [task, setTask]);

  //today date and time now
  const [dateState, setDateState] = React.useState(new Date());

  //состояние для отслежки окончания дэдлайна
  const [deadlineIsEnd, setDeadlineIsEnd] = React.useState(false);

  React.useEffect(() => {
    if (!deadlineIsEnd) {
      const deadlineInterval = setInterval(() => {
        setDateState(new Date());
        if (task.deadline.date && task.deadline.time) {
          if (
            new Date(dateState) >
            new Date(Date.parse(task.deadline.date + 'T' + task.deadline.time))
          ) {
            setDeadlineIsEnd(true);
          } else {
            setDeadlineIsEnd(false);
          }
        }
      }, 1000);

      if (deadlineIsEnd || !task.deadline.date || !task.deadline.time) {
        clearInterval(deadlineInterval);
      }
    }
  });

  //состояние открытия модального окна
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="task" onClick={() => setIsModalOpen(true)}>
        <div
          className={`task__description ${task.completed && 'task__description_complete'} ${
            deadlineIsEnd && !task.completed && 'task__description_overdue'
          }`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <input
          type="checkbox"
          checked={task.completed}
          onClick={(e) => setCompletedTask(e)}
          onChange={(e) => setCompletedTask(e)}
        />
        <Button className="btn_red" onClick={onClickToDeleteTask}>
          Delete
        </Button>
      </div>
      {isModalOpen && (
        <ModalTask task={task} setTask={setTask} closeModal={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Task;
