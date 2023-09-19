import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Toaster } from "react-hot-toast";
import { itemURL } from "../../utils/Constants";
import { useSelector } from "react-redux";
const EditItem = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState(items.name);
  const [description, setDescription] = useState(items.description);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.vender);
  const { id, item_type } = useParams();

  useEffect(
    (key) => {
      getUsersList();
    },
    [id]
  );

  const getUsersList = () => {
    axios
      .get(`/${itemURL}${item_type}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  };

  const renderFieldsByType = () => {
    switch (item_type) {
      case "Car":
        return (
          <>
            {/* Car-specific input fields and labels */}
            <div className="formInput">
              <label htmlFor="carBrand">Car Model:</label>
              <input
                type="text"
                id="carBrand"
                {...register("car_model")}
                defaultValue={items?.car_model}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Car Type:</label>
              <input
                type="text"
                id="carModel"
                defaultValue={items?.car_type}
                {...register("car_type")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Price:</label>
              <input
                type="text"
                id="carModel"
                defaultValue={items?.price}
                {...register("price")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Quantity:</label>
              <input
                type="number"
                id="carModel"
                defaultValue={items?.quantity}
                {...register("quantity")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Car Seat Capacity:</label>
              <input
                type="text"
                id="carModel"
                defaultValue={items?.seating_capacity}
                {...register("seating_capacity")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Fuel Type:</label>
              <input
                type="text"
                id="carModel"
                defaultValue={items?.fuel_type}
                {...register("fuel_type")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Transmission Type:</label>
              <input
                type="text"
                id="carModel"
                defaultValue={items?.transmission_type}
                {...register("transmission_type")}
              />
            </div>
            {/* Add more Car-specific input fields here */}
          </>
        );
      case "FlowerDecoration":
        return (
          <>
            {/* FlowerDecoration-specific input fields and labels */}
            <div className="formInput">
              <label htmlFor="flowerType">Flower Type:</label>
              <input
                type="text"
                id="flowerType"
                {...register("flowerType")}
                defaultValue={items?.flowerType}
              />
            </div>
            <div className="formInput">
              <label htmlFor="color">Color Scheme:</label>
              <input
                type="text"
                id="color"
                {...register("color_scheme")}
                defaultValue={items?.color_scheme}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Price:</label>
              <input
                type="text"
                id="carModel"
                defaultValue={items?.price}
                {...register("price")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Quantity:</label>
              <input
                type="number"
                id="carModel"
                defaultValue={items?.quantity}
                {...register("quantity")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="arrangementStyle">Arrangement Style:</label>
              <input
                type="text"
                id="arrangementStyle"
                {...register("arrangement_style")}
                defaultValue={items?.arrangement_style}
              />
            </div>
            <div className="formInput">
              <label htmlFor="size">Size:</label>
              <input
                type="text"
                id="size"
                {...register("size")}
                defaultValue={items?.size}
              />
            </div>
            <div className="formInput">
              <label htmlFor="additionalDecor">Additional Decor:</label>
              <textarea
                id="additionalDecor"
                {...register("additional_decor")}
                defaultValue={items?.additional_decor}
              ></textarea>
            </div>
          </>
        );
      case "FloorMat":
        return (
          <>
            <div className="formInput">
              <label htmlFor="material">Material:</label>
              <input
                type="text"
                id="material"
                {...register("mat_material")}
                defaultValue={items?.mat_material}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Price:</label>
              <input
                type="text"
                id="carModel"
                defaultValue={items?.price}
                {...register("price")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Quantity:</label>
              <input
                type="number"
                id="carModel"
                defaultValue={items?.quantity}
                {...register("quantity")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="matType">Mat Type:</label>
              <input
                type="text"
                id="matType"
                {...register("mat_type")}
                defaultValue={items?.mat_type}
              />
            </div>
            <div className="formInput">
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                {...register("color")}
                defaultValue={items?.color}
              />
            </div>
            <div className="formInput">
              <label htmlFor="size">Size:</label>
              <input
                type="text"
                id="size"
                {...register("size")}
                defaultValue={items?.size}
              />
            </div>
            <div className="formInput">
              <label htmlFor="pattern">Pattern:</label>
              <input
                type="text"
                id="pattern"
                {...register("pattern")}
                defaultValue={items?.pattern}
              />
            </div>
          </>
        );
      case "Platoon":
        return (
          <>
            <div className="formInput">
              <label htmlFor="platoonType">Platoon Type:</label>
              <input
                type="text"
                id="platoonType"
                {...register("platoon_type")}
                defaultValue={items?.platoon_type}
              />
            </div>
            <div className="formInput">
              <label htmlFor="size">Size:</label>
              <input
                type="text"
                id="size"
                {...register("platoon_size")}
                defaultValue={items?.platoon_size}
              />
            </div>
            <div className="formInput">
              <label htmlFor="platoonUniform">Platoon Uniform:</label>
              <input
                type="text"
                id="platoonUniform"
                {...register("platoon_uniform")}
                defaultValue={items?.platoon_uniform}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Price:</label>
              <input
                type="text"
                id="carModel"
                defaultValue={items?.price}
                {...register("price")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="carModel">Quantity:</label>
              <input
                type="number"
                id="carModel"
                defaultValue={items?.quantity}
                {...register("quantity")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="performanceStyle">Performance Style:</label>
              <input
                type="text"
                id="performanceStyle"
                {...register("performance_style")}
                defaultValue={items?.performance_style}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

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

      const datas = {
        id: items.id,
        name: data.name || items.name,
        description: data.description || items.name,
        available: true,
        supplier: user.id,
        item_type: data.type || items.item_type,
        imageUrl: imageUrl || items.imageUrl,
      };

      switch (item_type) {
        case "Car":
          datas.car_model = data.car_model || items.car_model;
          datas.car_type = data.car_type || items.car_type;
          datas.price = data.price || items.price;
          datas.quantity = data.quantity || items.quantity;
          datas.seating_capacity =
            data.seating_capacity || items.seating_capacity;
          datas.fuel_type = data.fuel_type || items.fuel_type;
          datas.transmission_type =
            data.transmission_type || items.transmission_type;
          break;
        case "FlowerDecoration":
          datas.flower_type = data.flowerType || items.flower_type;
          datas.color_scheme = data.color_scheme || items.color_scheme;
          datas.price = data.price || items.price;
          datas.quantity = data.quantity || items.quantity;
          datas.arrangement_style =
            data.arrangement_style || items.arrangement_style;
          datas.size = data.size || items.size;
          datas.additional_decor =
            data.additional_decor || items.additional_decor;
          break;
        case "FloorMat":
          datas.mat_material = data.mat_material || items.mat_material;
          datas.mat_type = data.mat_type || items.mat_type;
          datas.price = data.price || items.price;
          datas.quantity = data.quantity || items.quantity;
          datas.color = data.color || items.color;
          datas.size = data.size || items.size;
          datas.pattern = data.pattern || items.pattern;
          break;
        case "Platoon":
          datas.platoon_size = data.platoon_size || items.platoon_size;
          datas.platoon_type = data.platoon_type || items.platoon_type;
          datas.platoon_uniform = data.platoon_uniform || items.platoon_uniform;
          datas.price = data.price || items.price;
          datas.quantity = data.quantity || items.quantity;
          datas.performance_style =
            data.performance_style || items.performance_style;
          break;
        // Add cases for other item types here
        default:
          break;
      }

      await axios.put(
        `/${itemURL}${item_type}/${id}`,
        { datas },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Edit successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/items");
      }, 2000);
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

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <h1>EDIT ITEMS</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                imageSelected
                  ? URL.createObjectURL(imageSelected)
                  : items.imageUrl
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
                  Item Image:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={onImageSelect}
                  accept={acceptedFileTypes.join(",")}
                  style={{ display: "none" }}
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>

              <div className="formInput">
                <label>name</label>
                <input
                  type="text"
                  defaultValue={items.name}
                  onChange={(event) => setName(event.target.value)}
                  className="form-control"
                  placeholder="name"
                  {...register("name")}
                  required
                />
              </div>
              <div className="formInput">
                <label>Discription</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Discription"
                  defaultValue={items.description}
                  onChange={(event) => setDescription(event.target.value)}
                  {...register("description")}
                  required
                />
              </div>
              {renderFieldsByType()}
              <button type="submit">SAVE</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
