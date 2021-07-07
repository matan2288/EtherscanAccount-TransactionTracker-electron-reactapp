import { React, useEffect, useState, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Table from "react-bootstrap/Table";
import * as ReactBootStrap from "react-bootstrap";

function App() {
  const [apiData, setApiData] = useState([]);
  const [txnHash, setTxnHash] = useState(
    "ee41fe01a8f7eef0a90c5b181472ef3a9412e7b9"
  );
  const [defaultMinTransactions, setMinTransactions] = useState(0);
  const [defaultMaxTransactions, setMaxTransactions] = useState(100);
  const [loading, setLoading] = useState(false);

  const nextTransactions = () => {
    setMinTransactions(defaultMinTransactions + 100);
    setMaxTransactions(defaultMaxTransactions + 100);
  };
  const refreshTable = () => {
    setMinTransactions(0);
    setMaxTransactions(100);
  };

  const searchAccountInputRef = useRef();
  const toMaxTransactions = useRef();

  const evokeSearchBtn = () => {
    setTxnHash(searchAccountInputRef.current.value);
    setLoading(false);
  };
  const evokeTransactionsFilterBtn = () => {
    // console.log(toMaxTransactions.current.value);
    setMaxTransactions(toMaxTransactions.current.value);
  };

  const getDataFromApi = async () => {
    await fetch(
      //Offset: Query the number of records, optional. The default is to query 10000 records.
      `https://api.etherscan.io/api?module=account&action=txlist&address=${
        "0x" + txnHash
      }&endblock=99999999&page=page&offset=10&sort=asc&apikey=154BUMQ1Y6WSQRGWFRQY3R6GTKR4P8HS6P`
    )
      .then((response) => response.json())
      .then((dataAquiredFromApi) => {
        // console.log(dataAquiredFromApi);
        setApiData(dataAquiredFromApi.result);
        setLoading(true);
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFromApi();
  }, [txnHash, setTxnHash]);

  return (
    <div className="App">
      <div className="top-content">
        <div className="top-content-child1">
          <img
            src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
            alt="eth"
          />

          <p className="instructions">
            Instructions:Copy and paste the BOLD Account id after the 0x to the
            search bar and wait for the transactions to load, For example: 0x
            <b>ee41fe01a8f7eef0a90c5b181472ef3a9412e7b9</b>{" "}
          </p>
          <p className="please-note">
            Please NOTE!: If the User's ID is invalid, The table wont display
            anything.
          </p>

          <span>0x</span>

          <input
            type="text"
            id="searchbar"
            defaultValue=""
            ref={searchAccountInputRef}
          />

          <button onClick={evokeSearchBtn}>Search Account Transactions</button>
        </div>

        <div className="top-content-child2">
          <div>
            <a href="#" onClick={nextTransactions}>
              Show the next 100 Transactions
            </a>
            /
            <a href="#" onClick={refreshTable}>
              Refresh Table
            </a>
            <div>Pick Max Transactions To Display On Page</div>
            <span>
              <input type="number" ref={toMaxTransactions} />
            </span>
            <button onClick={evokeTransactionsFilterBtn}>Go</button>
          </div>
        </div>
      </div>

      {}
      <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>Ascended Order</th>
            <th>From</th>
            <th>To</th>
            <th>Value(ETH)</th>
            <th>Timestamp</th>
            <th>Confirmations</th>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            apiData
              .slice(defaultMinTransactions, defaultMaxTransactions)
              .map((field, i) => {
                return (
                  <tr key={i}>
                    <td>{defaultMinTransactions + i}</td>
                    <td>{field.from}</td>
                    <td>{field.to}</td>
                    <td>{field.value}</td>
                    <td>{field.timeStamp}</td>
                    <td>{field.confirmations}</td>
                    <td>{field.blockHash}</td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td>
                <ReactBootStrap.Spinner animation="border" />
              </td>
              <td>
                <ReactBootStrap.Spinner animation="border" />
              </td>
              <td>
                <ReactBootStrap.Spinner animation="border" />
              </td>
              <td>
                <ReactBootStrap.Spinner animation="border" />
              </td>
              <td>
                <ReactBootStrap.Spinner animation="border" />
              </td>
              <td>
                <ReactBootStrap.Spinner animation="border" />
              </td>
              <td>
                <ReactBootStrap.Spinner animation="border" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
