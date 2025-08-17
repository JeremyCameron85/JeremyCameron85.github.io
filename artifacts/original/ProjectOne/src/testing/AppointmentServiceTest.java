/*
 * Jeremy Cameron
 * CS 320 Milestone Three
 * AppointmentServiceTest class which is used for conducting tests for the AppointmentService class.
 */

package testing;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import appointments.AppointmentService;
import appointments.Appointment;

import java.util.Date;
import java.util.Calendar;

public class AppointmentServiceTest {
	
	// Instance of AppointmentService used in testing.
	private AppointmentService appointmentService;
	
	// The Appointment object used for testing.
	private Appointment appointment;
	
	/* 
	 * Initializes an AppointmentService and creates an Appointment object with a future date and description.
	 * Adds the Appointment object to the AppointmentService to be used for each test case. 
	 */
	@BeforeEach
	public void setUp() {
		appointmentService = new AppointmentService();
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		Date futureDate = calendar.getTime();
		appointment = new Appointment(futureDate, "Appointment Description");
		appointmentService.addAppointment(appointment);
	}
	
	/*
	 * Tests adding a new appointment to the service.
	 * Verifies that a appointment can be retrieved after being added.
	 */
	@Test
	public void testAddAppointment() {
		assertNotNull(appointmentService.getAppointment(appointment.getId()));
	}
	
	/*
	 * Tests adding a duplicate appointment to the service.
	 * Verifies that an IllegalArgumentException is thrown when trying to add a duplicate appointment ID.
	 */
	@Test
	public void testAddDuplicateAppointment() {
		assertThrows(IllegalArgumentException.class, () -> {
			appointmentService.addAppointment(appointment);
		});
	}
	
	/*
	 * Tests deleting an appointment from the service.
	 * Verifies that an appointment can be deleted and that an IllegalArgumentException is thrown when
	 * trying to retrieve the appointment ID afterwards.
	 */
	@Test
	public void testDeleteAppointment() {
		String appointmentId = appointment.getId();
		appointmentService.deleteAppointment(appointmentId);
		assertThrows(IllegalArgumentException.class, () -> {
			appointmentService.getAppointment(appointmentId);
		});
	}
	
	/*
	 * Tests trying to delete an appointment ID that does not exist.
	 * Verifies that an IllegalArgumentException is thrown when trying to delete an appointment
	 * that does not exist.
	 */
	@Test
	public void testDeleteInvalidAppointment() {
		String invalidAppointment = "Invalid";
		assertThrows(IllegalArgumentException.class, () -> {
			appointmentService.deleteAppointment(invalidAppointment);
		});
	}	
}
