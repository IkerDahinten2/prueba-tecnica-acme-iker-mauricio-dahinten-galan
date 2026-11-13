import crypto from 'node:crypto';

class Employee {
  constructor(
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
  ) {

    this.id = crypto.randomUUID();
    

    this.identification = identification;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.profession = profession;
    this.position = position;
    this.salary = salary;
  }
}


export default Employee;