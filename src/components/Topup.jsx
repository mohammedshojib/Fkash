import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { usersContext } from "../App";

const Topup = () => {
  const [user, loading, errorHook] = useAuthState(auth);
  const email = user.email;
  const navigate = useNavigate();
  const [user1] = useContext(usersContext);

  const handleTopup = (event) => {
    event.preventDefault();
    const remain = user1[0]?.balance - event.target.amount.value;
    console.log(remain);

    const topup = {
      email: email,
      name: "TopUp",
      sim: event.target.sim.value,
      amount: event.target.amount.value,
      user: event.target.number.value,
    };
    const url = "http://localhost:5000/transaction";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(topup),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        toast.error(error);
      });

    const url1 = `http://localhost:5000/update/${email}`;
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
        toast.success(`TopUp succsessfull`);
        navigate("/dashboard");
      });
  };

  return (
    <div class="card flex-shrink-0 w-3/6 m-auto shadow-2xl bg-base-100">
      <div class="card-body">
        <h1 className="font-bold text-2xl">Mobile TopUp</h1>
        <form action="" onSubmit={handleTopup}>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Amount</span>
            </label>
            <input
              type="text"
              placeholder="Your Phone number"
              class="input input-bordered"
              name="number"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Amount</span>
            </label>
            <input
              type="text"
              placeholder="Your Review"
              class="input input-bordered"
              name="amount"
            />
          </div>
          <div class="form-control">
            <label class="label"></label>
            <select name="sim" class="select select-bordered w-full max-w-xs">
              <option selected>Robi</option>
              <option>Banglalink</option>
              <option>GraminPhone</option>
              <option>Telitalk</option>
              <option>Airtel</option>
            </select>
          </div>

          <div class="form-control mt-6">
            <input type="submit" className="btn" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Topup;
