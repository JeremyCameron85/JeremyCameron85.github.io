// tests/task.test.js
import Task from '../domain/task.js';

describe('Task', () => {
  let task;

  // Creates a test task before each test
  beforeEach(() => {
    task = new Task({
      name: 'Task Name',
      description: 'Task Description'
    });
  });

  // Test for successfully creating a new task
  test('creates task with valid parameters', () => {
    const id = task.id;
    expect(id).toBeDefined();
    expect(id.length).toBe(10);
    expect(task.name).toBe('Task Name');
    expect(task.description).toBe('Task Description');
  });

  // Test for throwing an error if the task's name is too long
  test('throws error for invalid name (too long)', () => {
    expect(() =>
      new Task({
        name: 'Test Task Name More Than 20 Characters',
        description: 'Task Description'
      })
    ).toThrow();
  });

  // Test for throwing an error if the task's name is null
  test('throws error for null name', () => {
    expect(() =>
      new Task({
        name: null,
        description: 'Task Description'
      })
    ).toThrow();
  });

  // Test for throwing an error if the task's description is too long
  test('throws error for invalid description (too long)', () => {
    expect(() =>
      new Task({
        name: 'Task Name',
        description: 'Test Task Description More Than 50 Characters Block Block'
      })
    ).toThrow();
  });

  // Test for throwing an error if the task's description is null
  test('throws error for null description', () => {
    expect(() =>
      new Task({
        name: 'Task Name',
        description: null
      })
    ).toThrow();
  });

  // Test for successfully updating a task's name and throwing an error if it is too long
  test('setName updates name and throws on invalid input', () => {
    task.setName('twentycharacterstest');
    expect(task.name).toBe('twentycharacterstest');

    expect(() => task.setName(null)).toThrow();
    expect(() => task.setName('This name is way too long for the limit')).toThrow();
  });

  // Test for successfully updating a task's description and throwing an error if it is too long
  test('setDescription updates description and throws on invalid input', () => {
    const validDesc = 'fiftycharacterstest505050fiftycharacterstest505050';
    task.setDescription(validDesc);
    expect(task.description).toBe(validDesc);

    expect(() => task.setDescription(null)).toThrow();
    expect(() =>
      task.setDescription(
        'This description is definitely longer than the fifty characters allowed in the field.'
      )
    ).toThrow();
  });
});
