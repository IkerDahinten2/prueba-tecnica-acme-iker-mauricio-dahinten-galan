import EmployeeRepository from './repositories/EmployeeRepository.js';
import EmployeeService from './services/EmployeeService.js';
import EmployeeController from './controllers/EmployeeController.js';

const repository = new EmployeeRepository();
const employeeService = new EmployeeService(repository);
const employeeController = new EmployeeController(employeeService);

employeeController.start();