import type { Employee } from "../model/Employee";

// set baseUrl to '/api' if vite.config.ts is set with proxy,
// otherwise set to 'http://localhost:3000/api' if CORS is set in backend API.
// const baseUrl = '/api';
const baseUrl = "http://localhost:3000/api";

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${baseUrl}/getAllEmployees`);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(`${baseUrl}/getEmployeeById/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch employee with id ${id}`);
  }
  return response.json();
};

export const addEmployee = async (
  employee: Omit<Employee, "id">,
): Promise<Employee> => {
  console.log("Adding employee in DataService:", employee);
  const response = await fetch(`${baseUrl}/addEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error("Failed to add employee");
  }
  return response.json();
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/deleteEmployee/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete employee with id ${id}`);
  }
};
