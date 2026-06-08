import React, { memo } from "react";
import { Edit2, Trash2, CheckCircle, Circle } from "lucide-react";

const TaskItem = memo(({ task, onToggle, onEdit, onDelete, index }) => {
  return (
    <div
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <button
              onClick={() => onToggle(task._id)}
              className="mt-1 focus:outline-none transform transition hover:scale-110"
            >
              {task.completed ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <Circle className="h-6 w-6 text-gray-400" />
              )}
            </button>

            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`mt-2 text-gray-600 ${task.completed ? "line-through text-gray-400" : ""}`}
                >
                  {task.description}
                </p>
              )}
              <div className="mt-3 flex items-center space-x-4">
                <span className="text-xs text-gray-400">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
                {task.completed && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

TaskItem.displayName = "TaskItem";

export default TaskItem;
