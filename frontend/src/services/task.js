import api from "./api";

class TaskService {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
  }

  getCacheKey(page, limit, search) {
    return `tasks_${page}_${limit}_${search}`;
  }

  async getTasks(page = 1, limit = 10, search = "") {
    const cacheKey = this.getCacheKey(page, limit, search);

    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      const now = Date.now();
      if (now - cached.timestamp < 30000) {
        // 30 seconds cache
        return cached.data;
      }
    }

    // Check for pending request
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    const promise = (async () => {
      try {
        const response = await api.get("/tasks", {
          params: { page, limit, search },
        });

        if (response.data.success) {
          const result = { success: true, data: response.data };
          this.cache.set(cacheKey, {
            data: result,
            timestamp: Date.now(),
          });
          return result;
        }
        return { success: false, error: "Failed to fetch tasks" };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.message || "Failed to fetch tasks",
        };
      } finally {
        this.pendingRequests.delete(cacheKey);
      }
    })();

    this.pendingRequests.set(cacheKey, promise);
    return promise;
  }

  async createTask(taskData) {
    try {
      const response = await api.post("/tasks", taskData);
      if (response.data.success) {
        this.clearCache();
        return { success: true, data: response.data };
      }
      return { success: false, error: "Failed to create task" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create task",
      };
    }
  }

  async updateTask(id, taskData) {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      if (response.data.success) {
        this.clearCache();
        return { success: true, data: response.data };
      }
      return { success: false, error: "Failed to update task" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update task",
      };
    }
  }

  async deleteTask(id) {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.data.success) {
        this.clearCache();
        return { success: true };
      }
      return { success: false, error: "Failed to delete task" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to delete task",
      };
    }
  }

  async toggleTaskCompletion(id) {
    try {
      const response = await api.patch(`/tasks/${id}/toggle`);
      if (response.data.success) {
        this.clearCache();
        return { success: true, data: response.data };
      }
      return { success: false, error: "Failed to toggle task status" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to toggle task status",
      };
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const taskService = new TaskService();
