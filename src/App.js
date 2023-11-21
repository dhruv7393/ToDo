import Todos from './components/tasks';
import React from 'react';
import Header from './components/headers';
import AddTaskButton from './components/tasks/addTaskButton'
import Inpiration from './components/inspiration';

import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <div className='container'>
        <div className='halfScreen'>
          <Todos />
          <Header />
          <AddTaskButton />
        </div>
        <div className='halfScreen inspiration'><Inpiration /></div>
      </div>
      </ThemeProvider>
    </>
  );
}

export default App;
