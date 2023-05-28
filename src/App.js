import './App.css';
import React from 'react';
//import {BrowserRouter, Router,Route} from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Signin from './Component/Singin/Signin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Boots from './Component/Home/Boots';
import './Component/Home/Home.css';
import { auth } from './firebase';

function App() {

  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const[del,setDel] = useState([]);
  const [el, setEl] = useState("");


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/');
      // console.log("first one==>" , response.data);
      setData(response.data);
      // setItem(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataD = async () => {
    try {
      const response = await axios.get('http://localhost:4000/dealer/');
      setDel(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteData = async ({ _id }) => {
    console.log(_id);
    try {
      const response = await axios.delete(`http://localhost:4000/delete/${_id}`);
      console.log('Data deleted successfully:', response.data);
    } catch (error) {
      console.log("error found");
    }
  };
  // console.log(el);
  const searchNow = async (el) => {
    const response = await axios.get(`http://localhost:4000/search/${el}`);
    console.log(response);
    console.log(response.data);
    setItem(response.data);
  }

  const handledelete = async () => {
    const checkedValue = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].isChecked === true) {
        checkedValue.push({ _id: data[i]._id });
      }
    }
    // console.log(checkedValue);
    // console.log(checkedValue[0]);
    for (let i = 0; i < checkedValue.length; i++) {
      deleteData(checkedValue[i]);
    }
    fetchData();
  }
  const handleChange = (e) => {
    const { name, checked } = e.target;
    // console.log(name);
    // console.log(checked);
    // alert("new");
    if (name === "allselect") {
      console.log("for all selects");
    }
    else {
      const newData = data.map((user) =>
        user.car_name === name ? { ...user, isChecked: checked } : user)
      // console.log(newData);
      setData(newData);
      // console.log(data);
    }

  }
  useEffect(() => {
    fetchData();
    fetchDataD();
  }, []);

  useEffect(() => {

  }, [searchNow]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element=
            {

              <div>
                <Boots />
                <form action="" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const car_name = formData.get('car');
                  const years = formData.get('year');
                  const price = formData.get('price');
                  const color = formData.get('color');
                  const milage = formData.get('milage');
                  const power = formData.get('power');
                  const speed = formData.get('max');

                  console.log(car_name, years, price, color, milage, power, speed);
                  axios.post("http://localhost:4000/in", { car_name, years, price, color, milage, power, speed }).then((res) => {
                    // setUserDate(res.data);
                    console.log("done");
                    fetchData();
                  });
                }}>

                  <label>Name Car Model</label>
                  <input type="text" name="car" />
                  <br />
                  <label>Year  of Model</label>
                  <input type="text" name="year" />
                  <br />
                  <label>Car Price</label>
                  <input type="number" name="price" />
                  <br />
                  <label>Car Color</label>
                  <input type="text" name="color" />
                  <br />
                  <label>Milage</label>
                  <input type="number" name="milage" />
                  <br />
                  <label>Car Power BHP</label>
                  <input type="number" name="power" />
                  <br />
                  <label>Max - Speed</label>
                  <input type="number" name="max" />
                  <br />
                  <button className='btn'>submit</button>
                </form>
                <br />
                <br />
                <div className='teble'>
                  <table>
                    <tr>
                      <th>Check</th>
                      <th>Number</th>
                      <th>Car Name</th>
                      <th>Years</th>
                      <th>Price</th>
                      <th>Colour</th>
                      <th>Milage</th>
                      <th>Speed</th>
                      <th>Power</th>
                    </tr>{
                      data.map((e, index) => {
                        return (
                          <>
                            <tr>
                              {/* <td>{index}</td> */}
                              <td><input type="checkbox" name={e.car_name} checked={e?.isChecked || false} onChange={handleChange} /></td>
                              <td>{index + 1}</td>
                              <td>{e.car_name}</td>
                              <td>{e.years}</td>
                              <td>{e.price}</td>
                              <td>{e.color}</td>
                              <td>{e.milage}</td>
                              <td>{e.speed}</td>
                              <td>{e.power}</td>
                            </tr>
                            <hr />
                          </>
                        )
                      })
                    }
                  </table>
                  <br />
                  <br />
                  <button className='btn' onClick={handledelete}>Delete</button>
                </div>
                <div>
                  <div>
                    <br />
                    <br />
                    <h1>Search </h1>
                    <label>Search by Nmae</label>
                    <input type="text" onChange={(e) => setEl(e.target.value)} />
                    <br />
                    <br />
                    <button className='btn' onClick={() => searchNow(el)}> Search</button>
                    <br />
                    <br />
                    <div className='teble'>
                      <table>
                        <tr>
                          <th>Number</th>
                          <th>Car Name</th>
                          <th>Years</th>
                          <th>Price</th>
                          <th>Colour</th>
                          <th>Milage</th>
                          <th>Speed</th>
                          <th>Power</th>
                        </tr>{
                          item.map((e, index) => {
                            return (
                              <>
                                <tr>
                                  {/* <td>{index}</td> */}
                                  {/* <td><input type="checkbox" name={e.car_name} checked={e?.isChecked || false} onChange={handleChange} /></td>  */}
                                  <td>{index + 1}</td>
                                  <td>{e.car_name}</td>
                                  <td>{e.years}</td>
                                  <td>{e.price}</td>
                                  <td>{e.color}</td>
                                  <td>{e.milage}</td>
                                  <td>{e.speed}</td>
                                  <td>{e.power}</td>
                                </tr>
                                <hr />

                              </>
                            )
                          })
                        }
                      </table>
                    </div>
                  </div>
                </div>

                <div className='teble'>
                  <br />
                  <br />

                  <h1>Dealer Information</h1>
                  <table>
                    <tr>
                    <th>Numbers</th>
                      <th>Car_Name</th>
                      <th>KMs</th>
                      <th>Ori_Paint</th>
                      <th>Number_Acci</th>
                      <th>Num_Buyer</th>
                      <th>Registr_Place</th>
                    </tr>{
                      del.map((e, index) => {
                        return (
                          <>
                            <tr>
                              {/* <td>{index}</td> */}
                              {/* <td><input type="checkbox" name={e.car_name} checked={e?.isChecked || false} onChange={handleChange} /></td> */}
                              <td>{index + 1}</td>
                              <td>{e.car_name}</td>
                              <td>{e.Kms}</td>
                              <td>{e.Original_Paint}</td>
                              <td>{e.Number_Accident}</td>
                              <td>{e.Number_Buyer}</td>
                              <td>{e.Registration_Place}</td>
                            </tr>
                            <hr />
                          </>
                        )
                      })
                    }
                  </table>
               </div>
              </div>
            }
          ></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
