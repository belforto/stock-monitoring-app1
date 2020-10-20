import React from "react";
import bank from "./bank.png";
import "./App.css";
import "./main.css";

//api key WOZZKFZ37NPP7BCD
import StockProvider from "./StockProvider";
import MoveStuffAround from "./MoveStuffAround";
import TestReduxScren from "./screens/TestReduxScren";
function App() {
  return (
    <div className="App">
   
      <header className="App-header">
       
        <img src={bank} className="App-logo" alt="logo" />
        <p>
          Welcome to the  <code>online</code>  Stock News
        </p>
       
      </header>
      <div className="alert alert-success" role="alert">
       Live Ticker Data
      </div>
      <MoveStuffAround />
      <StockProvider />

      <TestReduxScren/>
    </div>
  );
}

export default App;
