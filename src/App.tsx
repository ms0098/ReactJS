import { useEffect } from 'react';
import './App.scss';
import Routing from './routing/Routing';
import { BrowserRouter } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.title = 'Iksula';
  })
  
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
