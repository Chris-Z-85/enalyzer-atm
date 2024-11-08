import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState(0);
  const [array, setArray] = useState([]);

  const homeRef = useRef();
  const amountRef = useRef();
  const depositingRef = useRef();

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "←", 0];
  const money = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

  const startAtm = () => {
    setUserInput(0);
    amountRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  const depositMoney = (userInput) => {
    const divideBy = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    let resultArray = [];
    let total = userInput;

    divideBy.map((c) => {
      resultArray.push(Math.floor(total / c));
      return (total = total % c);
    });
    setArray(resultArray);
    userInput > 0 &&
      depositingRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <div className="Home" ref={homeRef}>
        <button onClick={startAtm}>
          <h3>
            Enalyzer
            <br /> ATM
          </h3>
        </button>
      </div>
      <div className="Atm" ref={amountRef}>
        <h1>Select amount</h1>
        <div className="input-box">
          <p>£</p>
          <p>{userInput.toString().replace(/^0+/, "")}</p>
        </div>
        <div className="keypad">
          {keys.map((key, index) => (
            <div
              className="key"
              key={index}
              style={{
                fontFamily: !Number.isInteger(key) && "Calibri",
              }}
              data-value={key}
              onClick={(e) =>
                Number.isInteger(key)
                  ? setUserInput((prev) => prev + e.target.dataset.value)
                  : setUserInput(userInput.substring(0, userInput.length - 1))
              }
            >
              {key}
            </div>
          ))}
          <div className="empty-key"></div>
        </div>
        <button className="key submit" onClick={() => depositMoney(userInput)}>
          submit
        </button>
      </div>
      {userInput !== 0 && (
        <div className="depositing" ref={depositingRef}>
          <div className="back-arrow">
            <button
              className="key"
              onClick={() =>
                homeRef?.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              ←
            </button>
          </div>
          <h1>Depositing</h1>
          <p className="depositing-amount">
            £ {userInput.toString().replace(/^0+/, "")}
          </p>
          <div className="money">
            {money.map(
              (currency, index) =>
                array[index] !== 0 && (
                  <div key={index} className="currency">
                    <div
                      className="currencyOuterStyle"
                      style={{
                        backgroundColor: currency >= 50 ? "white" : "#2bbed3",
                      }}
                    >
                      <div
                        className="currencyInnerStyle"
                        style={{
                          backgroundColor: currency >= 50 ? "#2bbed3" : "white",
                        }}
                      ></div>
                    </div>
                    <p>
                      {array[index]} x {currency}
                    </p>
                  </div>
                )
            )}
          </div>
          <div className="thank-you">
            <p>Thank you for using</p>
            <p>Enalyzer ATM</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
