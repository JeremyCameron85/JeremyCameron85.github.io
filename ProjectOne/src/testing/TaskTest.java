/*
 * Jeremy Cameron
 * CS 320 Milestone Two
 * TaskTest class which is used for conducting tests for the Task class.
 */

package testing;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import tasks.Task;

public class TaskTest {
	
	// The Task object used for testing
	private Task task;
	
	// Initializes a new Task object before each test method is run.
	@BeforeEach
	public void setUp() {
		task = new Task("Task Name", "Task Description");
	}
	
	/*
	 * Tests the successful creation of a Task object with valid parameters.
	 * Verifies a unique task ID is generated and that parameters are set correctly.
	 */
	@Test
	public void testTaskCreationSuccess() {
		String id = task.getId();
		assertNotNull(task.getId());
		assertEquals(10, id.length());
		assertEquals("Task Name", task.getName());
		assertEquals("Task Description", task.getDescription());
	}
	
	/*
	 * Tests using an invalid name.
	 * Verifies that an IllegalArgumentException is thrown when the name is longer than 20 characters.
	 */
	@Test
	public void testNameInvalid() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Task("Test Task Name More Than 20 Characters", "Task Description");
		});
	}
	
	/*
	 * Tests using a null value for name.
	 * Verifies that an IllegalArgumentException is thrown when the name is null.
	 */
	@Test
	public void testNameNull() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Task(null, "Task Description");
		});
	}
	
	/*
	 * Tests using an invalid description.
	 * Verifies that an IllegalArgumentException is thrown when the description is longer than 50 characters.
	 */
	@Test
	public void testDescriptionInvalid() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Task("Task Name", "Test Task Description More Than 50 Characters Block Block");
		});
	}
	
	/*
	 * Tests using a null value for description.
	 * Verifies that an IllegalArgumentException is thrown when the description is null.
	 */
	@Test
	public void testDescriptionNull() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Task("Task Name", null);
		});
	}
	
	/*
	 * Tests setting the name at the max character limit (20).
	 * Verifies that the name is updated correctly.
	 */
	@Test
	public void testSetName() {
		task.setName("twentycharacterstest");
		assertEquals("twentycharacterstest", task.getName());
	}
	
	/*
	 * Tests setting the description at the max character limit (50).
	 * Verifies that the description is updated correctly.
	 */
	@Test
	public void testSetDescription() {
		task.setDescription("fiftycharacterstest505050fiftycharacterstest505050");
		assertEquals("fiftycharacterstest505050fiftycharacterstest505050", task.getDescription());
	}
}
