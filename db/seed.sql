USE employee_tracker_db;


INSERT INTO employee(name_f, e_role, role_id) 
VALUES
    ("Solid Snake", "Soldier", 2),
    ("Big Boss", "Boss", 1);

INSERT INTO role(clout, cheddar, department_id) 
VALUES
    ("Boss", "$100,000", 1),
    ("Keyboard Jockey", "$10,000", 2);


INSERT INTO department(name)
    VALUES
        ("Google"),
        ("VMWare");
        