/*
 * Jeremy Cameron
 * CS 320
 * ContactTest class which is used for conducting unit tests for the Contact class.
 */

package testing;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

import contacts.Contact;

public class ContactTest {
	
	/*
	 * Tests the successful creation of a Contact object with valid parameters.
	 * Verifies a unique contact ID is generated and that parameters are set correctly.
	 */
	@Test
	public void testContactCreationSuccess() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		assertNotNull(contact.getId());
		assertTrue(contact.getId().length() <= 10);
		assertEquals("Jeremy", contact.getFirstName());
		assertEquals("Cameron", contact.getLastName());
		assertEquals("1235157298", contact.getPhoneNumber());
		assertEquals("1111 Your St", contact.getAddress());
	}
	
	/*
	 * Tests using an invalid first name.
	 * Verifies that an IllegalArgumentException is thrown when the first name is longer than 10 characters.
	 */
	@Test
	public void testFirstNameInvalid() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Contact("JeremyJeremyJeremy", "Cameron", "1235157298", "1111 Your St");
		});
	}
	
	/*
	 * Tests using an invalid last name.
	 * Verifies that an IllegalArgumentException is thrown when the last name is longer than 10 characters.
	 */
	@Test
	public void testLastNameInvalid() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Contact("Jeremy", "CameronCameronCameron", "1235157298", "1111 Your St");
		});
	}
	
	/*
	 * Tests using an invalid phone number.
	 * Verifies than an IllegalArgumentException is thrown when the phone number is not exactly 10 digits or 
	 * doesn't only contain digits.
	 */
	@Test
	public void testPhoneNumberInvalid() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Contact("Jeremy", "Cameron", "123515729", "1111 Your St");
		});
		assertThrows(IllegalArgumentException.class, () -> {
			new Contact("Jeremy", "Cameron", "12351572982", "1111 Your St");
		});
		assertThrows(IllegalArgumentException.class, () -> {
			new Contact("Jeremy", "Cameron", "1235157298C", "1111 Your St");
		});
	}
	
	/*
	 * Tests using an invalid address.
	 * Verifies that an IllegalArgumentException is thrown when the address is longer than 30 characters.
	 */
	@Test
	public void testAddressInvalid() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St, Apt E, city, state, zip code");
		});
	}
	
	/*
	 * Tests setting the first name.
	 * Verifies that the first name can be updated correctly and that an IllegalArgumentException is thrown 
	 * if input is invalid.
	 */
	@Test
	public void testSetFirstName() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contact.setFirstName("Jamie");
		assertEquals("Jamie", contact.getFirstName());
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setFirstName(null);
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setFirstName("JamieCameronJamieCameron");
		});
	}
	
	/*
	 * Tests setting the last name.
	 * Verifies that the last name can be updated correctly and that an IllegalArgumentException is thrown
	 * if input is invalid.
	 */
	@Test
	public void testSetLastName() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contact.setLastName("Welker");
		assertEquals("Welker", contact.getLastName());
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setLastName(null);
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setLastName("WelkerWelkerWelker");
		});
	}
	
	/*
	 * Tests setting the phone number.
	 * Verifies that the phone number can be updated correctly and that an IllegalArgumentException is thrown
	 * if input is invalid.
	 */
	@Test
	public void testSetPhoneNumber() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contact.setPhoneNumber("2226117828");
		assertEquals("2226117828", contact.getPhoneNumber());
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setPhoneNumber(null);
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setPhoneNumber("123515729");
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setPhoneNumber("22261178288");
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setPhoneNumber("kekuwurofl");
		});
	}
	
	/*
	 * Tests setting the address.
	 * Verifies that the address can be updated correctly and that an IllegalArgumentException is thrown
	 * if input is invalid.
	 */
	@Test
	public void testSetAddress() {
		Contact contact = new Contact("Jeremy", "Cameron", "1235157298", "1111 Your St");
		contact.setAddress("2222 My Ave");
		assertEquals("2222 My Ave", contact.getAddress());
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setAddress(null);
		});
		assertThrows(IllegalArgumentException.class, () -> {
			contact.setAddress("1111 My Ave, Apt G, city, state, zip code");
		});
	}
}
