/*
 * Jeremy Cameron
 * CS 320 Milestone Two
 * TaskServiceTest class which is used for conducting tests for the TaskService class.
 */

package testing;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import tasks.Task;
import tasks.TaskService;

public class TaskServiceTest {
	
	// Instance of TaskService used in testing.
	private TaskService taskService;
	
	// The Task object used for testing.
	private Task task;
	
	/*
	 *  Initializes a new instance of TaskService and a Task object before each test method is run.
	 *  Adds the Task object to the service.
	 */
	@BeforeEach
	public void setUp() {
		taskService = new TaskService();
		task = new Task("Task Name", "Task Description");
		taskService.addTask(task);
	}
	
	/*
	 * Tests adding a new task to the service.
	 * Verifies that a task can be retrieved after being added.
	 */
	@Test
	public void testAddTask() {
		assertNotNull(taskService.getTask(task.getId()));
	}
	
	/*
	 * Tests adding a duplicate task to the service.
	 * Verifies that an IllegalArgumentException is thrown when trying to add a duplicate task ID.
	 */
	@Test
	public void testAddDuplicateTask() {
		assertThrows(IllegalArgumentException.class, () -> {
			taskService.addTask(task);
		});
	}
	
	/*
	 * Tests deleting a task from the service.
	 * Verifies that a task can be deleted and that an IllegalArgumentException is thrown when
	 * trying to retrieve the task ID afterwards.
	 */
	@Test
	public void testDeleteTask() {
		String id = task.getId();
		taskService.deleteTask(id);
		assertThrows(IllegalArgumentException.class, () -> {
			taskService.getTask(id);
		});
	}
	
	/*
	 * Tests trying to delete a task ID that does not exist.
	 * Verifies that an IllegalArgumentException is thrown when trying to delete a task
	 * that does not exist.
	 */
	@Test
	public void testDeleteInvalidTask() {
		String invalidTask = "Invalid";
		assertThrows(IllegalArgumentException.class, () -> {
			taskService.deleteTask(invalidTask);
		});
	}	
	
	/*
	 * Tests updating the name and description of a task.
	 * Verifies that the name and description updated successfully.
	 */
	@Test
	public void testUpdateTask() {
		String updateName = "twentycharacterstest";
		String updateDescription = "fiftycharacterstest505050fiftycharacterstest505050";
		taskService.updateTask(task.getId(), updateName, updateDescription);
		Task updatedTask = taskService.getTask(task.getId());
		assertNotNull(updatedTask, "Task exists.");
		assertEquals(updateName, updatedTask.getName());
		assertEquals(updateDescription, updatedTask.getDescription());
	}
	
	/*
	 * Tests trying to update a task that does not exist.
	 * Verifies that an IllegalArgumentException is thrown when trying to update a task
	 * that does not exist.
	 */
	@Test
	public void testUpdateInvalidTask() {
		String invalidTask = "Invalid";
		assertThrows(IllegalArgumentException.class, () -> {
			taskService.updateTask(invalidTask,  "Updated Task Name", "Updated Task Description");
		});
	}
}
