package testing;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({ AppointmentServiceTest.class, AppointmentTest.class, ContactServiceTest.class, ContactTest.class,
		TaskServiceTest.class, TaskTest.class })
public class AllTests {

}
