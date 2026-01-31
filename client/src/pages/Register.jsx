import React, { useState } from "react";


const axiosClient = {
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (url === "/auth/register") {
      return { data: { success: true } };
    }
    return { data: { token: "demo_token_12345" } };
  }
};

const useNavigate = () => {
  return (path) => {
    console.log("Navigation to:", path);
    alert(`Navigation to ${path} (demo mode)`);
  };
};

// IITM email validation
const isValidIitmEmail = (email) => {
  const lower = email.toLowerCase().trim();
  return (
    lower.endsWith("@smail.iitm.ac.in") ||
    lower.endsWith("@iitm.ac.in")
  );
};

// basic password strength checker
const getPasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (!password) {
    return { label: "", score: 0 };
  } else if (score <= 1) {
    return { label: "Weak", score };
  } else if (score === 2 || score === 3) {
    return { label: "Medium", score };
  } else {
    return { label: "Strong", score };
  }
};

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

 
    if (!isValidIitmEmail(form.email)) {
      setError("Please use your IITM email address (smail.iitm.ac.in / iitm.ac.in).");
      return;
    }

    try {
  
      await axiosClient.post("/auth/register", form);

   
      const loginRes = await axiosClient.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("tp_token", loginRes.data.token);
      setSuccess("Registration successful! Redirecting to your dashboard...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
            marginBottom: '8px',
            fontWeight: '700'
          }}>
            Create Account
          </h2>
          <p style={{
            color: '#555555',
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}>
            Join the IIT Madras UPSC preparation community
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div style={{
            backgroundColor: '#FEE',
            border: '1px solid #FCC',
            color: '#C33',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{
            backgroundColor: '#E8F5E9',
            border: '1px solid #A5D6A7',
            color: '#27AE60',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            {success}
          </div>
        )}

        {/* Name Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: '#2C3E50',
            fontWeight: '600',
            marginBottom: '8px',
            fontSize: '0.9rem'
          }}>
            Full Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '1rem',
              border: '2px solid #E0E0E0',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif',
              color: '#333333',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#800000'}
            onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
          />
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: '#2C3E50',
            fontWeight: '600',
            marginBottom: '8px',
            fontSize: '0.9rem'
          }}>
            IITM Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="yourname@smail.iitm.ac.in"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '1rem',
              border: '2px solid #E0E0E0',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif',
              color: '#333333',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#800000'}
            onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
          />
          <p style={{
            fontSize: '0.8rem',
            color: '#777777',
            marginTop: '6px',
            fontStyle: 'italic'
          }}>
            Use your official IIT Madras email
          </p>
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: '#2C3E50',
            fontWeight: '600',
            marginBottom: '8px',
            fontSize: '0.9rem'
          }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Choose a strong password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '1rem',
              border: '2px solid #E0E0E0',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif',
              color: '#333333',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#800000'}
            onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
          />

          {/* Password Strength Indicator */}
          {form.password && (
            <div style={{ marginTop: '10px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px'
              }}>
                <span style={{ fontSize: '0.85rem', color: '#555555' }}>
                  Password strength:
                </span>
                <strong style={{
                  fontSize: '0.85rem',
                  color:
                    passwordStrength.label === "Weak"
                      ? "#C33"
                      : passwordStrength.label === "Medium"
                      ? "#E67E22"
                      : "#27AE60"
                }}>
                  {passwordStrength.label}
                </strong>
              </div>
              {/* Strength Bar */}
              <div style={{
                height: '4px',
                backgroundColor: '#E0E0E0',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(passwordStrength.score / 4) * 100}%`,
                  backgroundColor:
                    passwordStrength.label === "Weak"
                      ? "#C33"
                      : passwordStrength.label === "Medium"
                      ? "#E67E22"
                      : "#27AE60",
                  transition: 'all 0.3s ease'
                }} />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            backgroundColor: '#800000',
            color: '#FFFFFF',
            padding: '14px',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '12px',
            fontFamily: 'Inter, sans-serif'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#660000'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#800000'}
        >
          Create Account
        </button>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #E0E0E0'
        }}>
          <p style={{ color: '#555555', fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <a
              href="#"
              onClick={() => navigate('/login')}
              style={{
                color: '#800000',
                textDecoration: 'none',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;