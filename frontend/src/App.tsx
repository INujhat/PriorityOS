
import { useEffect, useState } from "react";
import "./App.css";

// A Task describes the information stored for each assignment.
type Task = {
  id: number;
  title: string;
  completed: boolean;
};

// These are the pages available in our application.
type Page = "Dashboard" | "Tasks" | "Planner" | "AI Assistant";

const navigation: Page[] = [
  "Dashboard",
  "Tasks",
  "Planner",
  "AI Assistant",
];

// This is the key we use to save tasks in the browser.
const STORAGE_KEY = "priorityos-tasks";

// This function loads saved tasks when the application starts.
function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed: unknown = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is Task =>
            typeof item === "object" &&
            item !== null &&
            typeof item.id === "number" &&
            typeof item.title === "string" &&
            typeof item.completed === "boolean"
        );
      }
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }

  // Example tasks are shown only when there is no saved list.
  return [
    { id: 1, title: "Study Algorithms", completed: false },
    { id: 2, title: "Finish Operating Systems homework", completed: false },
    { id: 3, title: "Review Physics notes", completed: true },
  ];
}

function App() {
  // Which page is currently open?
  const [page, setPage] = useState<Page>("Dashboard");

  // Load previously saved tasks when the app first starts.
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  // Text typed into the new-task input.
  const [newTask, setNewTask] = useState("");

  // Automatically save whenever the task list changes.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, [tasks]);

  // Dashboard statistics.
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  // Add a new task.
  function addTask() {
    const title = newTask.trim();

    if (!title) return;

    const task: Task = {
      id: Date.now() + Math.random(),
      title,
      completed: false,
    };

    setTasks((current) => [...current, task]);
    setNewTask("");
  }

  // Mark a task as completed or pending.
  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Remove a task.
  function deleteTask(id: number) {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );
  }

  return (
    <div className="app">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h2>PriorityOS</h2>
            <p>Your academic workspace</p>
          </div>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map((item) => (
            <button
              key={item}
              className={
                page === item
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setPage(item)}
            >
              <span className="nav-symbol">
                {item === "Dashboard" && "◫"}
                {item === "Tasks" && "☑"}
                {item === "Planner" && "▦"}
                {item === "AI Assistant" && "✧"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">P</div>
          <div>
            <strong>My Workspace</strong>
            <p>Personal account</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>{page}</h1>
          </div>

          <span className="status">
            <span className="status-dot" />
            Local development
          </span>
        </header>

        {/* DASHBOARD PAGE */}
        {page === "Dashboard" && (
          <>
            <section className="welcome">
              <p className="eyebrow">
                WELCOME TO PRIORITYOS
              </p>

              <h2>Make progress, one task at a time.</h2>

              <p>
                Organize your assignments, stay focused,
                and build a better study routine.
              </p>

              <button onClick={() => setPage("Tasks")}>
                Manage tasks →
              </button>
            </section>

            <section className="stats">
              <div className="stat-card">
                <p>Total tasks</p>
                <strong>{tasks.length}</strong>
                <span>In your workspace</span>
              </div>

              <div className="stat-card">
                <p>Pending</p>
                <strong>{pending}</strong>
                <span>Still to complete</span>
              </div>

              <div className="stat-card">
                <p>Completed</p>
                <strong>{completed}</strong>
                <span>Nice work!</span>
              </div>
            </section>

            <section className="panel">
              <div className="section-heading">
                <div>
                  <h2>Your tasks</h2>
                  <p>Here's what you're working on.</p>
                </div>

                <button
                  className="secondary-button"
                  onClick={() => setPage("Tasks")}
                >
                  View all →
                </button>
              </div>

              <TaskList
                tasks={tasks.slice(0, 5)}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </section>
          </>
        )}

        {/* TASKS PAGE */}
        {page === "Tasks" && (
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>Task manager</h2>
                <p>
                  Add assignments and track your progress.
                </p>
              </div>
            </div>

            <form
              className="task-form"
              onSubmit={(event) => {
                event.preventDefault();
                addTask();
              }}
            >
              <input
                value={newTask}
                onChange={(event) =>
                  setNewTask(event.target.value)
                }
                placeholder="What do you need to work on?"
                aria-label="New task"
              />

              <button type="submit">
                + Add task
              </button>
            </form>

            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </section>
        )}

        {/* PLANNER PAGE */}
        {page === "Planner" && (
          <section className="panel empty-state">
            <div className="empty-icon">▦</div>

            <h2>
              Your smart planner is coming next.
            </h2>

            <p>
              Soon, PriorityOS will organize your tasks
              based on deadlines, importance, and
              available study time.
            </p>
          </section>
        )}

        {/* AI ASSISTANT PAGE */}
        {page === "AI Assistant" && (
          <section className="panel empty-state">
            <div className="empty-icon">✧</div>

            <h2>
              Meet your future AI study assistant.
            </h2>

            <p>
              We'll connect a real AI model so you can
              ask questions and organize assignments
              naturally.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

// A reusable component for displaying tasks.
function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  if (tasks.length === 0) {
    return (
      <p className="no-tasks">
        No tasks yet. Add your first one!
      </p>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-row" key={task.id}>
          <label className="task-label">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />

            <span
              className={
                task.completed ? "done" : ""
              }
            >
              {task.title}
            </span>
          </label>

          <button
            className="delete-button"
            onClick={() => deleteTaskSafely(task.id, onDelete)}
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// Keeps the delete action in one small function.
function deleteTaskSafely(
  id: number,
  onDelete: (id: number) => void
) {
  onDelete(id);
}

export default App;
