import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class EmployeeController {
  constructor(employeeService) {
    this.employeeService = employeeService;
    this.rl = readline.createInterface({ input, output });
  }

  async start() {
    while (true) {
      console.log('\n=== SISTEMA DE GESTIÓN DE EMPLEADOS ACME ===');
      console.log('1. Registrar empleado');
      console.log('2. Listar empleados');
      console.log('3. Buscar empleado por identificación');
      console.log('4. Actualizar empleado');
      console.log('5. Eliminar empleado');
      console.log('6. Salir');

      const choice = await this.rl.question('\nSeleccione una opción (1-6): ');

      try {
        switch (choice.trim()) {
          case '1':
            await this.#handleCreate();
            break;
          case '2':
            this.#handleList();
            break;
          case '3':
            await this.#handleFind();
            break;
          case '4':
            await this.#handleUpdate();
            break;
          case '5':
            await this.#handleDelete();
            break;
          case '6':
            console.log('\nSaliendo del sistema...');
            this.rl.close();
            process.exit(0);
          default:
            console.log('\nOpción no válida. Por favor seleccione un número entre 1 y 6.');
        }
      } catch (error) {
        console.log(`\n[ERROR]: ${error.message}`);
      }
    }
  }

  async #handleCreate() {
    console.log('\n--- Registrar Nuevo Empleado ---');
    const identification = await this.rl.question('Identificación: ');
    const firstName = await this.rl.question('Nombres: ');
    const lastName = await this.rl.question('Apellidos: ');
    const gender = await this.rl.question('Género (F/M/O): ');
    const email = await this.rl.question('Email: ');
    const phone = await this.rl.question('Teléfono: ');
    const address = await this.rl.question('Dirección: ');
    const city = await this.rl.question('Ciudad: ');
    const profession = await this.rl.question('Profesión: ');
    const position = await this.rl.question('Cargo: ');
    const salary = await this.rl.question('Salario: ');

    const newEmp = this.employeeService.createEmployee({
      identification,
      firstName,
      lastName,
      gender,
      email,
      phone,
      address,
      city,
      profession,
      position,
      salary
    });

    console.log(`\n¡Empleado registrado con éxito! ID Único: ${newEmp.id}`);
  }

#handleList() {
    console.log('\n--- Lista de Empleados ---');
    const employees = this.employeeService.getAllEmployees();
    if (employees.length === 0) {
      console.log('No hay empleados registrados.');
      return;
    }
    employees.forEach((emp, index) => {
      console.log(`\n[Empleado ${index + 1}]:`);
      console.log(emp);
    });
  }

  async #handleFind() {
    console.log('\n--- Buscar Empleado ---');
    const identification = await this.rl.question('Ingrese la identificación: ');
    const emp = this.employeeService.getEmployeeByIdentification(identification);
    console.log('\nEmpleado encontrado:');
    console.log(emp);
  }

async #handleUpdate() {
    console.log('\n--- Actualizar Empleado ---');
    const employees = this.employeeService.getAllEmployees();
    if (employees.length === 0) {
      console.log('No hay empleados para actualizar.');
      return;
    }
    console.table(employees.map(e => ({ identificación: e.identification, nombre: `${e.firstName} ${e.lastName}` })));
    
    const identificationSearch = await this.rl.question('Ingrese la identificación del empleado a actualizar: ');
    
    console.log('\nIngrese los nuevos datos (deje en blanco para no modificar):');
    const identification = await this.rl.question('Nueva identificación: ');
    const firstName = await this.rl.question('Nuevos nombres: ');
    const lastName = await this.rl.question('Nuevos apellidos: ');
    const gender = await this.rl.question('Nuevo género (F/M/O): ');
    const email = await this.rl.question('Nuevo email: ');
    const phone = await this.rl.question('Nuevo teléfono: ');
    const address = await this.rl.question('Nueva dirección: ');
    const city = await this.rl.question('Nueva ciudad: ');
    const profession = await this.rl.question('Nueva profesión: ');
    const position = await this.rl.question('Nuevo cargo: ');
    const salary = await this.rl.question('Nuevo salario: ');

    const updatedData = {};
    if (identification.trim()) updatedData.identification = identification;
    if (firstName.trim()) updatedData.firstName = firstName;
    if (lastName.trim()) updatedData.lastName = lastName;
    if (gender.trim()) updatedData.gender = gender;
    if (email.trim()) updatedData.email = email;
    if (phone.trim()) updatedData.phone = phone;
    if (address.trim()) updatedData.address = address;
    if (city.trim()) updatedData.city = city;
    if (profession.trim()) updatedData.profession = profession;
    if (position.trim()) updatedData.position = position;
    if (salary.trim()) updatedData.salary = salary;

    const updatedEmp = this.employeeService.updateEmployee(identificationSearch, updatedData);
    console.log('\n¡Empleado actualizado con éxito!');
    console.log(updatedEmp);
  }

async #handleDelete() {
    console.log('\n--- Eliminar Empleado ---');
    const employees = this.employeeService.getAllEmployees();
    if (employees.length === 0) {
      console.log('No hay empleados para eliminar.');
      return;
    }
    console.table(employees.map(e => ({ identificación: e.identification, nombre: `${e.firstName} ${e.lastName}` })));
    
    const identification = await this.rl.question('Ingrese la identificación del empleado que desea eliminar: ');
    this.employeeService.deleteEmployee(identification);
    console.log('\n¡Empleado eliminado con éxito!');
  }
}

export default EmployeeController;