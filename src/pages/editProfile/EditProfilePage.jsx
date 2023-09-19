
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useSelector } from "react-redux";

import "./editprofile.scss";
import { venderURL } from "../../utils/Constants";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const EditProfile = () => {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const token = useSelector((state) => state.token);
  const cord = useSelector((state) => state.cord);
  const [imageSelected, setImageSelected] = useState(null);
  const [vender, setVender] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let imageUrl = vender?.imageUrl;

      if (imageSelected) {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");
        reset();

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwkom79iv/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status !== 200) throw response.error.message;

        imageUrl = response.data.secure_url;
      }

      const eventData = {
        id: vender.id,
        email: data.email || vender.email,
        username: data.username || vender.username,
        phone_number: data.phone_number || vender.phone_number,
        imageUrl: imageUrl || "",
        description: data.description || vender.description,
      };

      await axios.put(venderURL + `${cord.id}`, eventData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        if (error.response.data) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${venderURL}${cord.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setVender(response.data);
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
  }, []);

  return (
    <div className="new-profile">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>EDIT PROFILE</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                imageSelected
                  ? URL.createObjectURL(imageSelected)
                  : vender?.imageUrl
              }
              alt=""
            />
          </div>
          <div className="right">
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              id="form"
            >
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  accept="image/jpeg, image/png"
                  type="file"
                  id="file"
                  onChange={(e) => setImageSelected(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>USER NAME</label>
                <input
                  type="text"
                  placeholder="ENTER USER NAME"
                  defaultValue={vender?.username}
                  {...register("username")}
                />
              </div>
              <div className="formInput">
                <label>EMAIL</label>
                <input
                  type="text"
                  defaultValue={vender?.email}
                  placeholder="ENTER EMAIL"
                  {...register("email")}
                />
              </div>
              <div className="formInput">
                <label>PHONE NUMBER</label>
                <input
                  type="text"
                  defaultValue={vender?.phone_number}
                  placeholder="ENTER PHONE NUMBER"
                  {...register("phone_number", {})}
                />
              </div>
              <div className="formInput">
                <label>DESCRIPTION</label>
                <input
                  type="text"
                  defaultValue={vender?.description}
                  placeholder="ENTER DESCRIPTION"
                  {...register("description")}
                />
              </div>
              <button type="submit">SAVE</button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProfile;
