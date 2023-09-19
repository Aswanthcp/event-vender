import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

import { getitemURL, itemURL } from "../../utils/Constants";

const ItemsList = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.vender);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });

  const getUsersList = () => {
    axios
      .get(`${getitemURL}${user.id}?page=${page}`, {
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
    <div className="lists">
      <Sidebar />
      <div className="ListsContainer">
        <Navbar />
        <div className="bottom">
          <h1 className="title">ITEMS LIST</h1>
          <>
            <div className="datatableTitle">
              Add New Items
              <Link to="/add-Items">
                <button className="link" onClick="">
                  Add New
                </button>
              </Link>
            </div>

            <div className="search">
              <input
                type="text"
                placeholder="Search"
                className="input-search"
              />
              <SearchOutlinedIcon className="search-icon" />
            </div>
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
      </div>
    </div>
  );
};

export default ItemsList;
