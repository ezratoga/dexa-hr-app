CREATE SCHEMA employee AUTHORIZATION postgres;

-- employee.employee_profile definition

-- Drop table

-- DROP TABLE employee.employee_profile;

CREATE TABLE employee.employee_profile (
	employee_id int4 NOT NULL,
	user_id uuid NOT NULL,
	"name" varchar NULL,
	"position" varchar NULL,
	photo varchar NULL,
	createdat timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updatedat timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT employee_profile_unique UNIQUE (employee_id),
	CONSTRAINT fk_profile_user FOREIGN KEY (user_id,employee_id) REFERENCES employee.users(user_id,employee_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- employee.users definition

-- Drop table

-- DROP TABLE employee.users;

CREATE TABLE employee.users (
	user_id uuid DEFAULT gen_random_uuid() NOT NULL,
	employee_id serial4 NOT NULL,
	email varchar NULL,
	"password" varchar NULL,
	lastlogin _varchar NULL,
	phone varchar NULL,
	createdat timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updatedat timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT users_pk PRIMARY KEY (user_id, employee_id),
	CONSTRAINT users_unique UNIQUE (user_id, employee_id)
);