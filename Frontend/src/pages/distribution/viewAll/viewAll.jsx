import "./viewAll.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Datatable from "../../../components/distributionRecordTable/Datatable";

const ViewAllDistributions = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default ViewAllDistributions;
