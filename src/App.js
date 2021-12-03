import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login.js';
import AdminDashboard from './AdminDashboard.js';
import ProfessorDashboard from './ProfessorDashboard.js';
import ModifyAdmin from './ModifyAdmin.js';
import Register from './Register.js';
import TempPassword from './TempPassword.js';

// Enum for page types
export class Page {
  static Login = new Page("Login")
  static AdminDashboard = new Page("AdminDashboard")
  static ProfessorDashboard = new Page("ProfessorDashboard")
  static ModifyAdmin = new Page("ModifyAdmin")
  static Register = new Page("Register")
  static TempPassword = new Page("TempPassword")

  constructor(name) {
    this.name = name
  }
}

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(Page.Login)
  const [currentRequestForm, setCurrentRequestForm] = useState(null)

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
           <AdminDashboard setCurrentPage={setCurrentPage} currentUser={currentUser}/>
       </div>);
    case Page.ProfessorDashboard:
      return (
        <div className="App">
           <ProfessorDashboard setCurrentPage={setCurrentPage} currentUser={currentUser}
           currentRequestForm={currentRequestForm} setCurrentRequestForm={setCurrentRequestForm}/>
       </div>);
    case Page.ModifyAdmin:
      return (
        <div className="App">
           <ModifyAdmin setCurrentPage={setCurrentPage} currentUser={currentUser}/>
       </div>);
	case Page.Register:
      return (
        <div className="App">
          <Register setCurrentPage={setCurrentPage} setCurrentUser={setCurrentUser}/>
        </div>);
	case Page.TempPassword:
      return (
        <div className="App">
          <TempPassword setCurrentPage={setCurrentPage} setCurrentUser={setCurrentUser}/>
        </div>);
  }
}

export default App;
