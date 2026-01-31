import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const ADMIN_SECRET = "PRAGATI_ADMIN_2025"; 
// TODO: don't keep this in frontend.

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secret: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.secret !== ADMIN_SECRET) {
      setError("Invalid admin secret code.");
      return;
    }

    try {
      await axiosClient.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "admin"
      });

      setSuccess("Admin registered successfully! You can now log in.");
      setTimeout(() => navigate("/admin/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Admin registration failed");
    }
  };

  return (
    <div>
      <h2>Admin Registration (Dev Only)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Admin IITM email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="secret"
          type="text"
          placeholder="Admin secret code"
          value={form.secret}
          onChange={handleChange}
          required
        />

        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
};

export default AdminRegister;
