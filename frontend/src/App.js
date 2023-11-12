import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Analysis from './Pages/Analysis/Analysis';
import {TodosContextProvider} from './Context/TodosContext';

function App() {
  return (
    <TodosContextProvider>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/analytics' element={<Analysis></Analysis>}></Route>
        </Routes>
      </div>
    </TodosContextProvider>
  );
}

export default App;
