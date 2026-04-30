import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const AdminRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", secret: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
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
      setError("Invalid admin secret code. Please check with your system administrator.");
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "admin",
      });
      setSuccess("Admin account created successfully! Redirecting to login…");
      setTimeout(() => navigate("/admin/login"), 1800);
    } catch (err) {
      setError(err.response?.data?.message || "Admin registration failed. Please try again.");
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "e.g. Arjun Sharma",
      autoComplete: "name",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      name: "email",
      label: "IITM Email",
      type: "email",
      placeholder: "yourname@iitm.ac.in",
      autoComplete: "email",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-6px); }
          40%,80% { transform: translateX(6px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes successPop {
          0%   { transform: scale(0.9); opacity: 0; }
          60%  { transform: scale(1.03); }
          100% { transform: scale(1); opacity: 1; }
        }

        .ar-input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 16px 13px 42px;
          border: 1.5px solid #E0E0E0;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #333333;
          background: #FAFAFA;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .ar-input:focus {
          border-color: #800000;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(128,0,0,0.08);
        }
        .ar-input::placeholder { color: #BBBBBB; }
        .ar-input.no-icon { padding-left: 16px; }

        .ar-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #800000 0%, #5a0000 100%);
          color: #FFFFFF;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(128,0,0,0.25);
        }
        .ar-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(128,0,0,0.35);
        }
        .ar-btn:active:not(:disabled) { transform: translateY(0); }
        .ar-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .ar-error  { animation: shake 0.4s ease; }
        .ar-success { animation: successPop 0.4s ease both; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#F4F4F4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background decorations */}
        <div style={{ position: "fixed", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(128,0,0,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "fixed", bottom: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(44,62,80,0.05)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: "480px", animation: "fadeUp 0.5s ease both" }}>
          {/* Card */}
          <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          }}>
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg, #2C3E50 0%, #1a252f 100%)",
              padding: "36px 36px 32px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "130px", height: "130px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
              <div style={{ position: "absolute", bottom: "-50px", left: "20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(128,0,0,0.15)" }} />

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: "rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px",
                }}>
                  🏛️
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                  Team Pragati · IITM
                </div>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "26px",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 6px",
                lineHeight: 1.2,
              }}>
                Admin Registration
              </h1>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(230,126,34,0.2)",
                border: "1px solid rgba(230,126,34,0.4)",
                borderRadius: "6px",
                padding: "4px 10px",
                marginTop: "6px",
              }}>
                <span style={{ fontSize: "11px" }}>⚠️</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, color: "#E67E22", letterSpacing: "0.05em" }}>
                  Development use only
                </span>
              </div>
            </div>

            {/* Form */}
            <div style={{ padding: "32px 36px 36px" }}>
              {/* Error */}
              {error && (
                <div className="ar-error" style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  background: "#FFF0F0", border: "1.5px solid #FFCCCC",
                  borderRadius: "10px", padding: "12px 14px", marginBottom: "20px",
                }}>
                  <span style={{ fontSize: "15px", lineHeight: 1.4 }}>⚠️</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#C0392B", margin: 0, lineHeight: 1.5 }}>
                    {error}
                  </p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="ar-success" style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  background: "#F0FBF4", border: "1.5px solid #A8E6C0",
                  borderRadius: "10px", padding: "12px 14px", marginBottom: "20px",
                }}>
                  <span style={{ fontSize: "15px", lineHeight: 1.4 }}>✅</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#27AE60", margin: 0, lineHeight: 1.5 }}>
                    {success}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Name + Email */}
                {fields.map((f) => (
                  <div key={f.name}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "7px" }}>
                      {f.label}
                    </label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#BBBBBB", display: "flex", alignItems: "center" }}>
                        {f.icon}
                      </span>
                      <input
                        className="ar-input"
                        name={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={handleChange}
                        required
                        autoComplete={f.autoComplete}
                      />
                    </div>
                  </div>
                ))}

                {/* Password */}
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "7px" }}>
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#BBBBBB", display: "flex", alignItems: "center" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      className="ar-input"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      style={{ paddingRight: "44px" }}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#AAA", padding: "2px", display: "flex", alignItems: "center" }}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                {/* Secret code */}
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "7px" }}>
                    Admin Secret Code
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#BBBBBB", display: "flex", alignItems: "center" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4l3 3" />
                      </svg>
                    </span>
                    <input
                      className="ar-input"
                      name="secret"
                      type={showSecret ? "text" : "password"}
                      placeholder="Enter the admin secret"
                      value={form.secret}
                      onChange={handleChange}
                      required
                      style={{ paddingRight: "44px" }}
                    />
                    <button type="button" onClick={() => setShowSecret(!showSecret)} style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#AAA", padding: "2px", display: "flex", alignItems: "center" }}>
                      <EyeIcon open={showSecret} />
                    </button>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#BBBBBB", margin: "6px 0 0", lineHeight: 1.5 }}>
                    Contact the system administrator for the secret code.
                  </p>
                </div>

                <button type="submit" className="ar-btn" disabled={loading} style={{ marginTop: "4px" }}>
                  {loading ? (
                    <>
                      <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                      Registering…
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                      Register Admin Account
                    </>
                  )}
                </button>
              </form>

              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #F0F0F0", textAlign: "center" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#AAA", margin: 0 }}>
                  Already registered?{" "}
                  <a href="/admin/login" style={{ color: "#800000", fontWeight: 600, textDecoration: "none" }}>
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#BBBBBB", marginTop: "20px" }}>
            IIT Madras · Team Pragati · UPSC Preparation Cell
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;