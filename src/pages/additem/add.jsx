import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Toaster } from "react-hot-toast";
import { createEvent, getEvents, itemURL } from "../../utils/Constants";
import { useSelector } from "react-redux";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import "./createEvent.scss"; // Import the CSS file for styling

const AddEvent = (props) => {
  const [event, setEvent] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.cord);

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
  const maxFileSize = 1000000;

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
      let imageUrl;

      if (imageSelected) {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");
        reset();
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwkom79iv/image/upload",
          formData,
          { withCredentials: false }
        );

        if (response.status !== 200) throw response.error.message;

        imageUrl = response.data.secure_url;
        console.log(response);
      }

      const eventData = {
        name: data.name,
        description: data.description,
        available: true,
        supplier: user.id,
        item_type: data.type,
        imageUrl: imageUrl || "",
        price: data.price,
        quantity: data.quantity,
      };

      await axios.post(createEvent, eventData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        toast.success("Event created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        navigate("/events");
      }, 20);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      }
    }
  };
  useEffect(() => {
    // getUsersList();
    getEventList();
  }, []);
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  return (
    <>
      <div className="top-create">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h3>Create Event</h3>
      </div>
      <div className="bottom-create">
        <div className="left-create">
          <img
            height={"500px"}
            src={
              imageSelected
                ? URL.createObjectURL(imageSelected)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
          <label htmlFor="file" className="create-event-file-label">
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
          {errorMessage && <p className="create-event-error">{errorMessage}</p>}
        </div>
        <div className="right-create">
          <form onSubmit={handleSubmit(onSubmit)} className="create-event-form">
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
    </>
  );
};

export default AddEvent;
