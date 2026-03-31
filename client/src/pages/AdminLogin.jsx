import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

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

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/login", form);
      if (res.data?.user?.role !== "admin") {
        setError("This account does not have admin privileges.");
        setLoading(false);
        return;
      }
      localStorage.setItem("tp_token", res.data.token);
      localStorage.setItem("tp_role", res.data.user.role);
      localStorage.setItem("tp_name", res.data.user.name || "");
      navigate("/admin/panel");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed. Please check your credentials.");
      setLoading(false);
    }
  };

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

        .al-input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 16px;
          border: 1.5px solid #E0E0E0;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #333333;
          background: #FAFAFA;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .al-input:focus {
          border-color: #800000;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(128,0,0,0.08);
        }
        .al-input::placeholder { color: #BBBBBB; }

        .al-btn {
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
        .al-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(128,0,0,0.35);
        }
        .al-btn:active:not(:disabled) { transform: translateY(0); }
        .al-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .al-error {
          animation: shake 0.4s ease;
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#F4F4F4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background decorations */}
        <div style={{ position: "fixed", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(128,0,0,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "fixed", bottom: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(44,62,80,0.05)", pointerEvents: "none" }} />

        <div style={{
          width: "100%",
          maxWidth: "440px",
          animation: "fadeUp 0.5s ease both",
        }}>
          {/* Card */}
          <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          }}>
            {/* Header strip */}
            <div style={{
              background: "linear-gradient(135deg, #800000 0%, #5a0000 100%)",
              padding: "36px 36px 32px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ position: "absolute", bottom: "-50px", left: "30px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

              {/* Logo mark */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px",
                }}>
                  🏛️
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
                    Team Pragati · IITM
                  </div>
                </div>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 6px",
                lineHeight: 1.2,
              }}>
                Admin Portal
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", margin: 0 }}>
                Restricted access — authorised personnel only
              </p>
            </div>

            {/* Form body */}
            <div style={{ padding: "32px 36px 36px" }}>
              {error && (
                <div
                  className="al-error"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    background: "#FFF0F0",
                    border: "1.5px solid #FFCCCC",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "16px", lineHeight: 1.4 }}>⚠️</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#C0392B", margin: 0, lineHeight: 1.5 }}>
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Email */}
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "7px" }}>
                    IITM Email
                  </label>
                  <input
                    className="al-input"
                    name="email"
                    type="email"
                    placeholder="yourname@iitm.ac.in"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "7px" }}>
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="al-input"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      style={{ paddingRight: "44px" }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer", color: "#AAA", padding: "2px",
                        display: "flex", alignItems: "center",
                      }}
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <button type="submit" className="al-btn" disabled={loading} style={{ marginTop: "4px" }}>
                  {loading ? (
                    <>
                      <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                      Authenticating…
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Login as Admin
                    </>
                  )}
                </button>
              </form>

              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #F0F0F0", textAlign: "center" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#AAA", margin: 0 }}>
                  Not an admin?{" "}
                  <a href="/" style={{ color: "#800000", fontWeight: 600, textDecoration: "none" }}>
                    Go to homepage
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#BBBBBB", marginTop: "20px" }}>
            IIT Madras · Team Pragati · UPSC Preparation Cell
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;