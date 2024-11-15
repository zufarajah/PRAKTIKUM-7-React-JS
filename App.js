// src/App.js
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  return (
    <Container className="my-5 app-container">
      <h1 className="mb-4">Household Todo List</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="primary" onClick={handleShowForm} className="add-task-btn">
          + Add Task
        </Button>
        <Button variant="secondary" onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} showEditForm={showEditForm} />
      <TaskForm
        show={showForm}
        handleClose={handleCloseForm}
        addTask={addTask}
        editTask={editTask}
        taskToEdit={taskToEdit}
      />
    </Container>
  );
}

export default App;
