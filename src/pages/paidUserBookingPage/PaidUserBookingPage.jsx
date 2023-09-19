import "./style.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PaidUserBookingComponent from "../../components/PaidUserBooking/PaidUserBookingComponent";



const PaidUserBookingPage = ({approval}) => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <PaidUserBookingComponent  approval={approval}/>
        
      </div>
    </div>
  );
};

export default PaidUserBookingPage;
