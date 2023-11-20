import Todos from './components/tasks';
import React from 'react';
import Header from './components/headers';
import AddTaskButton from './components/tasks/addTaskButton'
import Inpiration from './components/inspiration';

function App() {

  return (
    <>
      <div className='container'>
        <div className='halfScreen'>
          <Todos />
          <Header />
          <AddTaskButton />
        </div>
        <div className='halfScreen'><Inpiration /></div>
      </div>
    </>
  );
}

export default App;
