/*
 * Jeremy Cameron
 * CS 320 Milestone Three
 * AppointmentTest class which is used for conducting tests for the Appointment class.
 */

package testing;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import appointments.Appointment;

import java.util.Date;
import java.util.Calendar;

public class AppointmentTest {
	
	// The Appointment object used for testing
	private Appointment appointment;
	
	/* 
	 * Initializes an AppointmentService with an Appointment object, created with a future date and description,
	 * to be used for each test case. 
	 */
	@BeforeEach
	public void setUp() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, 1);		
		Date futureDate = calendar.getTime();
		appointment = new Appointment(futureDate, "Appointment Description");
	}
	
	/*
	 * Tests the successful creation of an Appointment object with valid parameters.
	 * Verifies a unique task ID is generated and that parameters are set correctly.
	 */
	@Test
	public void testAppointmentCreationSuccess() {
		String id = appointment.getId();
		Date actualDate = appointment.getDate();
		assertNotNull(id);
		assertEquals(10, id.length());
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, 1);		
		Date expectedDate = calendar.getTime();
		assertTrue(Math.abs(actualDate.getTime() - expectedDate.getTime()) < 1000);
		assertEquals("Appointment Description", appointment.getDescription());
	}
	
	/*
	 * Tests using an invalid date.
	 * Verifies that an IllegalArgumentException is thrown when the date is set in the past.
	 */
	@Test
	public void testDateInvalid() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, -1);
		Date pastDate = calendar.getTime();
		assertThrows(IllegalArgumentException.class, () -> {
			new Appointment(pastDate, "Appointment Description");
		});
	}
	
	/*
	 * Tests setting the date to the current date.
	 * Verifies that an IllegalArgumentException is thrown when the date is set to the current date.
	 */
	@Test
	public void testSetDate() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.MILLISECOND, 0);
		Date currentDate = calendar.getTime();
		assertThrows(IllegalArgumentException.class, () -> {
			new Appointment(currentDate, "Appointment Description");
		});
	}
	
	/*
	 * Tests using an invalid description.
	 * Verifies that an IllegalArgumentException is thrown when the description is longer than 50 characters.
	 */
	@Test
	public void testDescriptionInvalid() {
		assertThrows(IllegalArgumentException.class, () -> {
			new Appointment(appointment.getDate(), "Test Appointment Description More Than 50 Characters Block Block");
		});
	}
	
	/*
	 * Tests setting the description at the max character limit (50).
	 * Verifies that the description is updated correctly.
	 */
	@Test
	public void testSetDescription() {
		appointment.setDescription("fiftycharacterstest505050fiftycharacterstest505050");
		assertEquals("fiftycharacterstest505050fiftycharacterstest505050", appointment.getDescription());
	}

}
