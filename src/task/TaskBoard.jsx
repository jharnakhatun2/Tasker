import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

const defaultTask = {
  id: crypto.randomUUID(),
  title: "Learn React Native",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto quod velit deleniti ad, molestias unde odio numquam similique aut iste",
  tags: ["web", "react", "js"],
  priority: "High",
  isFavorite: true,
};
export default function TaskBoard() {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);

  const handleSaveTask = (newTask, isAdd) => {
    setEditModal(null);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setEditModal(task);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditModal(null);
  };

  const handleDeleteSingleTask = (taskId) => {
    const taskListAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskListAfterDelete);
  };
  return (
    <>
      {/* Begin Table */}
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={handleSaveTask}
            editModal={editModal}
            onCloseClick={handleCloseModal}
          />
        )}
        <div className="container">
          {/* Search Box */}
          <div className="p-2 flex justify-end">
            <SearchTask />
          </div>
          {/* Search Box Ends */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction onAddTask={() => setShowAddModal(true)} />
            <TaskList
              tasks={tasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteSingleTask}
            />
          </div>
        </div>
      </section>
      {/* End Table */}
    </>
  );
}
