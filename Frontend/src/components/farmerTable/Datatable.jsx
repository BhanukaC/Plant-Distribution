import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "id", headerName: "ID" },
  { field: "firstName", headerName: "First Name" },
  { field: "lastName", headerName: "Last Name" },
  { field: "nicNo", headerName: "NIC", width: 130 },
  { field: "areaOfCropland", headerName: "Area Of Cropland", width: 130 },
  { field: "address", headerName: "Address", width: 230 },
  { field: "type", headerName: "Working Type", width: 130 },
];

const salaryButton = [
  {
    field: "ViewSalaries",
    headerName: "",
    renderCell: getViewSalaryButton,
    width: 150,
  },
];
function getViewSalaryButton(params) {
  const reLink5 = "/hr/salary/viewall/" + params.row.EID;
  if (params.row.dailyWage === null) {
    return (
      <div className="cellAction">
        <Link to={reLink5} style={{ textDecoration: "none" }}>
          <div className="viewButton">View All Salaries</div>
        </Link>
      </div>
    );
  }
}

const Datatable = () => {
  const [data, setData] = useState({});

  const handleDelete = (id) => {
    let isExecuted = window.confirm("Are you sure ?");
    if (isExecuted) {
      setData(data.filter((item) => item.id !== id));
      axios.delete("http://localhost:8080/api/farmer/delete/" + id);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/farmer/getAll").then((res) => {
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
        const reLink = "/farmer/edit/" + params.row.id;

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
        <h1>All Farmers</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn).concat(salaryButton)}
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
