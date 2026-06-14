import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Employee } from "../model/Employee";
import { getEmployeeById } from "../services/DataService";
import "./EmplDetail.css";
// this component just display the employee details based on the url parameter like
// '/employee-details/3' where 3 is the employee id

const EmplDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employeeId, setEmployeeId] = useState(id ?? "");

  useEffect(() => {
    const idFromUrl = id;
    if (!idFromUrl) {
      return;
    }

    const parsedId = Number(idFromUrl);
    if (Number.isNaN(parsedId) || parsedId <= 0) {
      console.error("Invalid employee ID in URL.");
      return;
    }

    const loadEmployee = async () => {
      try {
        const employeeData = await getEmployeeById(parsedId);
        setEmployee(employeeData);
      } catch (error) {
        console.error(`Error fetching employee with id ${parsedId}:`, error);
        setEmployee(null);
      }
    };

    loadEmployee();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedId = Number(employeeId);
    if (!employeeId || Number.isNaN(parsedId) || parsedId <= 0) {
      console.error("Please enter a valid employee ID.");
      return;
    }

    try {
      const employeeData = await getEmployeeById(parsedId);
      setEmployee(employeeData);
    } catch (error) {
      console.error(`Error fetching employee with id ${parsedId}:`, error);
      setEmployee(null);
    }
  };

  const formatDate = (value: string | Date | null | undefined) => {
    if (!value) return "N/A";

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleDateString();
  };

  return (
    <div className="detail-search-form">
      <h1>Employee Detail</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <label htmlFor="employee-id">Employee ID:</label>
          <input
            id="employee-id"
            type="number"
            value={employeeId}
            onChange={handleChange}
            required
            min="1"
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {employee && (
        <>
          <div className="detail-card">
            <h2>
              {employee.first_name} {employee.last_name}
            </h2>
            <p>Position: {employee.position}</p>
            <p>Hire Date: {formatDate(employee.hire_date)}</p>
          </div>
          <Link to="/employees" className="back-link">
            Back to Employee List
          </Link>
        </>
      )}
    </div>
  );
};

export default EmplDetail;
