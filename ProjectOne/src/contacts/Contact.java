/*
 * Jeremy Cameron
 * CS 320
 * Contact class which is used for storing contact information.
 */

package contacts;

import java.util.UUID;

/*
 * A contact object which contains personal information.
 * This includes a unique ID, first and last name, phone number, and address.
 */
public class Contact {
	private final String id;  // Unique ID
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private String address;
	
	/*
	 * Contact constructor with specified parameters.
	 * Automatically generates a unique ID when called.
	 */
	public Contact(String firstName, String lastName, String phoneNumber, String address) {
		this.id = generateUniqueId();
		setFirstName(firstName);
		setLastName(lastName);
		setPhoneNumber(phoneNumber);
		setAddress(address);
	}
	
	/*
	 * Generates a unique ID.
	 * ID is a 10-character string derived from a UUID.
	 */
	private String generateUniqueId() {
		return UUID.randomUUID().toString().replace("-", "").substring(0, 10);
	}
	
	/*
	 * Block of getters for their respective field.
	 * Includes contact ID, first name, last name, phone number, and address.
	 */
	public String getId() {
		return id;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public String getPhoneNumber() {
		return phoneNumber;
	}
	
	public String getAddress() {
		return address;
	}
	
	/*
	 * Block of setters for their respective field.
	 * Includes first name, last name, phone number, and address.
	 * Throws exception if parameters don't meet requirements, such as being null, invalid length, or 
	 * not containing only digits (for phone numbers). 
	 */
	public void setFirstName(String firstName) {
		if (firstName == null || firstName.length() > 10) {
			throw new IllegalArgumentException("Invalid first name, can not be null or longer than 10 characters.");
		}
		this.firstName = firstName;
	}
	
	public void setLastName(String lastName) {
		if (lastName == null || lastName.length() > 10) {
			throw new IllegalArgumentException("Invalid last name, can not be null or longer than 10 characters.");
		}
		this.lastName = lastName;
	}
	
	public void setPhoneNumber(String phoneNumber) {
		if (phoneNumber == null || phoneNumber.length() != 10 || !phoneNumber.matches("\\d+")) {
			throw new IllegalArgumentException("Invalid phone number, can not be null and must be exactly 10 digits.");
		}
		this.phoneNumber = phoneNumber;
	}
	
	public void setAddress(String address) {
		if (address == null || address.length() > 30) {
			throw new IllegalArgumentException("Invalid address, can not be null or longer than 30 characters.");
		}
		this.address = address;
	}
}	

