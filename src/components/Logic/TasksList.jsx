import React from 'react';
import Task from './Task';

const TasksList = ({ tasks }) => {
  return (
    <div className="tasksList">
      {tasks.length ? (
        tasks.map((task) => <Task key={task.id} task={task} />)
      ) : (
        <h2>You haven't got any tasks.</h2>
      )}
    </div>
  );
};

export default TasksList;
