import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import React, { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import Signup from "./pages/signup/Signup";
import New from "./pages/venderprofile/Profile";
import VendersOrderList from "./pages/itemOrders/ItemsOrders";
import AddItem from "./pages/additem/AddItems";
import EditItem from "./pages/editItem/ItemsEdit";
import ItemsList from "./pages/itemList/ItemList";
import PaidUserBookingPage from "./pages/paidUserBookingPage/PaidUserBookingPage";
import ProfilePage from "./pages/venderprofile/Profile";
import EditProfile from "./pages/editProfile/EditProfilePage";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = useSelector((state) => state.token);
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/vender-login" />;
    }
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route
          path="/vender-login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/vender-signup" element={<Signup />} />
        <Route path="/">
          <Route
            index
            element={token ? <Home /> : <Navigate to="/vender-login" />}
          />
        </Route>
        <Route path="/profile">
          <Route
            index
            element={token ? <ProfilePage /> : <Navigate to="/vender-login" />}
          />
        </Route>
        <Route path="/edit-profile">
          <Route
            index
            element={token ? <EditProfile /> : <Navigate to="/vender-login" />}
          />
        </Route>
        <Route path="/items">
          <Route
            index
            element={token ? <ItemsList /> : <Navigate to="/vender-login" />}
          />
        </Route>
        <Route
          path="/items/:item_type/:id"
          element={token ? <EditItem /> : <Navigate to="/vender-login" />}
        />
        {/* <Route path="/addItems" element={<Event />} /> */}
        <Route
          path="/item-orders"
          element={
            token ? <VendersOrderList /> : <Navigate to="/vender-login" />
          }
        />

        <Route
          path="/add-Items"
          element={token ? <AddItem /> : <Navigate to="/vender-login" />}
        />
        <Route
          path="/approved-orders"
          element={
            token ? (
              <VendersOrderList approval={'true'} />
            ) : (
              <Navigate to="/vender-login" />
            )
          }
        />
        <Route
          path="/unapproved-orders"
          element={
            token ? (
              <VendersOrderList approval={'false'} />
            ) : (
              <Navigate to="/vender-login" />
            )
          }
        />
        <Route
          path="/paid-orders"
          element={
            token ? (
              <PaidUserBookingPage />
            ) : (
              <Navigate to="/vender-login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
