import React from "react";
import type { Employee } from "../model/Employee";
import { deleteEmployee, getAllEmployees } from "../services/DataService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListEmpl.css";

const ListEmpl = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const formatHireDate = (value?: string) => {
    if (!value) return "—";
    return value.includes("T") ? value.split("T")[0] : value;
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getAllEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-list-page">
      <div className="employee-list-card">
        <div className="employee-list-header">
          <div>
            <h1>Employee Directory</h1>
            <p>Browse the current team members and their roles.</p>
          </div>
          <Link className="back-home-link" to="/">
            Back to Home
          </Link>
        </div>

        <div className="employee-list-table-wrapper">
          <table className="employee-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Hire Date</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-name">
                      <span className="employee-avatar">
                        {employee.first_name?.charAt(0)}
                        {employee.last_name?.charAt(0)}
                      </span>
                      <span>
                        {employee.first_name} {employee.last_name}
                      </span>
                    </div>
                  </td>
                  <td>{employee.position}</td>
                  <td>{formatHireDate(employee.hire_date)}</td>
                  <td>
                    <div className="employee-actions">
                      <Link
                        className="action-link"
                        to={`/employee-details/${employee.id}`}
                      >
                        View
                      </Link>
                      <button
                        className="action-button delete"
                        type="button"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListEmpl;
