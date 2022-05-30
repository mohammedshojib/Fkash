import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { usersContext } from "../App";

const Sendmoney = () => {
  const [balance, setBlanace] = useState("");
  const [newUserB, setNewUserB] = useState([]);
  const [user] = useContext(usersContext);
  const [user1, loading, errorHook] = useAuthState(auth);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email1 = user1?.email;

  const updateDetails = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const amount = event.target.amount.value;

    const balance = parseInt(amount) + Number(newUserB);
    const remain = user[0]?.balance - parseInt(amount);

    if (email == email1) {
      toast.error("You cant send to your account");
    } else {
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
        });

      const url1 = `https://rocky-everglades-90190.herokuapp.com/update/${email1}`;
      fetch(url1, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ balance: remain }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      const topup = {
        email: email1,
        name: "Send Money",
        amount: amount,
        user: email,
      };
      const url2 = "https://rocky-everglades-90190.herokuapp.com/transaction";
      fetch(url2, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(topup),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success(`Send Money succsessfull`);
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const getData = (event) => {
    const email = event.target.value;
    axios
      .get(`https://rocky-everglades-90190.herokuapp.com/usersdata/${email}`, {
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem("accesToken")}`,
        // },
      })
      .then((res) => setNewUserB(res.data.balance));
  };
  const minSend = (event) => {
    if (event.target.value > user[0]?.balance) {
      setError("Insufient Balance");
    } else if (event.target.value < 10) {
      setError("Min 10 Sended ammount");
    } else if (
      event.target.value >= 10 &&
      user[0]?.balance > event.target.value
    ) {
      setError("");
    }
  };
  return (
    <div class="hero min-h-screen ">
      <div class="hero-content flex-col flex justify-between lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold mt-10">Send Money</h1>
          <h2 class="text-3xl font-bold mt-5">Balance:{user[0]?.balance}</h2>
          <p class="py-6">
            Demo user [abcd@xyz.com] Send your money to this id for testing
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div class="card-body">
            <form action="" onSubmit={updateDetails}>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="email"
                  required
                  onChange={getData}
                  placeholder="email"
                  name="email"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Amount</span>
                </label>
                <input
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  onChange={minSend}
                  class="input input-bordered"
                />
              </div>
              <p className="text-error mt-1">{error ? error : ""}</p>
              <div class="form-control mt-6">
                <button class="btn btn-primary" disabled={!error == ""}>
                  send money
                </button>
              </div>
            </form>
            <div class="divider">OR</div>
            <button
              class="btn btn-error"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sendmoney;
