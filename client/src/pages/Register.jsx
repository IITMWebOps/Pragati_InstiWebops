import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

// IITM email validation
const isValidIitmEmail = (email) => {
  const lower = email.toLowerCase().trim();
  return (
    lower.endsWith("@smail.iitm.ac.in") ||
    lower.endsWith("@iitm.ac.in")
  );
};

// password strength checker
const getPasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (!password) return { label: "", score: 0 };
  if (score <= 1) return { label: "Weak", score };
  if (score <= 3) return { label: "Medium", score };
  return { label: "Strong", score };
};

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // IITM email check
    if (!isValidIitmEmail(form.email)) {
      setError("Please use your IITM email (smail.iitm.ac.in / iitm.ac.in).");
      setLoading(false);
      return;
    }

    try {
      // 1. Register
      await axiosClient.post("/auth/register", form);

      // 2. Auto login
      const loginRes = await axiosClient.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      console.log("LOGIN RESPONSE:", loginRes.data);

      // 3. Store auth data
      localStorage.setItem("tp_token", loginRes.data.token);

      if (loginRes.data.user) {
        localStorage.setItem("tp_role", loginRes.data.user.role);
        localStorage.setItem("tp_name", loginRes.data.user.name);
      }

      // 4. Navigate
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#F9F9F9',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '48px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: '480px',
        width: '100%'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '2rem',
            color: '#2C3E50',
            fontWeight: '700'
          }}>
            Create Account
          </h2>
          <p style={{ color: '#555' }}>
            Join IIT Madras UPSC community
          </p>
        </div>

        {/* Messages */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            name="email"
            type="email"
            placeholder="IITM Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px" }}
          />

          {/* Password strength */}
          {form.password && (
            <p style={{
              color:
                passwordStrength.label === "Weak"
                  ? "red"
                  : passwordStrength.label === "Medium"
                  ? "orange"
                  : "green"
            }}>
              Strength: {passwordStrength.label}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#800000",
              color: "white",
              border: "none",
              marginTop: "16px",
              cursor: "pointer"
            }}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Login link */}
        <p style={{ marginTop: "16px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#800000", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;