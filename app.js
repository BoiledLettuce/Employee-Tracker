
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
      "View ALL",
      "Add employee",
      "Add role",
      "Add department",
      "Update department",
      "Update employee",
      "Update role",
      "Delete employees",
      "Delete roles",
      "Delete department",
      "Exit",
      "Nuke Roles",
      "Nuke Employees",
      "Nuke Departments",
      "Nuke ALL"
    ]
  }).then((choose) => {
    switch (choose.action) {
      case "View employees": viewEmployees(); break;
      case "View roles": viewRoles(); break;
      case "View departments": viewDepartments(); break;
      case "View ALL": viewAll(); break;
      case "Add employee": addEmployee(); break;
      case "Add role": addRoles(); break;
      case "Add department": addDepartment(); break;
      case "Update department": updateDepartment(); break;
      case "Update employee": updateEmployee(); break;
      case "Update role": updateRole(); break;
      case "Delete employees": delEmployee(); break;
      case "Delete roles": delRole(); break;
      case "Delete department": delDepartment(); break;
      case "Exit": connection.end(); break;
      case "Nuke Roles": nukeRole(); break;
      case "Nuke Employees": nukeEmployees(); break;
      case "Nuke Departments": nukeDepartments(); break;
      case "Nuke ALL": connection.destroy(); break;
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
  const connex = "SELECT * FROM employee, role";
  connection.query(connex, (err, roles) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "name_f",
        type: "input",
        message: "Full name?",
        validate: (value) => {
          if (value.length > 0) {
            return true;
          } else {
            console.log("Please enter a full name");
          }
        }
      },
      {
        name: "e_role",
        type: "input",
        message: "Role?",
        validate: (value) => {
          if (value.length > 0) {
            return true;
          } else {
            console.log("Please enter a role");
          }
        }
      },
      {
        name: "role_id",
        type: "input",
        message: "Role id?",
        validate: (value) => {
          if (value.length > 0) {
            return true;
          } else {
            console.log("Please enter a role ID");
          }
        }
      },
    ]).then(answer => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          name_f: answer.name_f,
          e_role: answer.e_role,
          role_id: answer.role_id,
        },
        (err) => {
          if (err) throw err;
          menu();
        }
      )
    });
  }
  )
};

// EMPLOYEE

// ROLES
function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}

function addRoles() {
  const connecks = "SELECT * FROM role";
  connection.query(connecks, (err, data) => {
    if (err) throw err;
    //throw everything in here
    inquirer.prompt([
      {
        name: "clout",
        type: "input",
        message: "Job Position?"
      },
      {
        name: "cheddar",
        type: "input",
        message: "Salary in Dollar?"
      },
      {
        name: "department",
        type: "input",
        message: "Department ID?"
      }
    ]).then(answer => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          clout: answer.clout,
          cheddar: answer.cheddar,
          department_id: answer.department,
        },
        (err) => {
          if (err) throw err;
          menu();
        }
      );
    });
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
//DELETE FUNCTIONS
function delDepartment() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
  });

  inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "Choose a department to remove."
    }
  ]).then(answer => {
    connection.query(
      "DELETE from department WHERE ?",
      {
        name: answer.department //LOOK HERE
      },
      (err) => {
        if (err) throw err;
        menu();
      }
    );
  });
}

function delEmployee() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
  });
  inquirer.prompt([
    {
      name: "employee",
      type: "input",
      message: "Choose an employee to fire by FIRST NAME."
    }
  ]).then(answer => {
    connection.query(
      "DELETE from employee WHERE ?",
      {
        name_f: answer.employee
      },
      (err) => {
        if (err) throw err;
        menu();
      }
    );
  });
}

function delRole() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
  });
  inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "Choose a role to delete by name"
    }
  ]).then(answer => {
    connection.query(
      "DELETE from role WHERE ?",
      {
        clout: answer.role,
      },
      (err) => {
        if (err) throw err;
        menu();
      }
    );
  });
}


//NUKES
function nukeRole() {
  connection.query("DELETE FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log("Roles Nuked");
    menu();
  });
}

function nukeEmployees() {
  connection.query("DELETE FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log("Employees Nuked");
    menu();
  });
}

function nukeDepartments() {
  connection.query("DELETE FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log("Departments Nuked");
    menu();
  });
}
//NUKES


function viewAll() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
  });
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
  });
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}


//UPDATE FUNCTIONS


function updateDepartment() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);

    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "Choose a department by name"
      },
      {
        name: "newID",
        type: "input",
        message: "What is the departments exact ID?"
      },
      {
        name: "newDepartment",
        type: "input",
        message: "What is the departments new name?"
      },

    ]).then(answer => {
      connection.query(
        "UPDATE department SET ? WHERE ?",
        [
          {
            name: answer.newDepartment,
          },
          {
            id: answer.newID,
          },
        ],
        (err) => {
          if (err) throw err;
          menu();
        }
      )
    });
  });
}

function updateEmployee() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);

    inquirer.prompt([
      {
        name: "employeeFname",
        type: "input",
        message: "Choose employee by exact name"
      },
      {
        name: "employeeId",
        type: "input",
        message: "What is the employees exact id?"
      },
      {
        name: "newRole",
        type: "input",
        message: "What is their new role?"
      }
    ]).then(answer => {
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            e_role: answer.newRole,
          },
          {
            id: answer.employeeId,
          },
        ],
        (err) => {
          if (err) throw err;
          menu();
        }
      )
    });
  });
}


function updateRole() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);

    inquirer.prompt([
      {
        name: "rolename",
        type: "input",
        message: "What is the roles name?"
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the roles exact Id?"
      },
      {
        name: "newRole",
        type: "input",
        message: "What is the new role name?"
      }
    ]).then(answer => {
      connection.query(
        "UPDATE role SET ? WHERE ?",
        [
          {
            clout: answer.newRole,
          },
          {
            id: answer.roleId,
          },
        ],
        (err) => {
          if (err) throw err;
          menu();
        }
      )
    });
  });
}
//UPDATE FUNCTIONS