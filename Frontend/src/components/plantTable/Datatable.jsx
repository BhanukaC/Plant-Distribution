import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "id", headerName: "ID" },
  { field: "plantName", headerName: "plant Name" },
  { field: "type", headerName: "type", width: 130 },
  { field: "price", headerName: "price", width: 130 },
  { field: "count", headerName: "count", width: 130 },
];

const Datatable = () => {
  const [data, setData] = useState({});

  const handleDelete = (id) => {
    let isExecuted = window.confirm("Are you sure ?");
    if (isExecuted) {
      setData(data.filter((item) => item.id !== id));
      axios.delete("http://localhost:8080/api/plant/delete/" + id);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/plant/getAll").then((res) => {
      let dt = res.data.map((d) => {
        return {
          ...d,
        };
      });
      setData(res.data);
      // console.log(dt);
    });
  }, [""]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 710,
      renderCell: (params) => {
        const reLink = "/plant/edit/" + params.row.id;

        return (
          <div className="cellAction">
            <Link to={reLink} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable" style={{ height: "78%" }}>
      <div className="dataTableTitle1">
        <h1>All Plants</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
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
