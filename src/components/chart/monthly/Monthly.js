// import axios from "../../../utils/axios";
// import LineChart from "react-apexcharts";
// import React, { useState, useEffect } from "react";
// import { ResponsiveContainer } from "recharts";
// import { getOrders, getOrders_monthly } from "../../../utils/Constants";
// import { toast, ToastContainer } from "react-toastify";
// import { useSelector } from "react-redux";


// const Month = ({ aspect, title }) => {
//   const token = useSelector((state) => state.token);
//   const generateError = (error) =>
//     toast.error(error, {
//       position: "top-right",
//     });
//   const [options, setOptions] = useState({
//     chart: {
//       id: "basic-bar",
//     },

//     xaxis: {
//       Months: [
//         "Jan",
//         "Febr",
//         "Mar",
//         "Apr",
//         "May",
//         "June",
//         "July",
//         "Aug",
//         "Septe",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//     },
//   });

//   const [series, setSeries] = useState([
//     {
//       name: "Monthly Revenue",
//       data: [],
//     },
//   ]);

//   useEffect(() => {
//     try {
//       axios
//         .get(getOrders_monthly, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           // Group bookings by month and calculate total revenue

//           const bookingsByMonth = response.data.reduce((result, booking) => {
//               const month = new Date(booking.date_booked).getMonth();
//               result[month] = (result[month] || 0) + booking.total;
//               return result;
//             }, {});
//             console.log(response.data);

//           // Convert the bookingsByMonth object into an array of data for the chart
//           const chartData = options.xaxis.Months.map((month, index) => ({
//             x: month,
//             y: bookingsByMonth[index] || null,
//             color: bookingsByMonth[index] ? "#0070f3" : "#e5e7eb",
//           }));

//           setSeries([{ data: chartData }]);
//         })
//         .catch((error) => {
//           if (error.response) {
//             generateError(error.response.data.message);
//           } else {
//             generateError("Network error. Please try again later.");
//           }
//         });
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500
//       ) {
//         generateError(error.response.data.message);
//       }
//     }
//   }, []);

//   return (
//     <div className="chart">
//       <div className="title">{title}</div>
//       <ResponsiveContainer width="100%" aspect={aspect}>
//         <LineChart options={options} series={series} type="bar" width="500" />
//       </ResponsiveContainer>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Month;

import axios from "../../../utils/axios";
import LineChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import { ResponsiveContainer } from "recharts";
import { getOrders_monthly } from "../../../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Month = ({ aspect, title }) => {
  const token = useSelector((state) => state.token);
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Monthly Revenue",
      data: [],
    },
  ]);

  useEffect(() => {
    try {
      axios
        .get(getOrders_monthly, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {

          const chartData = options.xaxis.categories.map((month, index) => ({
            x: month,
            y: response.data[index] || null,
            color: response.data[index] ? "#0070f3" : "#e5e7eb",
          }));
          

          setSeries([{ data: chartData }]);
        })
        .catch((error) => {
          if (error.response) {
            generateError(error.response.data.message);
          } else {
            generateError("Network error. Please try again later.");
          }
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        generateError(error.response.data.message);
      }
    }
  }, [token]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart options={options} series={series} type="bar" width={500} />
      </ResponsiveContainer>
      <ToastContainer />
    </div>
  );
};

export default Month;
