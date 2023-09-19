import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { paidUserBookingList, searchUserEvents } from "../../utils/Constants";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const PaidUserBookingComponent = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
  const supplier = useSelector((state) => state.vender);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const searchBy = (e) => {
    const key = e.target.value;
    if (!key) {
      getUsersList();
    } else {
      searchUsers(key);
    }
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

  const getUsersList = () => {
    axios
      .get(`${paidUserBookingList}${supplier.id}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPagination(data);
      })
      .catch(handleError);
  };

  const searchUsers = (key) => {
    axios
      .get(`${searchUserEvents}${key}?page=${page}`, {
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

  useEffect(() => {
    getUsersList();
  }, [page]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  return (
    <div className="bottom">
      <h1 className="title">PAID BOOKING LIST</h1>
      <>
        {/* <div className="search-div">
          <input
            type="text"
            placeholder="Search"
            onChange={searchBy}
            className="input-search"
          />
          <SearchOutlinedIcon className="search-icon" />
        </div> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Events Name</TableCell>
                <TableCell align="left">Date Booked From</TableCell>
                <TableCell align="left">Date Booked To</TableCell>
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">PaymentID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagination?.results?.length === 0 ? (
                "There are no User Events Orders"
              ) : (
                <>
                  {pagination?.results?.map((row) => {
                    // Add a conditional check for is_approved

                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell className="tableCell">
                          <div className="cellWrapper">
                            {row.user.username}| {row.item.name}
                          </div>
                        </TableCell>

                        <TableCell align="left">{row.date_booked}</TableCell>
                        <TableCell align="left">{row.date_bookedto}</TableCell>
                        <TableCell align="left">{row.user.username}</TableCell>
                        <TableCell align="left">{row.user.payment_id}</TableCell>
                      </TableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination">
          {pagination.hasPrevPage && (
            <Button onClick={prePage} variant="outlined">
              Previous
            </Button>
          )}
          {pagination.hasNextPage && (
            <Button onClick={nextPage} variant="outlined">
              Next
            </Button>
          )}
        </div>
        <ToastContainer position="top-right" />
      </>
    </div>
  );
};

export default PaidUserBookingComponent;
