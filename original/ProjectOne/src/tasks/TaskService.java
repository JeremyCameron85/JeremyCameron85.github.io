/*
 * Jeremy Cameron
 * CS 320 Milestone Two
 * TaskService class which is used for creating and managing tasks.
 */

package tasks;

import java.util.HashMap;
import java.util.Map;

/*
 * TaskService class used for managing tasks.
 * Provides methods for adding, deleting, retrieving, and updating tasks.
 */
public class TaskService {
	
	/*
	 * Creates a hash map to store tasks, using the task ID as the key and
	 * the task object as the value. Used to efficiently manage tasks by
	 * their unique IDs.
	 */
	private final Map<String, Task> tasks = new HashMap<>();
	
	/*
	 * Adds a task to the service.
	 * Throws an IllegalArgumentException if it is a duplicate task ID.
	 */
	public void addTask(Task task) {
		if (tasks.containsKey(task.getId())) {
			throw new IllegalArgumentException("Task ID already exists.");
		}
		tasks.put(task.getId(), task);
	}
	
	/*
	 * Deletes a task from the service.
	 * Throws an IllegalArgumentException if the task ID does not exist.
	 */
	public void deleteTask(String id) {
		if (!tasks.containsKey(id)) {
			throw new IllegalArgumentException("Task ID does not exist.");
		}
		tasks.remove(id);
	}
	
	/*
	 * Updates the task's name and description.
	 * Throws an IllegalArgumentException if the task ID does not exist.
	 */
	public void updateTask(String id, String name, String description) {
		if (!tasks.containsKey(id)) {
			throw new IllegalArgumentException("Task ID does not exist.");
		}		
		tasks.get(id).setName(name);
		tasks.get(id).setDescription(description);
	}
	
	/*
	 * Retrieves a task by its ID.
	 * Throws an IllegalArgumentException if the task ID does not exist.
	 */
	public Task getTask(String id) {
		if (!tasks.containsKey(id)) {
			throw new IllegalArgumentException("Task ID does not exist.");
		}
		return tasks.get(id);
	}

}
