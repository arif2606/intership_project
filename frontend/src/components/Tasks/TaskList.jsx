import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { taskService } from "../../services/task";
import { useDebounce } from "../../hooks/useDebounce";
import { usePagination } from "../../hooks/usePagination";
import {
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import toast from "react-hot-toast";

// Lazy load components for better performance
const TaskItem = lazy(() => import("./TaskItem"));
const TaskForm = lazy(() => import("./TaskForm"));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <Loader className="h-8 w-8 animate-spin text-indigo-600" />
  </div>
);

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);

  const debouncedSearch = useDebounce(search, 500);
  const { page, limit, setPage, goToPage, resetPage } = usePagination(1, 10);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const result = await taskService.getTasks(page, limit, debouncedSearch);
    if (result.success) {
      setTasks(result.data.tasks);
      setTotalTasks(result.data.pagination.total);
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Reset page when search changes
  useEffect(() => {
    resetPage();
  }, [debouncedSearch, resetPage]);

  const handleCreateTask = async (taskData) => {
    const result = await taskService.createTask(taskData);
    if (result.success) {
      toast.success("Task created successfully!");
      await fetchTasks();
      setShowForm(false);
    } else {
      toast.error(result.error);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    const result = await taskService.updateTask(id, taskData);
    if (result.success) {
      toast.success("Task updated successfully!");
      await fetchTasks();
      setEditingTask(null);
    } else {
      toast.error(result.error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const result = await taskService.deleteTask(id);
      if (result.success) {
        toast.success("Task deleted successfully!");
        await fetchTasks();
      } else {
        toast.error(result.error);
      }
    }
  };

  const handleToggleComplete = async (id) => {
    const result = await taskService.toggleTaskCompletion(id);
    if (result.success) {
      toast.success("Task status updated!");
      await fetchTasks();
    } else {
      toast.error(result.error);
    }
  };

  const totalPages = useMemo(
    () => Math.ceil(totalTasks / limit),
    [totalTasks, limit],
  );

  const renderPageNumbers = useMemo(() => {
    const pageNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [page, totalPages]);

  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
            My Tasks
          </h1>
          <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl 
                     hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 
                     shadow-md hover:shadow-lg flex items-center space-x-2 font-medium"
        >
          <Plus className="h-5 w-5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks by title or description..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       transition-all duration-200"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {tasks.length} of {totalTasks} tasks
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
        </div>
      </div>

      {/* Task List */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-gray-400 mb-4">
                <svg
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600">
                Get started by creating your first task!
              </p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={handleToggleComplete}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
                index={index}
              />
            ))
          )}
        </div>
      </Suspense>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 
                       disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200
                       flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {renderPageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium
                          ${
                            page === pageNum
                              ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 
                       disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200
                       flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <Suspense fallback={null}>
          <TaskForm
            onSubmit={handleCreateTask}
            onClose={() => setShowForm(false)}
          />
        </Suspense>
      )}

      {editingTask && (
        <Suspense fallback={null}>
          <TaskForm
            task={editingTask}
            onSubmit={(data) => handleUpdateTask(editingTask._id, data)}
            onClose={() => setEditingTask(null)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default TaskList;
