/*
 * Jeremy Cameron
 * CS 320 Milestone Three
 * AppointmentService class which is used for creating and managing appointments.
 */

package appointments;

import java.util.HashMap;
import java.util.Map;

/*
 * AppointmentService class used for managing tasks.
 * Provides methods for adding, deleting, and retrieving appointments.
 */
public class AppointmentService {
	
	/*
	 * Creates a hash map to store appointments, using the appointment ID as the key and
	 * the appointment object as the value. Used to efficiently manage appointments by
	 * their unique IDs.
	 */
	private final Map<String, Appointment> appointments = new HashMap<>();
	
	/*
	 * Adds an appointment to the service.
	 * Throws an IllegalArgumentException if it is a duplicate appointment ID.
	 */
	public void addAppointment(Appointment appointment) {
		if (appointments.containsKey(appointment.getId())) {
			throw new IllegalArgumentException("Appointment ID already exists.");
		}
		appointments.put(appointment.getId(), appointment);
	}
	
	/*
	 * Deletes an appointment from the service.
	 * Throws an IllegalArgumentException if the appointment ID does not exist.
	 */
	public void deleteAppointment(String id) {
		if (!appointments.containsKey(id)) {
			throw new IllegalArgumentException("Appointment ID does not exist.");
		}
		appointments.remove(id);
	}
	
	/*
	 * Retrieves an appointment by its ID.
	 * Throws an IllegalArgumentException if the appointment ID does not exist.
	 */
	public Appointment getAppointment(String id) {
		if (!appointments.containsKey(id)) {
			throw new IllegalArgumentException("Appointment ID does not exist.");
		}
		return appointments.get(id);
	}

}
