import "./add.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import axios from "axios";

const AddDistribution = () => {
  const [userName, setUserName] = useState("");
  const [center, setCenter] = useState("");
  const [count, setCount] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const [farmers, setFarmers] = useState("");
  const [farmer, setFarmer] = useState("");
  const [plants, setPlants] = useState("");
  const [plant, setPlant] = useState("");

  const getStockCount = async (ID) => {
    setStockCount(plants.filter((p) => p.id == ID)[0].count);
  };

  const getPrice = async (ID) => {
    setPrice(plants.filter((p) => p.id == ID)[0].price);
  };

  const getPlants = async () => {
    const res = await axios.get("http://localhost:8080/api/plant/getAll");
    setPlants(res.data);
  };

  useEffect(() => {
    const getFarmers = async () => {
      const res = await axios.get("http://localhost:8080/api/farmer/getAll");
      setFarmers(res.data);
    };
    getFarmers();

    getPlants();
  }, [""]);

  const submitForm = (e) => {
    e.preventDefault();
    if (
      farmer === "" ||
      plant === "" ||
      userName === "" ||
      center === "" ||
      count === 0
    ) {
      alert("Please fill all required fields");
    } else {
      let data = {
        center: center,
        userName: userName,
        count: count,
        farmerId: farmer,
        plantId: plant,
      };

      axios
        .post("http://localhost:8080/api/distribution/add", data)
        .then((res) => {
          if (res.status === 200) {
            alert("Distribution Record Added");
            {
              setFarmer("");
              setPlant("");
              setUserName("");
              setCenter("");
              setStockCount(0);
              setCount(0);
              setPrice(0);
              setTotal(0);
              getPlants();
            }
          } else {
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
          <h1>Add Distribution Record</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Farmer*</label>

                <select
                  value={farmer}
                  onChange={(e) => {
                    setFarmer(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select Farmer
                  </option>
                  {Array.isArray(farmers)
                    ? farmers.map((f) => (
                        <option value={f.id} key={f.id}>
                          {f.firstName + " " + f.lastName}
                        </option>
                      ))
                    : ""}
                </select>
              </div>

              <div className="formInput">
                <label>Plant *</label>

                <select
                  value={plant}
                  onChange={(e) => {
                    setPlant(e.target.value);
                    getStockCount(e.target.value);
                    getPrice(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select Plant
                  </option>
                  {Array.isArray(plants)
                    ? plants.map((p) => (
                        <option value={p.id} key={p.id}>
                          {p.plantName}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="formInput">
                <label>User Name*</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Center*</label>

                <select
                  value={center}
                  onChange={(e) => {
                    setCenter(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select center
                  </option>
                  <option value="Galle">Galle</option>
                  <option value="Matara">Matara</option>
                  <option value="Kandy">Kandy</option>
                </select>
              </div>

              <div className="formInput">
                <label>Stock Count</label>
                <input type="number" disabled value={stockCount} />
              </div>

              <div className="formInput">
                <label>Count*</label>
                <input
                  type="number"
                  step="1"
                  min={0}
                  max={stockCount}
                  value={count}
                  onChange={(e) => {
                    setCount(e.target.value);
                    if (e.target.value > stockCount) {
                      alert("we dont't have enough stocks");
                      setCount(0);
                      setTotal(price * 0);
                    } else {
                      setTotal(price * count);
                    }
                  }}
                />
              </div>

              <div className="formInput">
                <label>Price Per unit</label>
                <input type="number" disabled value={price} />
              </div>

              <div className="formInput">
                <label>Total</label>
                <input type="number" disabled value={total} />
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

export default AddDistribution;
