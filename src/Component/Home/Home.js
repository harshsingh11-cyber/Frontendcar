import React, {  useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Boots from './Boots';
// import Car from './Car';
import './Home.css';
import axios from 'axios';


function Home({ data }) {
  console.log(data)
  const [userData, setUserDate] = useState([...data]);
  const[count,setCount] = useState(0);

  function set(){
    setCount(count+1);
  }


  // const handleChange = (e) => {
  //   const { name, checked } = e.target;
  //   // console.log(name);
  //   // console.log(checked);
  //   const newData = userData.map((user) =>
  //     user.name === name ? { ...user, isChecked: checked } : user)
  //   // console.log(newData);
  //   setUserDate(newData);
  // }

  // async function getData(){
  //   await fetch('http://localhost:4000/').then((res)=>{
  //      res.json().then((res)=>{
  //       setUserDate(res);
  //      })
  //    })
  //  }

  // const handledelete = async () => {
  //   const checkedValue = [];
  //   for (let i = 0; i < userData.length; i++) {
  //     if (userData[i].isChecked === true) {
  //       checkedValue.push({ usernum: userData[i].usernum });
  //     }
  //   }
  //   console.log(checkedValue);
  // }







  return (
    <div>
      <Boots />
      <button onClick={set}>btn - {count}</button>
      {/* <Car/> */}
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
          // getData();
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
        <button>submit</button>
      </form>

      <div>
        {
          userData.map((e, index) => {
            return (
              <>
                <ul>
                  <hr />
                  <li>
                    {/* <h5>{index}</h5> */}
                    <input type="checkbox" />
                    <h5>{index + 1}</h5>
                    <h5>{e.car_name}</h5>
                    <h5>{e.years}</h5>
                    <h5>{e.price}</h5>
                    <h5>{e.color}</h5>
                    <h5>{e.milage}</h5>
                    <h5>{e.speed}</h5>
                    <h5>{e.power}</h5>
                  </li>
                  <hr />
                </ul>
              </>
            )
          })

        }
        <button >item delete</button>
      </div>
    </div>

  )
}



export default Home
//  name={e.name} chaecked={e?.isChecked || false} onChange={handleChange} onClick={handledelete}