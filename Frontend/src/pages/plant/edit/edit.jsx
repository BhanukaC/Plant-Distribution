import "./edit.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const EditPlant = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:8080/api/plant/getSingle/" + id).then((res) => {
      setName(res.data.plantName);
      setPrice(res.data.price);
      setType(res.data.type);
      setCount(res.data.count);
    });
  }, [""]);

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

      axios
        .put("http://localhost:8080/api/plant/update/" + id, data)
        .then((res) => {
          if (res.status === 200) {
            alert("Plant Updated");

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
          <h1>Add Farmer</h1>
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
              <button onClick={submitForm}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlant;
