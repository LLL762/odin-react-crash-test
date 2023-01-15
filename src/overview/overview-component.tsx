import { Task } from "../App";

const OverviewComponent = (props: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}) => {
  const tasks = props.tasks;
  const setTasks = props.setTasks;
  const setTask = props.setTask;

  const deleteTask = (id?: string) => {
    if (typeof id == "undefined") {
      return;
    }

    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    }
  };

  const editTask = (id?: string) => {
    const task = tasks.find((task) => task.id === id);
    if (typeof task !== "undefined") {
      setTask(task);
    }
  };

  return (
    <div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <p> {task.text}</p>
            <button onClick={() => deleteTask(task.id)} type="button">
              delete
            </button>
            <button onClick={() => editTask(task.id)} type="button">
              edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewComponent;
