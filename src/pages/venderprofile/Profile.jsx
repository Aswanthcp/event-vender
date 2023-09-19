import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import "./new.scss";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "../../utils/axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getitemURL, venderURL } from "../../utils/Constants";
import { useSelector } from "react-redux";
import ProfileComponent from "../../components/profilecomponent/ProfileComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
const ProfilePage = ({ inputs, title }) => {
  const [info, setInfo] = useState();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });
  const vender = useSelector((state) => state.vender);
  const token = useSelector((state) => state.token);
  const getUsersList = () => {
    axios
      .get(`${getitemURL}${vender.id}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setPagination(data);
      })
      .catch(handleError);
  };

  const handleError = (error) => {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "Network error. Please try again later.";
    toast.error(errorMessage, {
      position: "top-right",
    });
  };
  const getvenderinator = async () => {
    const venderID = vender.id;
    axios
      .get(
        `${venderURL}${venderID}`,
        { venderID: venderID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message);
        }
      });
  };
  useEffect(() => {
    getvenderinator();
    getUsersList();
  }, []);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className="title">PROFILE</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div style={{ color: "red" }}>
              <Link
                to="/edit-profile"
                style={{ textDecoration: "none", color: "green" }}
              >
                <EditOutlinedIcon />
              </Link>
            </div>
          </div>
          <div className="right">
            <ProfileComponent
              username={info?.username}
              imageUrl={info?.imageUrl}
              email={info?.email}
              phone_number={info?.phone_number}
            />
          </div>
        </div>
        <div className="bottom">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Avialiable</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagination.results.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      There are no Suppliers Items
                    </TableCell>
                  </TableRow>
                ) : (
                  pagination.results.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/items/${row.item_type?.item_type}/${row.id}`}
                        >
                          <div className="cellWrapper">
                            <img
                              src={row.imageUrl}
                              alt="image-item"
                              className="image"
                            />
                            {row.name}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {row.available ? "Available" : "Not Available"}
                      </TableCell>
                      <TableCell align="left">
                        {row.item_type?.item_type}
                      </TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
    
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
