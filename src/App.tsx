import { useState } from "react";
import "./App.css";
import OverviewComponent from "./overview/overview-component";
import uniqid from "uniqid";

export interface Task {
  id?: string;
  text?: string;
}

function App() {
  const defaultTask: Task = { text: "" };
  const [task, setTask] = useState<Task>(defaultTask);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onChange = (event: any) => {
    const target = event.target as HTMLInputElement;
    const newTask = Object.assign({}, task);
    newTask.text = target.value;
    setTask(newTask);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    isNew() ? createTask() : editTask();
    setTask(defaultTask);
  };

  const editTask = () => {
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      const newTasks = [...tasks];
      newTasks[index] = task;
      setTasks(newTasks);
    }
  };

  const createTask = () => {
    task.id = uniqid();
    setTasks(tasks.concat(task));
  };

  const isNew = () => {
    return typeof task.id === "undefined";
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit} action="post">
        <h1>{isNew() ? "create" : "edit"}</h1>
        <label htmlFor="taskText">Enter a text :</label>
        <input
          onChange={onChange}
          type="text"
          value={task.text}
          name="taskText"
          id="taskText"
        />
        <button type="submit">submit</button>
      </form>
      <OverviewComponent
        setTask={setTask}
        task={task}
        setTasks={setTasks}
        tasks={tasks}
      />
    </div>
  );
}

export default App;
