import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResponsiveContainer } from "recharts";
import { getOrders } from "../../../utils/Constants";

const DailyRevenueGraph = ({ aspect, title }) => {
  const [daily, setDaily] = useState([]);
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const token = useSelector((state) => state.token);
  const date = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchDailyRevenue = async () => {
      try {
        const response = await axios.get(`${getOrders}
        ${date}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setDaily(response.data);
      } catch (error) {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      }
    };

    fetchDailyRevenue();
  }, [date, token]);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Revenue",
        data: [0],
      },
    ],
    options: {
      chart: {
        width: 380,
        type: "bar",
      },
      title: {
        text: `Revenue for ${date}`,
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      xaxis: {
        categories: ["TODAY BOOKING"],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (daily.length > 0) {
      const dailys = daily.map((i) => i.quantity);
      const revenues = daily.map((i) => i.revenue);
      setChartData({
        series: [
          {
            name: "Revenue",
            data: [revenues[0]],
          },
        ],
        options: {
          chart: {
            width: 380,
            type: "bar",
          },
          title: {
            text: `Revenue for ${date}`,
            align: "center",
            style: {
              fontSize: "16px",
              fontWeight: "bold",
            },
          },
          xaxis: {
            categories: [`TODAY BOOKING: ${dailys[0]}`],
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    }
  }, [daily, date]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          width={380}
        />
      </ResponsiveContainer>
      <ToastContainer />
    </div>
  );
};

export default DailyRevenueGraph;
