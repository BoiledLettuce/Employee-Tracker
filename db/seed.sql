USE employee_tracker_db;


INSERT INTO employee(name_f, e_role, role_id) 
VALUES
    ("Solid Snake", "Soldier", 2),
    ("Liquid Snake", "Brother", 3),
    ("Otacon", "Manager", 3),
    ("Big Boss", "Boss", 1);
   

INSERT INTO role(clout, cheddar, department_id) 
VALUES
    ("Janitor", "$1,000,000", 5)
    ("Manager", "$250,000", 4),
    ("Boss", "$100,000", 1),
    ("Soldier", "$25,000", 3),
    ("Keyboard Jockey", "$10,000", 2);


INSERT INTO department(name)
    VALUES
        ("ASUS"),
        ("Nintendo"),
        ("Google"),
        ("VMWare");
        