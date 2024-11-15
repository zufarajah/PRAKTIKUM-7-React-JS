// src/components/TaskList.js
import React from "react";
import { Button } from "react-bootstrap";
import "../index.css";

const TaskCard = ({ task, showEditForm, deleteTask }) => {
  const { id, name, priority, status, assignedTo, notes } = task;

  return (
    <div className="task-card">
      <div className="task-details">
        <span className="task-title">Task</span>
        <span className="task">{name}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={`${priority.toLowerCase()}-priority priority`}>
          {priority}
        </span>
      </div>
      <div className="task-status-wrapper">
        <button className="status">{status}</button>
      </div>
      <div className="flex">
        <span className="assigned-to-title">Assigned To</span>
        <span className="assigned-to">{assignedTo}</span>
      </div>
      <div className="flex">
        <span className="notes-title">Notes</span>
        <span className="notes">{notes}</span>
      </div>
      <div className="actions">
        <Button variant="link" onClick={() => showEditForm(task)}>
          <i className="bi bi-pencil"></i>
        </Button>
        <Button variant="link" className="btn-danger" onClick={() => deleteTask(id)}>
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </div>
  );
};

const TaskList = ({ tasks, deleteTask, showEditForm }) => (
  <div>
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          showEditForm={showEditForm}
          deleteTask={deleteTask}
        />
      ))
    ) : (
      <p>No tasks available.</p>
    )}
  </div>
);

export default TaskList;
