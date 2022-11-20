import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from './redux/taskSlice';

import CreatePanel from './components/Logic/CreatePanel';
import TasksList from './components/Logic/TasksList';

function App() {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  React.useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="container">
      <CreatePanel />
      {isLoading && <h2>Loading...</h2>}
      {tasks && !isLoading && <TasksList tasks={tasks} />}
    </div>
  );
}

export default App;
