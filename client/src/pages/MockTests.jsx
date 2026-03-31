import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

// ── Type metadata ─────────────────────────────────────────────────────────────
const typeConfig = {
  Prelims:         { color: "#800000", bg: "#FDE8E8", icon: "📝", label: "Prelims" },
  "Mains GS":      { color: "#2C3E50", bg: "#E8EEF8", icon: "📖", label: "Mains GS" },
  Optional:        { color: "#7B2D8B", bg: "#F3E8FB", icon: "🎯", label: "Optional" },
  "Current Affairs": { color: "#E67E22", bg: "#FEF3E2", icon: "📰", label: "Current Affairs" },
  Sectional:       { color: "#27AE60", bg: "#E8F8EF", icon: "🔬", label: "Sectional" },
  default:         { color: "#555",    bg: "#F0F0F0", icon: "📋", label: "Test" },
};

const getType = (type) => typeConfig[type] || typeConfig.default;

// ── Icons ────────────────────────────────────────────────────────────────────
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const BookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Test Card ─────────────────────────────────────────────────────────────────
const TestCard = ({ test, isAttempted, onAttempt, index }) => {
  const [hovered, setHovered] = useState(false);
  const cfg = getType(test.type);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isAttempted
          ? "linear-gradient(135deg, #F0FBF4 0%, #FAFFFE 100%)"
          : "#FFFFFF",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 16px 48px rgba(128,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
        border: isAttempted
          ? "1.5px solid #A8E6C0"
          : hovered
          ? "1.5px solid #80000025"
          : "1.5px solid #EBEBEB",
        animation: "fadeSlideUp 0.5s ease both",
        animationDelay: `${index * 0.07}s`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: "3px",
        background: isAttempted
          ? "linear-gradient(90deg, #27AE60, #2ECC71)"
          : `linear-gradient(90deg, ${cfg.color}, ${cfg.color}99)`,
      }} />

      <div style={{ padding: "22px 24px", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            {/* Type badge */}
            <div style={{ marginBottom: "8px" }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "11px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: cfg.bg,
                color: cfg.color,
              }}>
                {cfg.icon} {cfg.label}
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#2C3E50",
              margin: 0,
              lineHeight: 1.3,
            }}>
              {test.title}
            </h3>
          </div>

          {/* Attempted badge */}
          {isAttempted && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "#E8F8EF",
              border: "1.5px solid #A8E6C0",
              borderRadius: "20px",
              padding: "5px 12px",
              flexShrink: 0,
            }}>
              <CheckIcon />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, color: "#27AE60", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Done
              </span>
            </div>
          )}
        </div>

        {/* Syllabus */}
        {test.syllabus && (
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            background: "#F9F9F9",
            borderRadius: "9px",
            padding: "10px 13px",
          }}>
            <span style={{ color: "#AAA", marginTop: "1px", flexShrink: 0 }}><BookIcon /></span>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#666",
              margin: 0,
              lineHeight: 1.6,
            }}>
              {test.syllabus}
            </p>
          </div>
        )}

        {/* Meta pills */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {test.durationMinutes && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#777",
              background: "#F4F4F4", borderRadius: "8px", padding: "5px 10px",
            }}>
              <ClockIcon /> {test.durationMinutes} mins
            </span>
          )}
          {test.totalMarks && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#777",
              background: "#F4F4F4", borderRadius: "8px", padding: "5px 10px",
            }}>
              <StarIcon /> {test.totalMarks} marks
            </span>
          )}

          {/* Status pill */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600,
            background: isAttempted ? "#E8F8EF" : "#FFF8EE",
            color: isAttempted ? "#27AE60" : "#E67E22",
            borderRadius: "8px", padding: "5px 10px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isAttempted ? "#27AE60" : "#E67E22", flexShrink: 0, ...(isAttempted ? {} : { animation: "pulse 2s infinite" }) }} />
            {isAttempted ? "Attempted" : "Not Attempted"}
          </span>
        </div>
      </div>

      {/* Footer CTA */}
      {test.link && (
        <div style={{
          borderTop: "1px solid #F0F0F0",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          background: isAttempted ? "rgba(39,174,96,0.03)" : "transparent",
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#AAA" }}>
            {isAttempted ? "You've already attempted this test." : "Click to open the test in a new tab."}
          </span>
          <a
            href={test.link}
            target="_blank"
            rel="noreferrer"
            onClick={() => onAttempt(test._id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "10px 20px",
              borderRadius: "9px",
              background: isAttempted
                ? "linear-gradient(135deg, #27AE60, #1e9651)"
                : `linear-gradient(135deg, ${cfg.color}, ${cfg.color}CC)`,
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.03em",
              boxShadow: isAttempted
                ? "0 4px 14px rgba(39,174,96,0.3)"
                : `0 4px 14px ${cfg.color}44`,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {isAttempted ? (
              <>
                <CheckIcon />
                Retake Test
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Take Test
              </>
            )}
          </a>
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const MockTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [attempted, setAttempted] = useState([]);

  useEffect(() => {
    fetchTests();
    const stored = JSON.parse(localStorage.getItem("attempted_tests")) || [];
    setAttempted(stored);
  }, []);

  const fetchTests = async () => {
    try {
      const res = await axiosClient.get("/tests");
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTests(sorted);
    } catch {
      setError("Failed to load tests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const markAttempted = (id) => {
    if (!attempted.includes(id)) {
      const updated = [...attempted, id];
      setAttempted(updated);
      localStorage.setItem("attempted_tests", JSON.stringify(updated));
    }
  };

  const filterTypes = ["All", "Prelims", "Mains GS", "Optional", "Current Affairs", "Sectional"];
  const filteredTests = filter === "All" ? tests : tests.filter((t) => t.type === filter);

  const attemptedCount = tests.filter((t) => attempted.includes(t._id)).length;
  const progress = tests.length > 0 ? Math.round((attemptedCount / tests.length) * 100) : 0;

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
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.45; transform: scale(0.8); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: var(--progress); }
        }

        .mt-filter-pill {
          border: 1.5px solid #DDD;
          background: transparent;
          color: #666;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 15px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .mt-filter-pill:hover  { border-color: #800000; color: #800000; }
        .mt-filter-pill.active { background: #800000; border-color: #800000; color: #FFF; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F4F4F4", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Header ── */}
        <div style={{
          background: "linear-gradient(135deg, #800000 0%, #5a0000 100%)",
          padding: "52px 40px 44px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "8%", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(0,0,0,0.08)" }} />

          <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ display: "inline-block", width: "32px", height: "2px", background: "rgba(255,255,255,0.35)" }} />
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
              Mock Tests
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", margin: "0 0 24px", maxWidth: "520px", lineHeight: 1.6 }}>
              Practice with Prelims, Mains, and Sectional tests curated by the Pragati team.
            </p>

            {/* Progress bar */}
            {tests.length > 0 && (
              <div style={{ maxWidth: "360px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                    Your Progress
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
                    {attemptedCount} / {tests.length} tests
                  </span>
                </div>
                <div style={{ height: "7px", background: "rgba(255,255,255,0.15)", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #27AE60, #2ECC71)",
                    borderRadius: "10px",
                    transition: "width 1s ease",
                  }} />
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)", margin: "6px 0 0" }}>
                  {progress}% completed
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EBEBEB",
          padding: "14px 40px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}>
          <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#BBB", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "4px" }}>Filter</span>
            {filterTypes.map((type) => (
              <button
                key={type}
                className={`mt-filter-pill ${filter === type ? "active" : ""}`}
                onClick={() => setFilter(type)}
              >
                {type === "All" ? "All Types" : type}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#AAA" }}>
              {filteredTests.length} result{filteredTests.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px 64px" }}>

          {/* Loading skeletons */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{
                  height: "160px", borderRadius: "14px",
                  background: "linear-gradient(90deg, #eee 25%, #f9f9f9 50%, #eee 75%)",
                  backgroundSize: "1000px 100%",
                  animation: "shimmer 1.6s infinite",
                }} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              background: "#FFF0F0", border: "1.5px solid #FFCCCC",
              borderRadius: "12px", padding: "16px 20px",
            }}>
              <span style={{ fontSize: "20px" }}>⚠️</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#C0392B", margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredTests.length === 0 && (
            <div style={{
              textAlign: "center", padding: "60px 20px",
              background: "#FFFFFF", borderRadius: "16px",
              border: "2px dashed #DDD",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2C3E50", fontSize: "20px", margin: "0 0 8px" }}>
                No Tests Available
              </h3>
              <p style={{ color: "#999", fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>
                {filter === "All" ? "Tests will appear here once added." : `No "${filter}" tests found. Try a different filter.`}
              </p>
            </div>
          )}

          {/* Test cards */}
          {!loading && !error && filteredTests.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filteredTests.map((test, i) => (
                <TestCard
                  key={test._id}
                  test={test}
                  isAttempted={attempted.includes(test._id)}
                  onAttempt={markAttempted}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MockTests;