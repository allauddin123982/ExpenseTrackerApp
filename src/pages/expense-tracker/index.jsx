//Authentication page

import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
export const ExpenseTracker = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState();
  const [transactionType, setTransactionType] = useState("expense");
  const { name, profilePhoto } = useGetUserInfo();

  const { addTransaction } = useAddTransaction();
  const { transaction } = useGetTransaction();

  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    if(total <=0 && transactionType === "expense"){
      setError("Insufficient Balanace")
    }
    else{

      addTransaction({
        description,
        transactionAmount,
        transactionType,
      });
    }

    if (transactionType === "income") {
      let updatedTotal = parseInt(total);
      updatedTotal += parseInt(transactionAmount);
      setTotal(updatedTotal);
      let updatedIncome = parseInt(income);
      updatedIncome += parseInt(transactionAmount);
      setIncome(updatedIncome);
      console.log({ income });
    } else if (transactionType === "expense") {
      let updatedTotal = parseInt(total);
      updatedTotal -= parseInt(transactionAmount);
      setTotal(updatedTotal);
      let updatedExpense = parseInt(expense);
      updatedExpense += parseInt(transactionAmount);
      setExpense(updatedExpense);
      console.log({ expense });
    }
  };
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <h1>{name}</h1>

        {profilePhoto?.length && (
          <div>
            <img
              src={profilePhoto}
              alt="no img"
              style={{ borderRadius: "50%" }}
            />
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-danger" onClick={signUserOut}>
        sign out
      </button>

      <div style={{margin:"20px", display: "flex",justifyContent:"center", gap:"80px" }}>
        <p>Balance : ${total}</p>

        <p>Income $ {income}</p>

        <p>Expenses $ {expense}</p>
      </div>

      <div className=" w-100 d-flex justify-content-center">
        <form className="border p-2" onSubmit={submit}>
          <div style={{ display:"flex", gap:"10px"}}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"></label>
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
            ></label>
            <input
              type="number"
              placeholder="Amount"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
          </div>
          </div>
          <div className="d-flex">
            <label>expense</label>
            <div className="mb-3 form-check">
              <input
                type="radio"
                value="expense"
                id="expense"
                className="form-check-input"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
            </div>
            <label>income </label>
            <div className="mb-3 form-check">
              <input
                type="radio"
                value="income"
                id="income"
                className="form-check-input"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Transaction
          </button>
        <p style={{color:"red"}}>

        {error}
        </p>
        </form>
      </div>
      {/* create a DataBase in Firebase */}
        <h3 style={{margin:"15px"}}>Transactions List</h3>
      <div style={{display:"flex", justifyContent:"center"}}>
        <table style={{ border: "1px solid black", width:"440px" }}>
          <thead>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Description
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Amount
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Type</th>
          </thead>
          {transaction.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <>
                <tr style={{ border: "1px solid black", padding: "10px" }}>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {description}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {transactionAmount}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {" "}
                    <label
                      style={{
                        color: transactionType === "expense" ? "red" : "green",
                      }}
                    >
                      {transactionType}
                    </label>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};
