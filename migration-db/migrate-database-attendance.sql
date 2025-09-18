CREATE SCHEMA employee_attendance AUTHORIZATION postgres; -- replace postgres with your own database user

-- employee_attendance.absence_in_out definition

-- Drop table

-- DROP TABLE employee_attendance.absence_in_out;

CREATE TABLE employee_attendance.absence_in_out (
	employee_id int4 NOT NULL,
	absence_in timestamp NOT NULL,
	absence_out timestamp NULL,
	work_type_in varchar NOT NULL,
	work_type_out varchar NULL,
	createdat timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updatedat timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT absence_in_out_pk PRIMARY KEY (employee_id, absence_in, work_type_in)
);