import "./add.scss";
import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import axios from "axios";

const AddPlant = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();
    if (name === "" || type === "" || price === 0 || count === 0) {
      alert("Please fill all required fields");
    } else {
      let data = {
        plantName: name,
        type: type,
        price: price,
        count: count,
      };

      axios.post("http://localhost:8080/api/plant/add", data).then((res) => {
        if (res.status === 200) {
          alert("Plant Added");

          setName("");
          setType("");
          setPrice(0);
          setCount(0);
        } else {
          console.log(res.status);
          alert("Sorry,Try again");
        }
      });
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Add Plant</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Plant Name*</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Plant Type*</label>

                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select type
                  </option>
                  <option value="Land plants">Land plants</option>
                  <option value="Green plants">Green plants</option>
                </select>
              </div>

              <div className="formInput">
                <label>Price *</label>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Count *</label>
                <input
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => {
                    setCount(e.target.value);
                  }}
                />
              </div>

              <div className="break"></div>
              <button onClick={submitForm}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
