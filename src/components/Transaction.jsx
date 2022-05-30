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
import auth from "../../firebase.init";

const Transaction = () => {
  const [user1, loading, errorHook] = useAuthState(auth);
  const [transaction, setTransaction] = useState([]);
  const email = user1?.email;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/transaction`, {
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
          {transaction.length == 0 ? <p>No transaction</p> : ""}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;