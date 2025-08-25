import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/admin/user/Login";
import Register from "./components/admin/user/Register";
import Update from "./components/admin/user/Update";
import ListCountry from "./components/admin/country/List";
import AddCountry from "./components/admin/country/Add";
import EditCountry from "./components/admin/country/Edit";
import ListBlog from "./components/admin/blog/List";
import AddBlog from "./components/admin/blog/Add";
import EditBlog from "./components/admin/blog/Edit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<Update />} />
          <Route path="/country/list" element={<ListCountry />} />
          <Route path="/country/add" element={<AddCountry />} />
          <Route path="/country/edit/:id" element={<EditCountry />} />
          <Route path="/blog/list" element={<ListBlog />} />
          <Route path="/blog/add" element={<AddBlog />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
