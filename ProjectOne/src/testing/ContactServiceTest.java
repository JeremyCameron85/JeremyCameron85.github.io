/*
 * Jeremy Cameron
 * CS 320
 * ContactServiceTest class which is used for conducting unit tests for the ContactService class.
 */

package testing;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import contacts.Contact;
import contacts.ContactService;

public class ContactServiceTest {
	
	// Instance of ContactService used in the unit tests
	private ContactService contactService;
	
	/*
	 * Initializes a new instance of ContactService before each test.
	 * This makes sure that each test runs with a fresh instance of ContactService.
	 */
	@BeforeEach
	public void setUp() {
		contactService = new ContactService();
	}
	
	/*
	 * Tests adding a new contact to the service.
	 * Verifies that a contact can be retrieved after being added.
	 */
	@Test
	public void testAddContact() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contactService.addContact(contact);
		assertNotNull(contactService.getContact(contact.getId()));
	}
	
	/*
	 * Tests adding a duplicate contact to the service.
	 * Verifies that an IllegalArgumentException is thrown when trying to add a duplicate contact ID.
	 */
	@Test
	public void testAddDuplicateContact() {
		Contact contact1 = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		Contact contact2 = new Contact("Jamie", "Cameron", "2226117828", "2222 My Ave");
		contactService.addContact(contact1);
		contactService.addContact(contact2);
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.addContact(contact1);
		});
	}
	
	/*
	 * Tests deleting a contact from the service.
	 * Verifies that a contact can be deleted and that an IllegalArgumentException is thrown when 
	 * trying to retrieve the contact ID afterwards.
	 */
	@Test
	public void testDeleteContact() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contactService.addContact(contact);
		String contactId = contact.getId();
		//System.out.println("Attempting to delete contact with ID: " + contactId);
		contactService.deleteContact(contactId);
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.getContact(contactId);
		});
	}
	
	/*
	 * Tests trying to delete a contact ID that does not exist.
	 * Verifies that an IllegalArgumentException is thrown when trying to delete a contact 
	 * that does not exist.
	 */
	@Test
	public void testDeleteInvalidContact() {
		String invalidContact = "Contact ID does not exist.";
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.deleteContact(invalidContact);
		});
	}
	
	/*
	 * Tests updating the first name of a contact.
	 * Verifies that the first name can be updated successfully.
	 */
	@Test
	public void testUpdateFirstName() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contactService.addContact(contact);
		contactService.updateFirstName(contact.getId(), "Jamie");
		Contact updatedContact = contactService.getContact(contact.getId());
		assertEquals("Jamie", updatedContact.getFirstName());
	}
	
	/*
	 * Tests updating the last name of a contact.
	 * Verifies that the last name can be updated successfully.
	 */
	@Test
	public void testUpdateLastName() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contactService.addContact(contact);
		contactService.updateLastName(contact.getId(), "Welker");
		Contact updatedContact = contactService.getContact(contact.getId());
		assertEquals("Welker", updatedContact.getLastName());
	}
	
	/*
	 * Tests updating the phone number.
	 * Verifies that the phone number can be updated successfully.
	 */
	@Test
	public void testUpdatePhoneNumber() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contactService.addContact(contact);
		contactService.updatePhoneNumber(contact.getId(), "2226117828");
		Contact updatedContact = contactService.getContact(contact.getId());
		assertEquals("2226117828", updatedContact.getPhoneNumber());
	}
	
	/*
	 * Tests updating the address.
	 * Verifies that the address can be updated successfully.
	 */
	@Test
	public void testUpdateAddress() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contactService.addContact(contact);
		contactService.updateAddress(contact.getId(), "2222 My Ave");
		Contact updatedContact = contactService.getContact(contact.getId());
		assertEquals("2222 My Ave", updatedContact.getAddress());
	}
	
	/*
	 * Tests trying to update a contact that does not exist.
	 * Verifies that an IllegalArgumentException is thrown when trying to update a contact
	 * that does not exist.
	 */
	@Test
	public void testUpdateInvalidContact() {
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.updateFirstName("Contact ID does not exist.", "Jamie");
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.updateLastName("Contact ID does not exist.", "Welker");
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.updatePhoneNumber("Contact ID does not exist.", "2226117828");
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.updateAddress("Contact ID does not exist.", "2222 My Ave");
		});
	}
	
	/*
	 * Tests updating a contact with an invalid phone number.
	 * Verifies that an IllegalArgumentException is thrown when trying to update the contact
	 * with an invalid phone number. 
	 */
	@Test
	public void testUpdateInvalidPhoneNumber() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contactService.addContact(contact);
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.updatePhoneNumber(contact.getId(), "2226");
		});
	}
	
	/*
	 * Tests updating a contact with an invalid address.
	 * Verifies that an IllegalArgumentException is thrown when trying to update the contact
	 * with an invalid address.
	 */
	@Test
	public void testUpdateInvalidAddress() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contactService.addContact(contact);
		assertThrows(IllegalArgumentException.class, () -> {
			contactService.updateAddress(contact.getId(), "1111 My Ave, Apt G, city, state, zip code");
		});
	}
}
