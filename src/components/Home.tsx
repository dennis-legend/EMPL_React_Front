import React, { useState } from "react";
import "./Home.css";

type MenuItem = {
  id: number;
  name: string;
  link: string;
};

const initialMenuList: MenuItem[] = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "getEmployees", link: "/employees" },
  { id: 3, name: "addEmployee", link: "/add-employee" },
  { id: 4, name: "getEmployeeById", link: "/employee-details/1" },
];

const Home = () => {
  const [menuList] = useState<MenuItem[]>(initialMenuList);

  return (
    <div className="home">
      <h1 className="home-title">Welcome to Our Application</h1>
      <nav className="home-nav">
        <ul className="home-menu">
          {menuList.map((item) => (
            <li key={item.id} className="home-menu-item">
              <a className="home-link" href={item.link}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Home;

// filepath: d:\FrontendVue\EMPL_Front_React\src\components\Home.css
