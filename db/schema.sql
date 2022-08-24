DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE IF NOT EXISTS department (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name_f VARCHAR(30),
    e_role VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY Key (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE IF NOT EXISTS role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    clout VARCHAR(30),
    cheddar VARCHAR(30),
    department_id INTEGER,
    PRIMARY KEY (id)
);

SELECT name
FROM department
LEFT JOIN role
ON department.id = role.department_id;

SELECT name_f, name_l, role_id, manager_id
FROM employee
JOIN role
ON employee.role_id = role.department_id;

SELECT clout, cheddar, department_id
FROM role
LEFT JOIN department
ON role.department_id = department.id;