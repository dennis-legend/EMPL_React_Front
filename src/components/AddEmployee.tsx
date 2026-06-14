import React from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../services/DataService";
import { useState } from "react";
import "./AddEmployee.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<{
    first_name: string;
    last_name: string;
    position: string;
    hire_date: string;
  }>({
    first_name: "",
    last_name: "",
    position: "",
    hire_date: new Date().toISOString().split("T")[0],
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   console.log('Input change:', name, value);
  //   setEmployee({
  //     ...employee,
  //     [name]: value,
  //   });
  // };

  // it requires to return the date string in the format 'YYYY-MM-DD' to be compatible with MySQL DATE type
  const formatMySqlDate = (value: string | Date): string => {
    const dateValue = typeof value === "string" ? value : value.toISOString();
    return dateValue.includes("T") ? dateValue.split("T")[0] : dateValue;
  };

  const setfirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      first_name: e.target.value,
    });
  };
  const setlastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      last_name: e.target.value,
    });
  };
  const setPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      position: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Submitting form with employee data:", employee);
      const newEmployee = await addEmployee({
        first_name: employee.first_name,
        last_name: employee.last_name,
        hire_date: formatMySqlDate(employee.hire_date),
        position: employee.position,
      });
      //after adding successfully, clear the form , then redirect to the list page
      setEmployee({
        first_name: "",
        last_name: "",
        position: "",
        hire_date: new Date().toISOString().split("T")[0],
      });

      // Redirect to employee list page after successful addition
      navigate("/employees");

      console.log("Employee added:", newEmployee);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="add-employee-page">
      <div className="add-employee-card">
        <h1 className="add-employee-title">Add Employee</h1>
        <p className="add-employee-subtitle">
          Fill in the details below to create a new employee record.
        </p>

        <form className="add-employee-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={employee.first_name}
                onChange={setfirstName}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={employee.last_name}
                onChange={setlastName}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                id="position"
                type="text"
                name="position"
                value={employee.position}
                onChange={setPosition}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hire_date">Hire Date</label>
              <input
                id="hire_date"
                type="date"
                name="hire_date"
                value={employee.hire_date}
                onChange={(e) =>
                  setEmployee({ ...employee, hire_date: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button className="submit-button" type="submit">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
