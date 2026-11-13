class EmployeeRepository {
  #employees = [];

  save(employee) {
    this.#employees.push(employee);
    return employee;
  }

  findAll() {
    return this.#employees;
  }

  findById(id) {
    return this.#employees.find(emp => emp.id === id);
  }

  findByIdentification(identification) {
    return this.#employees.find(emp => emp.identification === identification);
  }

  update(id, updatedData) {
    const index = this.#employees.findIndex(emp => emp.id === id);
    if (index === -1) return null;

    this.#employees[index] = {
      ...this.#employees[index],
      ...updatedData,
      id: id
    };

    return this.#employees[index];
  }

  delete(id) {
    const index = this.#employees.findIndex(emp => emp.id === id);
    if (index === -1) return false;

    this.#employees.splice(index, 1);
    return true;
  }
}

export default EmployeeRepository;