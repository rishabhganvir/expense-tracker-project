import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import useGetTransaction from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionsTotal } = useGetTransaction();
  const { usersProfileName, userPfp } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState();
  const [transactionType, setTransactionType] = useState("expense");
  const { balance, income, expenses } = transactionsTotal;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription(""), setTransactionAmount("")
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
      <div className="expense-tracker">
        <div className="container">
          <h1>{usersProfileName}'s ExpenseTracker</h1>
          <div className="balance">
            <h3>Your balance</h3>
            <h2>{balance}</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>{income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>{expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense"> Expense </label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income </label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
        {userPfp && (
          <div className="profile">
            <img
              className="profile-photo"
              src={userPfp}
              alt="user's profile picture"
            />
          </div>
        )}
        <button className="sign-user-out" onClick={signUserOut}>
          Sign Out
        </button>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              // eslint-disable-next-line react/jsx-key
              <li>
                <h4>{description}</h4>
                <p>
                  {transactionAmount} <label>{transactionType}</label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
