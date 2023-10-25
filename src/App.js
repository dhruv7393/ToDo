import DailyTask from './components/dailyTask'
import Todos from './components/tasks';
import React from 'react';
import Header from './components/headers';
import AddTaskButton from './components/tasks/addTaskButton'

function App() {

  return (
    <>
      <Header />
      <AddTaskButton />
      <DailyTask/>
      <Todos />
    </>
  );
}

export default App;
