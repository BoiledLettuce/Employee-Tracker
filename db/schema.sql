DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE IF NOT EXISTS department (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS employee ();

CREATE TABLE IF NOT EXISTS role ();

SELECT name
FROM department
LEFT JOIN role
ON department.id = role.department_id;
