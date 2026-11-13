import Employee from '../models/employee.js';

class EmployeeService {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  #validateEmployeeData(data) {
    if (!data.identification || data.identification.trim() === '') {
      throw new Error('La identificación es obligatoria.');
    }
    if (!data.firstName || data.firstName.trim() === '') {
      throw new Error('El nombre es obligatorio.');
    }
    if (!data.lastName || data.lastName.trim() === '') {
      throw new Error('El apellido es obligatorio.');
    }

    const validGenders = ['F', 'M', 'O'];
    const genderUpper = data.gender ? data.gender.toUpperCase() : '';
    if (!validGenders.includes(genderUpper)) {
      throw new Error('El género debe ser "F", "M" u "O".');
    }

    if (!data.email) {
      throw new Error('El direccion de correo electronico es obligatoria');
    }

    if (!data.phone) {
        throw new Error('El numero de telefono es obligatorio')
    }

    if (!data.address) {
        throw new Error('La direccion es obligatoria')
    }

    if (!data.city) {
        throw new Error('La ciudad de recidencia es obligatoria')
    }

    if (!data.profession) {
      throw new Error('La profesión es obligatoria');
    }

    if (!data.position){
        throw new Error('El cargo es obligatorio')
    }

    const salaryNum = Number(data.salary);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      throw new Error('El salario debe ser un valor numérico superior a 0.');
    }
  }

  createEmployee(data) {
    this.#validateEmployeeData(data);

    const existing = this.employeeRepository.findByIdentification(data.identification);
    if (existing) {
      throw new Error(`Ya existe un empleado registrado con la identificación: ${data.identification}`);
    }

    const newEmployee = new Employee(
      data.identification,
      data.firstName,
      data.lastName,
      data.gender.toUpperCase(),
      data.email,
      data.phone,
      data.address,
      data.city,
      data.profession,
      data.position,
      Number(data.salary)
    );

    return this.employeeRepository.save(newEmployee);
  }

  getAllEmployees() {
    return this.employeeRepository.findAll();
  }

  getEmployeeByIdentification(identification) {
    if (!identification || identification.trim() === '') {
      throw new Error('Debe proporcionar un número de identificación válido.');
    }

    const employee = this.employeeRepository.findByIdentification(identification);
    if (!employee) {
      throw new Error(`No se encontró ningún empleado con la identificación: ${identification}`);
    }

    return employee;
  }

  updateEmployee(identificationSearch, updatedData) {
    const existingEmployee = this.employeeRepository.findByIdentification(identificationSearch);
    if (!existingEmployee) {
      throw new Error('No se encontró el empleado que intenta actualizar con esa identificación.');
    }

    const mergedData = { ...existingEmployee, ...updatedData };
    this.#validateEmployeeData(mergedData);

    if (updatedData.identification && updatedData.identification !== existingEmployee.identification) {
      const conflict = this.employeeRepository.findByIdentification(updatedData.identification);
      if (conflict) {
        throw new Error('La nueva identificación ya está registrada en otro empleado.');
      }
    }

    if (mergedData.gender) mergedData.gender = mergedData.gender.toUpperCase();
    if (mergedData.salary) mergedData.salary = Number(mergedData.salary);

    return this.employeeRepository.update(existingEmployee.id, mergedData);
  }

  deleteEmployee(identification) {
    const existingEmployee = this.employeeRepository.findByIdentification(identification);
    if (!existingEmployee) {
      throw new Error('No se encontró el empleado que intenta eliminar con esa identificación.');
    }

    return this.employeeRepository.delete(existingEmployee.id);
  }
}

export default EmployeeService;