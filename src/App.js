import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login.js';
import AdminDashboard from './AdminDashboard.js';
import CreateAdmin from './CreateAdmin.js';

// Enum for page types
export class Page {
  static Login = new Page("Login")
  static AdminDashboard = new Page("AdminDashboard")
  static CreateAdmin = new Page("CreateAdmin")

  constructor(name) {
    this.name = name
  }
}

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(Page.Login)

  console.log("Current user: " + currentUser)

  switch(currentPage) {
    case Page.Login:
      return (
        <div className="App">
          <Login setCurrentPage={setCurrentPage} setCurrentUser={setCurrentUser}/>
        </div>);
    case Page.AdminDashboard:
      return (
        <div className="App">
           <AdminDashboard setCurrentPage={setCurrentPage} currentUser={setCurrentPage, currentUser}/>
       </div>);
    case Page.CreateAdmin:
      return (
        <div className="App">
           <CreateAdmin setCurrentPage={setCurrentPage} currentUser={setCurrentPage, currentUser}/>
       </div>);
  }
}

export default App;
