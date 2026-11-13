import EmployeeRepository from './repositories/employee-reposotories.js';
import EmployeeService from './services/employee-service.js';
import EmployeeController from './controllers/employee-controllers.js';

const repository = new EmployeeRepository();
const employeeService = new EmployeeService(repository);
const employeeController = new EmployeeController(employeeService);

employeeController.start();