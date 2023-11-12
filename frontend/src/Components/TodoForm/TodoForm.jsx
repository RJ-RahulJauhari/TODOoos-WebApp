import React, { useState, useContext } from 'react'
import './TodoForm.scss'
import axios from 'axios';
import { BASE_URL } from '../../url';
import { TodosContext } from '../../Context/TodosContext';
const TodoForm = () => {

  const [todo,setTodo] = useState('');
  const {ToggleUI} = useContext(TodosContext);
  
  const addTodo = async () =>{
    await axios.post(BASE_URL+"/todo/save",{"todo":todo})
      .then((res) =>{
        console.log(res.data);
        ToggleUI();
      });
      return null;
  }

  const handleKey = (e) =>{
    if(e.key === 'Enter'){
      addTodo();
      setTodo('');
    }
  }
  
  return (

    <div className='todoform '>
      <input value={todo} onKeyUp={(e) => {handleKey(e)}} onChange={(e) => {setTodo(e.target.value)}} placeholder='Type your todo...' className='field cust' type="text" />
      <button onClick={() =>{addTodo()}} className='scaleUp hoverable clickable'>Add Todo</button>
    </div>
  )
}

export default TodoForm
