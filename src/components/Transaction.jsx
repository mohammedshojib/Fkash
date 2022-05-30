import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  FaRegPaperPlane,
  FaWallet,
  FaRegCreditCard,
  FaCartPlus,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Transaction = () => {
  const [user1, loading, errorHook] = useAuthState(auth);
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();
  const email = user1?.email;

  useEffect(() => {
    axios
      .get(`https://rocky-everglades-90190.herokuapp.com/transaction`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accesToken")}`,
        },
      })
      .then((response) => {
        const txid = response.data.filter((user2) => user2?.email == email);
        console.log(response);
        setTransaction(txid);
      });
  }, []);
  console.log(transaction);
  return (
    <div class="overflow-x-auto mt-16">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Method</th>
            <th>Amount</th>
            <th>transaction Id</th>
            <th>Reciver</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((trx) => (
            <tr key={trx._id}>
              <td>{trx.name}</td>
              <td>{trx.amount}</td>
              <td>{trx._id}</td>
              <td>{trx.user}</td>
            </tr>
          ))}
          {transaction.length == 0 ? (
            <h1 className="text-center text-4xl">No transaction</h1>
          ) : (
            ""
          )}
        </tbody>{" "}
      </table>
      <div class="divider">OR</div>
      <div className="text-center">
        <button class="btn btn-error" onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Transaction;
