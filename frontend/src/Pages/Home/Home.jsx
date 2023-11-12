import React, { useContext, useEffect, useState } from 'react'
import './Home.scss'
import TodoForm from '../../Components/TodoForm/TodoForm'
import Todo from '../../Components/Todo/Todo'
import { TodosContext } from '../../Context/TodosContext'
import axios from 'axios'
import { BASE_URL } from '../../url'


const Home = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  const fetchSearched = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todo/search/${searchString}`);
      setSearchedData(response.data);
    } catch (error) {
      console.error(error);
      // Handle error - set an error state or show a message to the user
    }
  };

  useEffect(() => {
    if (searchString) {
      fetchSearched();
    } else {
      setSearchStatus(false)
      setSearchedData([]); // Clear the searched data if the search input is empty
    }
  }, [searchString]);

  const handleSearchStatus = (e) => {
    if (e.key === 'Enter') {
      setSearchStatus(true);
    } else {
      setSearchStatus(false);
    }
  };

  return (
    <div className="home ">
      <TodoForm />
      <div className="todo-container flex1">
        <h2>Todos</h2>
        <div className="search">
          <input
            onKeyUp={(e) => handleSearchStatus(e)}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search"
            className="search-bar"
            type="text"
          />
        </div>
        {searchStatus
          ? searchedData.map((todo, index) => (
              <Todo key={todo._id} id={todo._id} todo={todo.todo} completed={todo.completed} />
            ))
          : todos.map((todo, index) => (
              <Todo key={todo._id} id={todo._id} todo={todo.todo} completed={todo.completed} />
            ))}
      </div>
    </div>
  );
};

export default Home;
