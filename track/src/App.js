import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { response } from 'express';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions,setTransactions] = useState('');s


  useEffect(()=>{
   getTransactions().then(setTransactions = {
   })
  }, deps=[]);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL; 
    const response= await fetch(url);
    return await response.json();
   
  }



  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL; 
    const price =name.split(separate,'')[0];
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         price,
         name:name.substring(price.length+1),
         description, 
         datetime 
        })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    setName(value='');
    setDatetime(value='');
    setDescription(value='')
    .then(json => {
      console.log('result', json);
    })
    .catch(error => {
      console.log('There was a problem with the fetch operation:', error);
    });
  }

  let balance = 0;
  for (transaction of transactions){
    balance = balance + transaction.price;
  }
 
  balance = balance.toFixed(fractionDigits=2);
  const fraction = balance.split(separate='.')[1];
  balance = balance.split(separate='.')[0];



  return (
    <>
      <main>
        <h1>{balance}<span></span></h1>

        <form onSubmit={addNewTransaction}>
          <div className="basics">
            <input 
              type="text" 
              value={name}
              onChange={ev => setName(ev.target.value)} 
              placeholder="+200 new Samsung TV" 
            />
            <input 
              value={datetime} 
              onChange={ev => setDatetime(ev.target.value)}
              type="datetime-local" 
            />
          </div>

          <div className="description">
            <input 
              type="text" 
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder="Description" 
            />
          </div>

          <button type="submit">Add New Transaction</button>
        </form>

        <div className="transactions">
          {transactions.length > 0 && transactions.localeCompare(transaction =>(
            <div className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " +(transaction.price<0?'red':'green')}>
                {transaction.price}
                </div>
              <div className="datetime">2022-12-18 15:45</div>
            </div>
          </div>
          ))}
          

          
        </div>
      </main>
    </>
  );
}

export default App;
