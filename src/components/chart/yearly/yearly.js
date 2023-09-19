import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import LineChart from "react-apexcharts";
import { toast, ToastContainer } from "react-toastify";
import { ResponsiveContainer } from "recharts";
import { getOrdersYearly } from "../../../utils/Constants";
import { useSelector } from "react-redux";

const Year = ({ aspect, title }) => {
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
      categories: [],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Yearly Revenue",
      data: [],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getOrdersYearly, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log(data);
        // Extract years and revenue values from the data object
        const years = Object.keys(data);
        const revenue = Object.values(data);

        setOptions({
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: years,
          },
        });

        setSeries([
          {
            name: "Yearly Revenue",
            data: revenue,
          },
        ]);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          generateError(error.response.data.message);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart options={options} series={series} type="bar" />
      </ResponsiveContainer>
      <ToastContainer />
    </div>
  );
};

export default Year;
