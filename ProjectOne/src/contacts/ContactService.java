/*
 * Jeremy Cameron
 * CS 320
 * ContactService class which is used for creating and managing contacts.
 */

package contacts;

import java.util.HashMap;
import java.util.Map;

/*
 * ContactService class used for managing contacts.
 * It provides methods for adding, deleting, retrieving, and updating contacts. 
 */
public class ContactService {
	
	/*
	 * Creates a hash map to store contacts, using the contact ID as the key
	 * and the contact object as the value. Used to efficiently manage contacts by their unique IDs.
	 */
	private final Map<String, Contact> contacts = new HashMap<>();
	
	/*
	 * Adds a contact to the service.
	 * Throws an IllegalArgumentException if a duplicate contact ID.
	 */
	public void addContact(Contact contact) {
		if (contacts.containsKey(contact.getId())) {
			throw new IllegalArgumentException("Contact ID already exists");
		}
		contacts.put(contact.getId(), contact);
	}
	
	/*
	 * Deletes a contact from the service.
	 * Throws an IllegalArgumentException if contact ID does not exist.
	 */
	public void deleteContact(String contactId) {
		if (!contacts.containsKey(contactId)) {
			throw new IllegalArgumentException("Contact ID does not exist");
		}
		contacts.remove(contactId);
	}
	
	/*
	 * Updates the contact's first name.
	 * Throws an IllegalArgumentException if contact ID does not exist.
	 */
	public void updateFirstName(String contactId, String firstName) {
		if (!contacts.containsKey(contactId)) {
			throw new IllegalArgumentException("Contact ID does not exist");
		}
		contacts.get(contactId).setFirstName(firstName);
	}
	
	/*
	 * Updates the contact's last name.
	 * Throws an IllegalArgumentException if contact ID does not exist.
	 */
	public void updateLastName(String contactId, String lastName) {
		if (!contacts.containsKey(contactId)) {
			throw new IllegalArgumentException("Contact ID does not exist");
		}
		contacts.get(contactId).setLastName(lastName);
	}
	
	/*
	 * Updates the contact's phone number.
	 * Throws an IllegalArgumentException if contact ID does not exist.
	 */
	public void updatePhoneNumber(String contactId, String phoneNumber) {
		if (!contacts.containsKey(contactId)) {
			throw new IllegalArgumentException("Contact ID does not exist");
		}
		contacts.get(contactId).setPhoneNumber(phoneNumber);
	}
	
	/*
	 * Updates the contact's address.
	 * Throws an IllegalArgumentException if contact ID does not exist.
	 */
	public void updateAddress(String contactId, String address) {
		if (!contacts.containsKey(contactId)) {
			throw new IllegalArgumentException("Contact ID does not exist");
		}
		contacts.get(contactId).setAddress(address);
	}
	
	/*
	 * Retrieves a contact by its ID.
	 * Throws an IllegalArgumentException if contact ID does not exist.
	 */
	public Contact getContact(String id) {
		if (!contacts.containsKey(id)) {
			throw new IllegalArgumentException("Contact ID does not exist");
		}
		return contacts.get(id);
	}
}
