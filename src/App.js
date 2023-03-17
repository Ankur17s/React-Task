import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddUser from './components/AddUser'
import Updateuser from './components/Updateuser'

const App = () => {

  const [data, setData] = useState([]);

  const [selectedUser, setSelectedUser] = useState('');

  // for getting data function
  const getData = async () => {
    const url = "http://localhost:3000/users";
    let result = await fetch(url);
    result = await result.json();
    if (result) {
      setData(result)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //  delete user function
  const deleteUser = async (data) => {
    const id = data.id
    const url = "http://localhost:3000/users";
    let result = await fetch(`${url}/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    });
    result = await result.json();
    if (result) {
      console.log("user deleted");
      getData();
    }
  }

  // update user function
  const updateUser = (data) => {
    setSelectedUser(data);
  }

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header data={data} deleteUser={deleteUser} updateUser={updateUser} />} />
        <Route path='add' element={<AddUser getData={getData} />} />
        <Route path='/update' element={<Updateuser selectedUser={selectedUser} getData={getData}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
