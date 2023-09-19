import "./style.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ApprovalComponent from "../../components/approvalLists/ApprovalComponent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const VendersOrderList = ({approval}) => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <ApprovalComponent  approval={approval}/>
        
      </div>
    </div>
  );
};

export default VendersOrderList;
