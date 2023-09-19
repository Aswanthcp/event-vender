import "./event.scss";

import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
// import { cordinatorEvents } from "../../utils/Constants";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import AddEvent from "../../components/addEvent/AddEvent";




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Event = () => {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cord = useSelector((state) => state.cord);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const cordID = cord.id;
    // axios
    //   .get(
    //     `${cordinatorEvents}${cordID}`,
    //     { cordID: cordID },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     setEvents(response.data);
    //   })
    //   .catch((error) => {
    //     if (
    //       error.response &&
    //       error.response.status >= 400 &&
    //       error.response.status <= 500
    //     ) {
    //       console.log(error.response.data.message);
    //     }
    //   });
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        <div className="top">
          <h1>EVENTS</h1>
        </div>
        <AddEvent cordinator={cord.id} token={token} />

        {/* <div className="bottomevent">
          {events ? (
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">ID</TableCell>
                    <TableCell className="tableCell">EVENT NAME</TableCell>
                    <TableCell className="tableCell">DATE AVIALIABLE</TableCell>
                    <TableCell className="tableCell">CAPACITY</TableCell>
                    <TableCell className="tableCell">STATUS</TableCell>
                    <TableCell className="tableCell"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {events.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">{row.id}</TableCell>
                      <TableCell className="tableCell">
                        <div className="cellWrapper">
                          <img
                            src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="image"
                          />
                          {row.event.name}
                        </div>
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.event.date_available}
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.capacity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            ""
          )}
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Event;
