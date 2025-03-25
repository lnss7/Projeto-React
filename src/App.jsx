import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || 
    [{
    id: 1,
    title: "Estudar Programação",
    description: "Estudar programação com foco em ReactJS",
    isCompleted: false
  }, {
    id: 2,
    title: "Fazer compras",
    description: "Comprar pão, leite e ovos",
    isCompleted: true
  }, {
    id: 3,
    title: "Assistir série",
    description: "Assistir série no Netflix",
    isCompleted: false
  }]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])


  //EXEMPLO DE COMO CHAMAR UMA API
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     //CHAMAR API
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10", 
  //       {
  //         method: "GET"
  //       }
  //   );
  //     //PEGAR OS DADOS DA API
  //     const data = await response.json();

  //     //PERSISTIR DADOS NO LOCAL STORAGE
  //     setTasks(data);
  //   };
  //   fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted}
      }
        return task;
      });  
        setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}  />
        <Tasks tasks = {tasks} onTaskClick = {onTaskClick} onDeleteTaskClick = {onDeleteTaskClick}/>
      </div>
    </div>
  );
}

export default App;