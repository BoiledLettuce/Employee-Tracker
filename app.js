// get the client
const mysql = require('mysql2');

const cTable = require('console.table');
const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');

const path = require('path');
const express = require('express');
const { start } = require('repl');

//DATABASE CONNECTION
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password",
  database: "employee_tracker_db"
});
//DATA BASE CONNECTION

connection.connect(err => {
  if (err) throw err;
  console.log('WORKING');
  menu();
});




// FUNCTIONS

// MENU FUNCTION
function menu() {
  inquirer.prompt({
    name: "menu",
    type: "list",
    message: "Select from the menu...",
    choices: [
      "View employees",
      "View roles",
      "View departments",
      "Add employee",
      "Add role",
      "Add department",
      "Exit"
    ]
  }).then((choose) => {
    switch (choose.action) {
      case "View employees": viewEmployees(); break;
      case "View roles": viewRoles(); break;
      case "View departments": viewDepartments(); break;
      case "Add employee": addEmployee(); break;
      case "Add department": addDepartment(); break;
      case "Exit": connection.destroy(); break;
    }
  });
}
// MENU FUNCTION



function viewEmployees() {



}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    menu();
  });
}




// DEPARTMENT
function viewDepartments() {
  connection.query("SELECT * FROM deparment", (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });


}

function addDepartment() {
  inquirer.prompt([
    {
      name: "department",
      type: "input",
    }
  ]).then
}
// DEPARTMENT




function addEmployee() {



}



