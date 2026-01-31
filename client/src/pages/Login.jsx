import React, { useState } from "react";

// Mock implementations for demo purposes
const axiosClient = {
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.email && data.password) {
      return { data: { token: "demo_token_12345" } };
    }
    throw { response: { data: { message: "Invalid credentials" } } };
  }
};

const useNavigate = () => {
  return (path) => {
    console.log("Navigation to:", path);
    alert(`Navigation to ${path} (demo mode)`);
  };
};

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosClient.post("/auth/login", form);
      localStorage.setItem("tp_token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#800000',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '2rem'
          }}>
            🎓
          </div>
          <h2 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '2rem',
            color: '#2C3E50',
            marginBottom: '8px',
            fontWeight: '700'
          }}>
            Member Login
          </h2>
          <p style={{
            color: '#555555',
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}>
            Welcome back to Team Pragati
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#FEE',
            border: '1px solid #FCC',
            color: '#C33',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: '#2C3E50',
            fontWeight: '600',
            marginBottom: '8px',
            fontSize: '0.9rem'
          }}>
            Email Address
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
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <label style={{
              color: '#2C3E50',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Password
            </label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Password recovery feature (demo)");
              }}
              style={{
                color: '#800000',
                fontSize: '0.85rem',
                textDecoration: 'none',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Forgot password?
            </a>
          </div>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
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
        </div>

        {/* Remember Me Checkbox */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '8px'
        }}>
          <input
            type="checkbox"
            id="remember"
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              accentColor: '#800000'
            }}
          />
          <label
            htmlFor="remember"
            style={{
              color: '#555555',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Remember me for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: loading ? '#999999' : '#800000',
            color: '#FFFFFF',
            padding: '14px',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Inter, sans-serif',
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.backgroundColor = '#660000';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.backgroundColor = '#800000';
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Register Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #E0E0E0'
        }}>
          <p style={{ color: '#555555', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <a
              href="#"
              onClick={() => navigate('/register')}
              style={{
                color: '#800000',
                textDecoration: 'none',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Create Account
            </a>
          </p>
        </div>

        {/* Additional Help */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#F9F9F9',
          borderRadius: '8px',
          border: '1px solid #E0E0E0'
        }}>
          <p style={{
            fontSize: '0.85rem',
            color: '#555555',
            lineHeight: '1.5',
            margin: 0
          }}>
            💡 <strong>New to Team Pragati?</strong> Join our UPSC preparation community and access exclusive study materials, mock tests, and events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;