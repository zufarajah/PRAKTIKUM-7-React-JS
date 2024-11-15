// src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../index.css";

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
  const [task, setTask] = useState({
    name: "",
    priority: "Medium",
    status: "To Do",
    assignedTo: "",
    notes: "",
  });

  useEffect(() => {
    // Reset atau set form sesuai dengan task yang akan diedit
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({
        name: "",
        priority: "Medium",
        status: "To Do",
        assignedTo: "",
        notes: "",
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handlePriorityChange = (priority) => {
    setTask((prevTask) => ({ ...prevTask, priority }));
  };

  const handleSubmit = () => {
    if (task.name.trim()) {
      taskToEdit ? editTask(task) : addTask(task);
      handleClose();
      // Reset form
      setTask({
        name: "",
        priority: "Medium",
        status: "To Do",
        assignedTo: "",
        notes: "",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="task-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskName">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Describe the household task..."
              value={task.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="taskAssignedTo" className="mt-3">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              placeholder="Who is responsible for this task?"
              value={task.assignedTo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <div className="d-flex justify-content-around mt-2">
              {["High", "Medium", "Low"].map((level) => (
                <Button
                  key={level}
                  variant={level === "High" ? "outline-danger" : level === "Medium" ? "outline-warning" : "outline-success"}
                  onClick={() => handlePriorityChange(level)}
                  active={task.priority === level}>
                  {level}
                </Button>
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={task.status}
              onChange={handleChange}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="taskNotes" className="mt-3">
            <Form.Label>Additional Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              placeholder="Add any notes or required materials here..."
              value={task.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit} className="btn-add">
          {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
