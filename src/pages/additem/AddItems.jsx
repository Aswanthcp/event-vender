import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { createItems } from "../../utils/Constants";
import { useSelector } from "react-redux";
import "./AddItem.scss";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

const AddItem = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.vender);

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageSelected, setImageSelected] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxFileSize = 1000000; // 1MB

  const onImageSelect = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      acceptedFileTypes.includes(file.type) &&
      file.size <= maxFileSize
    ) {
      setImageSelected(file);
      setErrorMessage("");
    } else {
      setImageSelected("");
      setErrorMessage(
        `Please select an image of type ${acceptedFileTypes.join(
          ", "
        )} and size up to ${maxFileSize / 1000000} MB`
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!imageSelected) {
        setErrorMessage("Please select an image");
        return;
      }
      const formData = new FormData();

      formData.append("file", imageSelected);
      formData.append("upload_preset", "ml_default");

      reset();

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/drk9fe53m/image/upload",
        formData,
        { withCredentials: false }
      );
      console.log(response);

      let imageUrl = response.data.secure_url;

      const datas = {
        name: data.name,
        description: data.description,
        available: true,
        supplier: user.id,
        item_type: data.type,
        imageUrl: imageUrl || "",
        price: data.price,
        quantity: data.quantity,
      };

      await axios.post(createItems, datas, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        toast.success("Item created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        navigate("/items");
      }, 20);
    } catch (error) {
      if (error.response) {
        generateError(error.response.data.message);
      } else {
        generateError("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>ADD ITEMS</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                imageSelected
                  ? URL.createObjectURL(imageSelected)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="upload-btn-wrapper">
              <label htmlFor="file" className="btn">
                Choose Image
                <DriveFolderUploadOutlinedIcon className="create-event-icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={onImageSelect}
                accept={acceptedFileTypes.join(",")}
                style={{ display: "none" }}
              />
              {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="formInput">
                <label htmlFor="name">
                  Name<span className="required">*</span>:
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors.name && <p className="error">Name is required.</p>}
              </div>
              <div className="formInput">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  {...register("description")}
                />
              </div>
              <div className="formInput">
                <label>price</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="price"
                  {...register("price", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                <span style={{ color: "red" }} className="text-danger">
                  {errors.price?.type === "required" && (
                    <span style={{ color: "red" }}>price is required</span>
                  )}
                  {errors.price?.type === "maxLength" && (
                    <span style={{ color: "red" }}>
                      price must less than 10 Character
                    </span>
                  )}
                </span>
              </div>
              <div className="formInput">
                <label>quantity</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="quantity"
                  {...register("quantity", {
                    required: true,
                  })}
                />
                <p style={{ color: "red" }} className="text-danger">
                  {errors.quantity?.type === "required" && (
                    <span>quantity name is required</span>
                  )}
                </p>
              </div>
              <div className="formInput">
                <label htmlFor="type">
                  Type<span className="required">*</span>:
                </label>
                <select id="type" {...register("type", { required: true })}>
                  <option value="">Select Type</option>
                  <option value="Car">Car</option>
                  <option value="FlowerDecoration">Flower Decoration</option>
                  <option value="FloorMat">Floor Mat</option>
                  <option value="Platoon">Platoon</option>
                  <option value="AudioEquipment">Audio Equipment</option>
                  <option value="LightingEquipment">Lighting Equipment</option>
                  <option value="StageBackdrop">Stage Backdrop</option>
                  <option value="Furniture">Furniture</option>
                  <option value="AudioVisualEquipment">
                    Audio Visual Equipment
                  </option>
                  <option value="CateringEquipment">Catering Equipment</option>
                  {/* Add other item types here */}
                </select>
                {errors.type && <p className="error">Type is required.</p>}
              </div>
              <button type="submit">Add Item</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AddItem;
