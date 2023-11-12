import React, { useContext, useState } from "react";
import "./Todo.scss";
import { MdDoneOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { TodosContext } from "../../Context/TodosContext";
import axios from "axios";
import { BASE_URL } from "../../url";

const Todo = ({ id, todo, completed }) => {
  const [complete, setCompleted] = useState(completed);
  const [editMode, toggleEditMode] = useState(false);
  const { ToggleUI } = useContext(TodosContext);
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const deleteTodo = async () => {
    try {
      await axios.delete(`${BASE_URL}/todo/delete?id=${id}`).then((data) => {
        ToggleUI();
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const completeIcon = complete ? (
    <ImCancelCircle
      onClick={() => {
        setCompleted(!complete);
        handleComplete(!complete);
      }}
      className="clickable hoverable scalable"
    />
  ) : (
    <MdDoneOutline
      onClick={() => {
        setCompleted(!complete);
        handleComplete(!complete);
      }}
      className="clickable hoverable scalable"
    />
  );

  const handleComplete = async (newCompleteStatus) => {
    try {
      await axios
        .patch(`${BASE_URL}/todo/update?id=${id}`, {
          completed: newCompleteStatus,
        })
        .then((data) => {
          if (newCompleteStatus) {
            console.log("Marked incomplete..");
          } else {
            console.log("Marked completed..");
          }
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        await axios
          .patch(`${BASE_URL}/todo/update?id=${id}`, { todo: updatedTodo })
          .then((data) => {
            console.log(data);
            toggleEditMode(false);
            ToggleUI();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="todo scalable">
      <div className="task flex4">
        {editMode ? (
          <input
            onKeyUp={(e) => {
              editHandler(e);
            }}
            className="field"
            value={updatedTodo}
            type="text"
            placeholder="Edit your task"
            onChange={(e) => {
              setUpdatedTodo(e.target.value);
            }}
          />
        ) : (
          <p
            onDoubleClick={() => toggleEditMode(true)}
            className={complete ? "complete" : ""}
          >
            {todo}
          </p>
        )}
      </div>
      <div className="options flex1">
        {completeIcon}
        <FaTrashAlt
          onClick={() => deleteTodo()}
          className="clickable hoverable scalable"
        />
      </div>
    </div>
  );
};

export default Todo;
