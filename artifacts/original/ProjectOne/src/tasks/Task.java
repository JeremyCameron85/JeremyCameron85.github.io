/*
 * Jeremy Cameron
 * CS 320 Milestone Two
 * Task class which is used for storing task information
 */

package tasks;

import java.util.UUID;

/*
 * A task object which contains task details.
 * This includes a unique ID, name, and description.
 */
public class Task {
	
	// Unique ID that can not be updated.
	private final String id; 
	private String name;
	private String description;
	
	/*
	 * Task constructor with specified parameters.
	 * Automatically generates a unique 10 character ID when called.
	 */
	public Task(String name, String description) {
		this.id = generateUniqueId();
		setName(name);
		setDescription(description);
	}
	
	/*
	 * Generates a unique ID.
	 * ID is a 10 character string derived from a UUID:
	 * UUID is generated and converted to a string.
	 * All hyphens are removed.
	 * The first 10 characters are taken, starting from index '0' and ending at,
	 * but not including, index '10.'  
	 */
	private String generateUniqueId() {
		return UUID.randomUUID().toString().replace("-", "").substring(0,10);
	}
	
	/*
	 * Block of getters for their respective field.
	 * Includes task ID, name, and description.
	 */
	public String getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public String getDescription() {
		return description;
	}
	
	/*
	 * Block of setters for their respective field.
	 * Includes name and description.
	 * Throws IllegalArgumentException if parameters do not meet requirements, such as being null or
	 * an invalid length.
	 */
	public void setName(String name) {
		if (name == null || name.length() > 20) {
			throw new IllegalArgumentException("Invalid name, can not be null or longer than 20 characters.");
		}
		this.name = name;
	}
	
	public void setDescription(String description) {
		if (description == null || description.length() > 50) {
			throw new IllegalArgumentException("Invalid description, can not be null or longer than 50 characters.");
		}
		this.description = description;
	}

}
