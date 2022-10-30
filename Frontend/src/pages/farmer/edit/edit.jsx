import "./edit.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const EditEmployee = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [NIC, setNIC] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState(0);
  const [address, setAddress] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/farmer/getSingle/" + id)
      .then((res) => {
        console.log(res.data);
        setFname(res.data.firstName);
        setLname(res.data.lastName);
        setNIC(res.data.nicNo);
        setArea(res.data.areaOfCropland);
        setType(res.data.type);
        setAddress(res.data.address);
      });
  }, [""]);

  const submitForm = (e) => {
    e.preventDefault();
    if (
      fname === "" ||
      lname === "" ||
      NIC === "" ||
      type === "" ||
      address === "" ||
      area === 0
    ) {
      alert("Please fill all required fields");
    } else {
      let data = {
        firstName: fname,
        lastName: lname,
        nicNo: NIC,
        areaOfCropland: area,
        address: address,
        type: type,
      };

      axios
        .put("http://localhost:8080/api/farmer/update/" + id, data)
        .then((res) => {
          if (res.status === 200) {
            alert("Farmer Updated");

            setFname("");
            setLname("");
            setNIC("");
            setAddress("");
            setType("");
            setArea(0);
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
                <label>First Name*</label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label>Last Name*</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>NIC Number*</label>
                <input
                  type="text"
                  value={NIC}
                  onChange={(e) => {
                    setNIC(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Address*</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Working Type*</label>

                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select type
                  </option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                </select>
              </div>

              <div className="formInput">
                <label>Area of cropland*</label>
                <input
                  type="number"
                  min="0"
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value);
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

export default EditEmployee;
