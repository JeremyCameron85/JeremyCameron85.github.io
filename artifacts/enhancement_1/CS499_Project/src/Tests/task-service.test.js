// tests/task-service.test.js
import TaskService from '../services/task-service.js';

describe('TaskService', () => {
  let taskService;
  let task;

  // Initializes taskService and creates a test task before each test
  beforeEach(() => {
    taskService = new TaskService();
    task = taskService.addTask({
      name: 'Task Name',
      description: 'Task Description'
    });
  });

  // Test for successfully adding a new task
  test('adds a new task', () => {
    expect(taskService.getTask(task.id)).toBeDefined();
  });

  // Test for throwing a duplicate ID error when trying to add a new task with an ID that already exists
  test('throws error when adding duplicate task', () => {
    const duplicateTask = {
      id: task.id,
      name: 'Task Name',
      description: 'Task Description'
    };
    expect(() => taskService.addTask(duplicateTask)).toThrow();
  });

  // Test for successfully deleting a task
  test('deletes a task', () => {
    taskService.deleteTask(task.id);
    expect(() => taskService.getTask(task.id)).toThrow();
  });

  // Test for throwing an error when trying to delete a task that is not found
  test('throws error when deleting a task that is not found', () => {
    expect(() => taskService.deleteTask('Task not found')).toThrow();
  });

  // Test for successfully updating a task's name and description
  test('updates task name and description', () => {
    const updateName = 'twentycharacterstest';
    const updateDescription = 'fiftycharacterstest505050fiftycharacterstest505050';
    taskService.updateTask(task.id, updateName, updateDescription);
    const updatedTask = taskService.getTask(task.id);
    expect(updatedTask).toBeDefined();
    expect(updatedTask.name).toBe(updateName);
    expect(updatedTask.description).toBe(updateDescription);
  });

  // Test for throwing an error when trying to update a task that is not found
  test('throws error when updating a task that is not found', () => {
    expect(() =>
      taskService.updateTask('Task not found', 'Task Name', 'Task Description')
    ).toThrow();
  });
});
