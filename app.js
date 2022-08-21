
// const cTable = require('console.table');
// const path = require('path');
// const express = require('express');
// const { start } = require('repl');
const mysql2 = require('mysql2');
const inquirer = require('inquirer');




const connection = mysql2.createConnection({  //DATABASE CONNECTION
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password",
  database: "employee_tracker_db"
});




connection.connect(err => {
  if (err) throw err;
  console.log('WORKING');
  menu();
});




// FUNCTIONS

// MENU FUNCTION
function menu() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "Select from the menu...",
    choices: [
      "View employees",
      "View roles",
      "View departments",
      "Add employee",
      "Add role",
      "Add department",
      "Delete department",
      "Exit",
      "Nuke"
    ]
  }).then((choose) => {
    switch (choose.action) {
      case "View employees": viewEmployees(); break;
      case "View roles": viewRoles(); break;
      case "View departments": viewDepartments(); break;
      case "Add employee": addEmployee(); break;
      case "Add department": addDepartment(); break;
      case "Delete department": delDepartment(); break;
      case "Exit": connection.end(); break;
      case "Nuke": connection.destroy(); break;
    }
  });
}
// MENU FUNCTION


// EMPLOYEE

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}

function addEmployee() {






  inquirer.prompt([
    {
      name: "name_f",
      type: "input",
      message: "First name?",
      validate: (value) => {
        if (value.length > 0) {
          return true;
        } else {
          console.log("Please enter a first name");
        }
      }
    },
    {
      name: "name_l",
      type: "input",
      message: "Last name?",
      validate: (value) => {
        if (value.length > 0) {
          return true;
          } else {
            console.log("Please enter a last name");
          }
        }
    },
    {
      name: "role",
      type: "list",
      choices: () => {
        let choiceArray = [];
        for (let i = 0; i < roles.length; i++) {
          choiceArray.push(roles[i].name);
        }
      }
    },






  ])


}

// EMPLOYEE


// ROLES
function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}
// ROLES 

// DEPARTMENT
function viewDepartments() {
  connection.query("SELECT * FROM department", (err, data) => {
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
  ]).then(answer => {
    connection.query(
      "INSERT INTO department SET ?",
      {
        name: answer.department
      },
      (err) => {
        if (err) throw err;
        // console.table(data);
        menu();
      }
    );
  });
}


// delete departments test
function delDepartment() {
  connection.query("DELETE FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}
// DEPARTMENT








