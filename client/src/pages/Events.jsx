import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import React from "react";

const categoryColors = {
  Workshop: { bg: "#FFF3E0", text: "#E67E22", border: "#E67E22" },
  Seminar: { bg: "#E8F4FD", text: "#2C3E50", border: "#2C3E50" },
  "Mock Test": { bg: "#FDE8E8", text: "#800000", border: "#800000" },
  Lecture: { bg: "#E8F8EF", text: "#27AE60", border: "#27AE60" },
  default: { bg: "#F0F0F0", text: "#555555", border: "#999999" },
};

const CategoryBadge = ({ category }) => {
  const colors = categoryColors[category] || categoryColors.default;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {category}
    </span>
  );
};

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const EventCard = ({ event, index }) => {
  const [hovered, setHovered] = useState(false);
  const dateObj = event.date ? new Date(event.date) : null;
  const day = dateObj ? dateObj.getDate() : null;
  const month = dateObj ? dateObj.toLocaleString("default", { month: "short" }).toUpperCase() : null;
  const time = dateObj
    ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;

  const isUpcoming = dateObj && dateObj > new Date();
  const urgency = dateObj && isUpcoming && (dateObj - new Date()) < 3 * 24 * 60 * 60 * 1000;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: "0",
        background: "#FFFFFF",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 12px 40px rgba(128,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
        borderLeft: hovered ? "4px solid #800000" : "4px solid transparent",
        animationDelay: `${index * 0.07}s`,
        animation: "fadeSlideUp 0.5s ease both",
      }}
    >
      {/* Date Column */}
      {dateObj && (
        <div
          style={{
            minWidth: "72px",
            background: hovered ? "#800000" : "#F4F4F4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 12px",
            transition: "background 0.25s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: 1,
              color: hovered ? "#FFFFFF" : "#800000",
              transition: "color 0.25s ease",
            }}
          >
            {day}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: hovered ? "rgba(255,255,255,0.75)" : "#888",
              marginTop: "2px",
              transition: "color 0.25s ease",
            }}
          >
            {month}
          </span>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            {urgency && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E67E22", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#E67E22", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Closing Soon
                </span>
              </div>
            )}
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#2C3E50",
                margin: "0 0 8px 0",
                lineHeight: 1.3,
              }}
            >
              {event.title}
            </h3>
            {event.description && (
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: 1.6,
                  margin: "0 0 12px 0",
                }}
              >
                {event.description}
              </p>
            )}
          </div>
          {event.category && <CategoryBadge category={event.category} />}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          {time && (
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#888" }}>
              <ClockIcon /> {time}
            </span>
          )}
          {dateObj && (
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#888" }}>
              <CalendarIcon />
              {dateObj.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axiosClient
      .get("/events")
      .then((res) => setEvents(res.data))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(events.map((e) => e.category).filter(Boolean))];
  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }

        .filter-pill {
          border: 1.5px solid #DDD;
          background: transparent;
          color: #555;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-pill:hover {
          border-color: #800000;
          color: #800000;
        }
        .filter-pill.active {
          background: #800000;
          border-color: #800000;
          color: white;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#F4F4F4",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Page Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #800000 0%, #5a0000 100%)",
            padding: "52px 40px 44px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", bottom: "-60px", right: "120px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

          <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ display: "inline-block", width: "32px", height: "2px", background: "rgba(255,255,255,0.4)" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
                Team Pragati · IITM
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 10px",
                lineHeight: 1.2,
              }}
            >
              Upcoming Events
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", margin: 0, maxWidth: "520px", lineHeight: 1.6 }}>
              Stay updated with workshops, seminars, and mock tests curated for your UPSC journey.
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "36px 24px 60px" }}>

          {/* Filter Pills */}
          {categories.length > 1 && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${filter === cat ? "active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Count */}
          {!loading && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#999", marginBottom: "20px" }}>
              Showing <strong style={{ color: "#2C3E50" }}>{filtered.length}</strong> event{filtered.length !== 1 ? "s" : ""}
            </p>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    height: "100px",
                    borderRadius: "12px",
                    background: "linear-gradient(90deg, #eee 25%, #f9f9f9 50%, #eee 75%)",
                    backgroundSize: "1000px 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "2px dashed #DDD",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📅</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2C3E50", fontSize: "20px", margin: "0 0 8px" }}>
                No Events Yet
              </h3>
              <p style={{ color: "#999", fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>
                Check back soon — events will appear here.
              </p>
            </div>
          )}

          {/* Events list */}
          {!loading && filtered.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {filtered.map((event, i) => (
                <EventCard key={event._id} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Events;