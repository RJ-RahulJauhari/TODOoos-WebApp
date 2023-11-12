import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { BASE_URL } from '../url';

export const TodosContext = createContext();

export const TodosContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [UI, setUI] = useState(false);

    const ToggleUI = () => {
        setUI(!UI);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/todo/get`);
            setTodos(response.data);
        } catch (error) {
            // Handle errors here
            console.error("Error fetching todos: ", error);
        }
    };

    useEffect(() => {
        fetchData(); // Call the async function directly inside useEffect
    }, [UI]);

    return (
        <TodosContext.Provider value={{ todos, setTodos, UI, ToggleUI }}>
            {children}
        </TodosContext.Provider>
    );
};
