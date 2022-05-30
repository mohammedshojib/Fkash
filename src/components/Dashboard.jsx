import React, { useContext, useEffect, useState } from "react";
import sendmoney from "../assets/dollar.png";
import smartphone from "../assets/smartphone.png";
import {
  FaRegPaperPlane,
  FaWallet,
  FaRegCreditCard,
  FaCartPlus,
  FaDollarSign,
} from "react-icons/fa";
import { AiFillDiff, AiTwotoneTags, AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { usersContext } from "../App";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

const Dashboard = () => {
  const [user1, loading, errorHook] = useAuthState(auth);
  const [user, setUser] = useContext(usersContext);
  const email = user1?.email;

  useEffect(() => {
    axios
      .get(`https://rocky-everglades-90190.herokuapp.com/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accesToken")}`,
        },
      })
      .then((response) => {
        const myUser = response.data.filter((user2) => user2?.email == email);
        setUser(myUser);
      });
  }, []);

  return (
    <div class="hero min-h-screen">
      <div class="hero-content flex-col flex justify-between lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Balance:{user[0]?.balance}</h1>
          <p class="py-6">
            Login to change your lifestyle and build your buisness with us.
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control grid gap-5 m-auto grid-cols-4 mb-10">
              <Link to="/sendmoney">
                <div className="">
                  <FaRegPaperPlane className="w-full text-6xl p-4 bg-green-500 rounded-lg text-white" />
                  <p className="pt-2 text-xs">Transfer</p>
                </div>
              </Link>
              <Link to="/topup">
                <div className="">
                  <FaWallet className="w-full text-6xl p-4 bg-blue-500 rounded-lg text-white" />
                  <p className="pt-2 text-xs">TopUp</p>
                </div>
              </Link>
              <div>
                <FaRegCreditCard className="w-full text-6xl p-4 bg-orange-500 rounded-lg text-white" />
                <p className="pt-2 text-xs">Cash Out</p>
              </div>
              <div className="">
                <FaCartPlus className="w-full text-6xl p-4 bg-pink-500 rounded-lg text-white" />
                <p className="pt-2 text-xs">Payment</p>
              </div>
            </div>
            <div class="form-control grid gap-5 m-auto grid-cols-4 mb-10">
              <Link to="/add-money">
                <div className="">
                  <AiFillDiff
                    style={{ backgroundColor: "#A786FF" }}
                    className="w-full text-6xl p-4 rounded-lg text-white"
                  />
                  <p className="pt-2 text-xs">Add Money</p>
                </div>
              </Link>
              <Link to="/transaction">
                <div className="">
                  <FaDollarSign
                    style={{ backgroundColor: "#146EBE" }}
                    className="w-full text-6xl p-4 rounded-lg text-white"
                  />
                  <p className="pt-2 text-xs">Transaction</p>
                </div>
              </Link>
              <div className="">
                <AiTwotoneTags
                  style={{ backgroundColor: "#183153" }}
                  className="w-full text-6xl p-4 rounded-lg text-white"
                />
                <p className="pt-2 text-xs">Tickets</p>
              </div>
              <div className="">
                <AiOutlineMore
                  style={{ backgroundColor: "#059862" }}
                  className="w-full text-6xl p-4 rounded-lg text-white"
                />
                <p className="pt-2 text-xs">More</p>
              </div>
            </div>
            {/* <div class="form-control mt-6">
              <button class="btn btn-primary">Login</button>
            </div> */}
            <button onClick={() => signOut(auth)} className="btn">
              SingOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
