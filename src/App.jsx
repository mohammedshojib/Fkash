import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sendmoney from "./components/Sendmoney";
import Addmoney from "./components/Addmoney";
import { createContext, useEffect, useState } from "react";
import RequireAuth from "./components/RequireAuth";
import Profile from "./components/Profile";
import Topup from "./components/Topup";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import axios from "axios";
import Transaction from "./components/Transaction";
import Notfound from "./components/Notfound";

export const usersContext = createContext();

function App() {
  const [user, setUser] = useState([]);
  const [user1, loading, errorHook] = useAuthState(auth);
  const email = user1?.email;

  console.log(user);
  return (
    <usersContext.Provider value={[user, setUser]}>
      <div className="App">
        <Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Notfound />} />
            <Route
              path="/topup"
              element={
                <RequireAuth>
                  <Topup />
                </RequireAuth>
              }
            />
            <Route
              path="/transaction"
              element={
                <RequireAuth>
                  <Transaction />
                </RequireAuth>
              }
            />
            <Route
              path="/sendmoney"
              element={
                <RequireAuth>
                  <Sendmoney />
                </RequireAuth>
              }
            />
            <Route
              path="/add-money"
              element={
                <RequireAuth>
                  <Addmoney />
                </RequireAuth>
              }
            />
          </Routes>
        </Header>
        <ToastContainer />
      </div>
    </usersContext.Provider>
  );
}

export default App;
