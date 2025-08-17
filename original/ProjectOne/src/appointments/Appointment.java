/*
 * Jeremy Cameron
 * CS 320 Milestone Three
 * Appointment class which is used for storing appointment information.
 */

package appointments;

import java.util.UUID;
import java.util.Date;

/*
 * A appointment object which contains task details.
 * This includes a unique ID, date, and description.
 */
public class Appointment {
	
	// Unique ID that can not be updated.
	private final String id; 
	private Date date;
	private String description;
	
	/*
	 * Appointment constructor with specified parameters.
	 * Automatically generates a unique 10 character ID when called.
	 */
	public Appointment(Date date, String description) {
		this.id = generateUniqueId();
		setDate(date);
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
	 * Includes appointment ID, date, and description.
	 */
	public String getId() {
		return id;
	}
	
	public Date getDate() {
		return date;
	}
	
	public String getDescription() {
		return description;
	}
	
	/*
	 * Block of setters for their respective field.
	 * Includes date and description.
	 * Throws IllegalArgumentException if parameters do not meet requirements, such as being null,
	 * a date in the past, or an invalid length.
	 */
	public void setDate(Date date) {
		if (date == null || date.before(new Date())) {
			throw new IllegalArgumentException("Invalid date, can not be null or in the past.");
		}
		this.date = date;
	}
	
	public void setDescription(String description) {
		if (description == null || description.length() > 50) {
			throw new IllegalArgumentException("Invalid description, can not be null or longer than 50 characters.");
		}
		this.description = description;
	}
	

}
