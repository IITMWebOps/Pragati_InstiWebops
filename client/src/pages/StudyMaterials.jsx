import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import React from "react";

// ── Subject colour-coded pills ──────────────────────────────────────────────
const subjectColors = {
  History:     { bg: "#F5EBD8", text: "#8B5E2A", dot: "#C47B2A" },
  Polity:      { bg: "#E8EEF8", text: "#2C4A8A", dot: "#3B6CC9" },
  Geography:   { bg: "#E4F2E8", text: "#2A6E3A", dot: "#3A9A52" },
  Economy:     { bg: "#FDF3E0", text: "#7A5500", dot: "#E6A800" },
  Science:     { bg: "#EAE4F5", text: "#5B3F8A", dot: "#7E5FBD" },
  Environment: { bg: "#DFF6E8", text: "#1E6E46", dot: "#27AE60" },
  Ethics:      { bg: "#F0E8F0", text: "#6A3A6A", dot: "#9B59B6" },
  default:     { bg: "#F0F0F0", text: "#555",    dot: "#999" },
};

const typeIcons = {
  PDF:      "📄",
  Video:    "🎬",
  Notes:    "📝",
  NCERT:    "📚",
  Article:  "📰",
  Practice: "✏️",
  default:  "📎",
};

const typeColors = {
  PDF:      "#E67E22",
  Video:    "#E74C3C",
  Notes:    "#3498DB",
  NCERT:    "#800000",
  Article:  "#2C3E50",
  Practice: "#27AE60",
  default:  "#888",
};

// ── Sub-components ───────────────────────────────────────────────────────────
const SubjectTag = ({ subject }) => {
  const colors = subjectColors[subject] || subjectColors.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      letterSpacing: "0.05em",
      background: colors.bg,
      color: colors.text,
    }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: colors.dot }} />
      {subject}
    </span>
  );
};

const TypeBadge = ({ type }) => {
  const icon  = typeIcons[type]  || typeIcons.default;
  const color = typeColors[type] || typeColors.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "4px",
      padding: "2px 8px",
      borderRadius: "6px",
      fontSize: "11px",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700,
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      background: color + "18",
      color,
      border: `1px solid ${color}30`,
    }}>
      {icon} {type}
    </span>
  );
};

const MaterialCard = ({ material, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: hovered
          ? "0 16px 48px rgba(128,0,0,0.11), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        border: hovered ? "1.5px solid #80000030" : "1.5px solid #F0F0F0",
        cursor: "default",
        animation: "fadeSlideUp 0.5s ease both",
        animationDelay: `${index * 0.06}s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hover accent strip */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #800000, #C0392B)",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s ease",
        borderRadius: "14px 14px 0 0",
      }} />

      {/* Top row: badges */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        {material.type && <TypeBadge type={material.type} />}
        {material.subject && <SubjectTag subject={material.subject} />}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "17px",
        fontWeight: 700,
        color: "#2C3E50",
        margin: 0,
        lineHeight: 1.35,
      }}>
        {material.title}
      </h3>

      {/* Description if present */}
      {material.description && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          color: "#777",
          margin: 0,
          lineHeight: 1.6,
        }}>
          {material.description}
        </p>
      )}

      {/* Footer: open link */}
      {material.url && (
        <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: "12px", marginTop: "2px" }}>
          <a
            href={material.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#800000",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "8px",
              background: hovered ? "#80000010" : "transparent",
              border: "1.5px solid #80000030",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open Resource
          </a>
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const StudyMaterials = () => {
  const [materials, setMaterials]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeType, setActiveType]   = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [search, setSearch]           = useState("");
  const [focusMode, setFocusMode]     = useState(false);

  useEffect(() => {
    axiosClient
      .get("/materials")
      .then((res) => setMaterials(res.data))
      .finally(() => setLoading(false));
  }, []);

  const types    = ["All", ...new Set(materials.map((m) => m.type).filter(Boolean))];
  const subjects = ["All", ...new Set(materials.map((m) => m.subject).filter(Boolean))];

  const filtered = materials.filter((m) => {
    const matchType    = activeType    === "All" || m.type    === activeType;
    const matchSubject = activeSubject === "All" || m.subject === activeSubject;
    const matchSearch  = !search || m.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchType && matchSubject && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }

        .sm-filter-pill {
          border: 1.5px solid #DDD;
          background: transparent;
          color: #666;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .sm-filter-pill:hover   { border-color: #800000; color: #800000; }
        .sm-filter-pill.active  { background: #800000; border-color: #800000; color: white; }

        .sm-search {
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #E0E0E0;
          border-radius: 10px;
          padding: 10px 16px 10px 40px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #333;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .sm-search:focus {
          border-color: #800000;
          box-shadow: 0 0 0 3px rgba(128,0,0,0.08);
        }

        .focus-toggle {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 16px;
          border-radius: 20px;
          border: 1.5px solid #DDD;
          background: transparent;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #555;
          transition: all 0.2s ease;
        }
        .focus-toggle.on {
          background: #2C3E50;
          border-color: #2C3E50;
          color: white;
        }

        .sm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        @media (max-width: 640px) {
          .sm-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#F4F4F4",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.4s ease",
      }}>

        {/* ── Page Header ── */}
        {!focusMode && (
          <div style={{
            background: "linear-gradient(135deg, #2C3E50 0%, #1a252f 100%)",
            padding: "52px 40px 44px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: "-50px", right: "-30px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <div style={{ position: "absolute", bottom: "-80px", left: "10%",  width: "160px", height: "160px", borderRadius: "50%", background: "rgba(128,0,0,0.12)" }} />

            <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span style={{ display: "inline-block", width: "32px", height: "2px", background: "rgba(255,255,255,0.3)" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                  Team Pragati · IITM
                </span>
              </div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 10px",
                lineHeight: 1.2,
              }}>
                Study Materials
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", margin: 0, maxWidth: "520px", lineHeight: 1.6 }}>
                Curated resources, NCERTs, notes and articles to power your UPSC preparation.
              </p>
            </div>
          </div>
        )}

        {/* ── Toolbar ── */}
        <div style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EBEBEB",
          padding: focusMode ? "12px 24px" : "16px 40px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Search + Focus toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <svg style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "#AAA" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="sm-search"
                  type="text"
                  placeholder="Search materials…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className={`focus-toggle ${focusMode ? "on" : ""}`}
                onClick={() => setFocusMode(!focusMode)}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h4M3 15v4a2 2 0 0 0 2 2h4M21 9V5a2 2 0 0 0-2-2h-4M21 15v4a2 2 0 0 1-2 2h-4" />
                </svg>
                Focus Mode
              </button>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#AAA", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "4px" }}>Type</span>
                {types.map((t) => (
                  <button key={t} className={`sm-filter-pill ${activeType === t ? "active" : ""}`} onClick={() => setActiveType(t)}>{t}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#AAA", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "4px" }}>Subject</span>
                {subjects.map((s) => (
                  <button key={s} className={`sm-filter-pill ${activeSubject === s ? "active" : ""}`} onClick={() => setActiveSubject(s)}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px 64px" }}>

          {/* Result count */}
          {!loading && (
            <p style={{ fontSize: "13px", color: "#999", marginBottom: "20px" }}>
              {filtered.length === 0 ? "No materials found." : (
                <>Showing <strong style={{ color: "#2C3E50" }}>{filtered.length}</strong> resource{filtered.length !== 1 ? "s" : ""}</>
              )}
            </p>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="sm-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} style={{
                  height: "150px",
                  borderRadius: "14px",
                  background: "linear-gradient(90deg, #eee 25%, #f9f9f9 50%, #eee 75%)",
                  backgroundSize: "1000px 100%",
                  animation: "shimmer 1.6s infinite",
                }} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "2px dashed #DDD",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2C3E50", fontSize: "20px", margin: "0 0 8px" }}>
                Nothing here yet
              </h3>
              <p style={{ color: "#999", fontSize: "14px" }}>
                Try changing your filters or check back later.
              </p>
            </div>
          )}

          {/* Material Cards Grid */}
          {!loading && filtered.length > 0 && (
            <div className="sm-grid">
              {filtered.map((m, i) => (
                <MaterialCard key={m._id} material={m} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudyMaterials;