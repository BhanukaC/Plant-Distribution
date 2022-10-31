import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "id", headerName: "ID" },
  { field: "farmerId", headerName: "farmer ID" },
  { field: "plantId", headerName: "plant ID" },
  { field: "userName", headerName: "User Name" },
  { field: "center", headerName: "Center" },
  { field: "count", headerName: "Count" },
  { field: "pricePerUnit", headerName: "price Per Unit" },
  { field: "total", headerName: "Total" },
  { field: "modifiedDate", headerName: "Date" },
];

const Datatable = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/distribution/getAll").then((res) => {
      let dt = res.data.map((d) => {
        return {
          id: d.id,
          modifiedDate: moment(d.date)
            .add(1, "days")
            .utc()
            .format("YYYY/MM/DD"),
          ...d,
        };
      });
      setData(dt);
      // console.log(dt);
    });
  }, [""]);

  return (
    <div className="datatable" style={{ height: "78%" }}>
      <div className="dataTableTitle1">
        <h1>All Distribution Records</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};

export default Datatable;
