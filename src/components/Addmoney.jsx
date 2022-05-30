import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { usersContext } from "../App";

const Addmoney = () => {
  const [balance, setBlanace] = useState("");
  const [user] = useContext(usersContext);
  const [user1, loading, errorHook] = useAuthState(auth);
  const navigate = useNavigate();
  const email = user1?.email;

  const updateDetails = (event) => {
    event.preventDefault();
    if (event.target.balance.value === "XID100") {
      const url = `https://rocky-everglades-90190.herokuapp.com/update/${email}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ balance }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success(`${balance} added succsessfully`);
        });
    } else {
      toast.error("Use XID100 code get free 100");
    }
  };
  const ab = (event) => {
    if (event.target.value === "XID100") {
      setBlanace(100);
    } else {
      setBlanace("");
    }
  };
  return (
    <div class="hero min-h-screen">
      <div class="hero-content flex-col flex justify-between lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Balance:{user[0]?.balance}</h1>
          <p class="py-6">Use this code to get 100 demo money (XID100)</p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div class="card-body">
            <form action="" onSubmit={updateDetails}>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Amount</span>
                </label>
                <input
                  type="text"
                  placeholder="Use this code for testing(XID100)"
                  class="input input-bordered"
                  onChange={ab}
                  name="balance"
                />
              </div>

              <div class="form-control mt-6">
                <button class="btn btn-primary">Add Money</button>
              </div>
              <div class="divider">OR</div>
              <div class="form-control mt-6">
                <button
                  class="btn btn-error"
                  onClick={() => navigate("/dashboard")}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addmoney;
