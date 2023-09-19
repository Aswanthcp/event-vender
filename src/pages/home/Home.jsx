import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";

import Weekly from "../../components/chart/weakly/weekly";
import DailyRevenueGraph from "../../components/chart/daily/Daily";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Month from "../../components/chart/monthly/Monthly";
import Year from "../../components/chart/yearly/yearly";
import { SupplierEarining, supplierBookingcount, supplierITemsCount } from "../../utils/Constants";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="events"  url={supplierITemsCount}/>
          <Widget type="order" url={supplierBookingcount} />
          <Widget type="earning" url={SupplierEarining} />
        </div>
        <div className="listContainer">
        <div style={{padding:"20px"}}>
          {/* <Link  style={{textDecoration:"none"}} to='/salesreport'>
          <Button variant="contained">SALES REPORT</Button>
          </Link> */}
          </div>
        
        <div className="charts">
          <DailyRevenueGraph title="DAILY  BOOKING" aspect={2 / 1} />
          <Weekly title="WEEKLY  BOOKING" aspect={2 / 1} />
        </div>
        <div className="charts">
          <Month  title="MONTHLY BOOKING" aspect={2 / 1} />
          <Year title="YEARLY BOOKNIG" aspect={2 / 1} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
