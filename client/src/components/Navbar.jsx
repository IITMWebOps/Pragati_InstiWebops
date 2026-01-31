import React, { useState } from "react";
import img from "../assets/logo.jpg";
const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("tp_token"));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("tp_token");
    setToken(null);
    alert("Logged out successfully (demo)");
    window.location.href = "/";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkStyle = (isHovered, isButton = false) => ({
    color: isButton ? '#FFFFFF' : '#333333',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: isButton ? '10px 24px' : '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    backgroundColor: isButton ? '#800000' : (isHovered ? '#F4F4F4' : 'transparent'),
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    whiteSpace: 'nowrap'
  });

  const joinButtonStyle = (isHovered) => ({
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    padding: '10px 24px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    backgroundColor: isHovered ? '#660000' : '#800000',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    whiteSpace: 'nowrap'
  });

  return (
    <nav style={{
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        <a
          href="/"
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#800000',
            textDecoration: 'none',
            fontFamily: 'Merriweather, serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => e.target.style.color = '#660000'}
          onMouseLeave={(e) => e.target.style.color = '#800000'}
        >
          <img src={img} alt="Logo"
              style ={{
                width: '50px',
                height: "auto"
              }} />
          <span>Team Pragati</span>
        </a>

        {/* Mobile */}
        <button
          onClick={toggleMobileMenu}
          style={{
            display: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '8px',
            color: '#333333'
          }}
          className="mobile-toggle"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        className="desktop-nav">
          <a
    href="/"
    style={navLinkStyle(hoveredLink === 'home')}
    onMouseEnter={() => setHoveredLink('home')}
    onMouseLeave={() => setHoveredLink(null)}
  >
    Home
  </a>
          <a
            href="/about"
            style={navLinkStyle(hoveredLink === 'about')}
            onMouseEnter={() => setHoveredLink('about')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            About
          </a>
          <a
            href="/events"
            style={navLinkStyle(hoveredLink === 'events')}
            onMouseEnter={() => setHoveredLink('events')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Events
          </a>
          <a
            href="/mock-tests"
            style={navLinkStyle(hoveredLink === 'mock-tests')}
            onMouseEnter={() => setHoveredLink('mock-tests')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Mock Tests
          </a>
          <a
            href="/study-materials"
            style={navLinkStyle(hoveredLink === 'study-materials')}
            onMouseEnter={() => setHoveredLink('study-materials')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Study Materials
          </a>

          {/* Divider */}
          <div style={{
            width: '1px',
            height: '24px',
            backgroundColor: '#E0E0E0',
            margin: '0 4px'
          }} />

          {token ? (
            <>
              <a
                href="/dashboard"
                style={navLinkStyle(hoveredLink === 'dashboard')}
                onMouseEnter={() => setHoveredLink('dashboard')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                style={navLinkStyle(hoveredLink === 'logout', true)}
                onMouseEnter={(e) => {
                  setHoveredLink('logout');
                  e.target.style.backgroundColor = '#660000';
                }}
                onMouseLeave={(e) => {
                  setHoveredLink(null);
                  e.target.style.backgroundColor = '#800000';
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                style={navLinkStyle(hoveredLink === 'login')}
                onMouseEnter={() => setHoveredLink('login')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Login
              </a>
              <a
                href="/register"
                style={joinButtonStyle(hoveredLink === 'join')}
                onMouseEnter={() => setHoveredLink('join')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Join Community
              </a>
            </>
          )}
        </div>

        {/* Mobile */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '16px 20px',
            display: 'none'
          }}
          className="mobile-menu">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <a
                href="/about"
                style={{
                  ...navLinkStyle(false),
                  display: 'block',
                  textAlign: 'left'
                }}
              >
                About
              </a>
              <a
                href="/events"
                style={{
                  ...navLinkStyle(false),
                  display: 'block',
                  textAlign: 'left'
                }}
              >
                Events
              </a>
              <a
                href="/mock-tests"
                style={{
                  ...navLinkStyle(false),
                  display: 'block',
                  textAlign: 'left'
                }}
              >
                Mock Tests
              </a>
              <a
                href="/study-materials"
                style={{
                  ...navLinkStyle(false),
                  display: 'block',
                  textAlign: 'left'
                }}
              >
                Study Materials
              </a>

              <div style={{
                height: '1px',
                backgroundColor: '#E0E0E0',
                margin: '8px 0'
              }} />

              {token ? (
                <>
                  <a
                    href="/dashboard"
                    style={{
                      ...navLinkStyle(false),
                      display: 'block',
                      textAlign: 'left'
                    }}
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    style={{
                      ...navLinkStyle(false, true),
                      display: 'block',
                      width: '100%',
                      textAlign: 'center'
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    style={{
                      ...navLinkStyle(false),
                      display: 'block',
                      textAlign: 'left'
                    }}
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    style={{
                      ...joinButtonStyle(false),
                      display: 'block',
                      textAlign: 'center'
                    }}
                  >
                    Join Community
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile  */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;