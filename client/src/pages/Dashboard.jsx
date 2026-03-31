import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

// ── Mini sparkline bar chart ──────────────────────────────────────────────────
const SparkBar = ({ values = [], color = "#800000" }) => {
  const max = Math.max(...values, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "56px" }}>
      {values.map((v, i) => (
        <div
          key={i}
          title={`Test ${i + 1}: ${v} marks`}
          style={{
            flex: 1,
            height: `${Math.max(8, (v / max) * 100)}%`,
            background:
              i === values.length - 1
                ? `linear-gradient(180deg, ${color}, ${color}99)`
                : `${color}33`,
            borderRadius: "4px 4px 0 0",
            transition: "height 0.6s ease",
          }}
        />
      ))}
    </div>
  );
};

// ── Radial progress ring (SVG) ────────────────────────────────────────────────
const ProgressRing = ({ percent = 0, size = 110, stroke = 10 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F0F0F0" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#800000" />
          <stop offset="100%" stopColor="#C0392B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// ── Widget card wrapper ───────────────────────────────────────────────────────
const Widget = ({ title, icon, children, style = {}, accent = "#800000" }) => (
  <div style={{
    background: "#FFFFFF",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    border: "1px solid #EBEBEB",
    display: "flex",
    flexDirection: "column",
    ...style,
  }}>
    <div style={{
      display: "flex", alignItems: "center", gap: "9px",
      padding: "16px 22px",
      borderBottom: "1px solid #F0F0F0",
      background: "#FAFAFA",
    }}>
      {icon && (
        <span style={{
          width: "28px", height: "28px", borderRadius: "7px",
          background: accent + "15",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", flexShrink: 0,
        }}>
          {icon}
        </span>
      )}
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "15px", fontWeight: 700, color: "#2C3E50",
      }}>
        {title}
      </span>
    </div>
    <div style={{ padding: "20px 22px", flex: 1 }}>{children}</div>
  </div>
);

// ── Quick access items & card ─────────────────────────────────────────────────
const quickItems = [
  { title: "Current Affairs",  desc: "Weekly compilations and quizzes.",    link: "/current-affairs",  icon: "📰", color: "#E67E22" },
  { title: "Mock Tests",       desc: "Prelims and Mains schedules.",         link: "/mock-tests",       icon: "✏️", color: "#800000" },
  { title: "Events",           desc: "Talks, workshops & guest lectures.",   link: "/events",           icon: "📅", color: "#2C3E50" },
  { title: "Study Materials",  desc: "Bluebooks, NCERTs and curated lists.", link: "/study-materials",  icon: "📚", color: "#27AE60" },
];

const QuickCard = ({ title, desc, link, icon, color }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", gap: "8px",
        background: "#FFFFFF", borderRadius: "14px", padding: "20px",
        textDecoration: "none",
        border: hovered ? `1.5px solid ${color}40` : "1.5px solid #EBEBEB",
        boxShadow: hovered ? `0 12px 32px ${color}18` : "0 2px 10px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.26s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div style={{
        width: "40px", height: "40px", borderRadius: "10px",
        background: color + "15",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "20px",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 700, color: "#2C3E50", lineHeight: 1.3 }}>
        {title}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#888", lineHeight: 1.5 }}>
        {desc}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: "4px", marginTop: "4px",
        fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color,
        opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease",
      }}>
        Explore
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </a>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [me, setMe] = useState(null);
  const [noteText, setNoteText] = useState(localStorage.getItem("tp_note") || "");
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axiosClient.get("/auth/me");
        console.log("USER:", res.data); // debug
        setMe(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMe();
  }, []);

  const saveNote = () => {
    localStorage.setItem("tp_note", noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const progressPercent = me?.progress ?? 42;
  const streak = me?.streak ?? 0;
  
  // ✅ FIX 5: Safe test history array mapping
  const testScores = Array.isArray(me?.testHistory)
    ? me.testHistory.map((t) => t.score)
    : [68, 74, 71, 80];
    
  const attempted = JSON.parse(localStorage.getItem("attempted_tests") || "[]").length;

  // ✅ FIX 4: Safe initials logic
  const initials = me?.name
    ? me.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer  { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes flamePop { 0%{transform:scale(1)} 50%{transform:scale(1.25) rotate(-6deg)} 100%{transform:scale(1)} }

        .tp-note-area {
          width: 100%; box-sizing: border-box;
          border: 1.5px solid #E0E0E0; border-radius: 10px;
          padding: 12px 14px; resize: vertical; min-height: 90px;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          color: #444; background: #FEFDF5; line-height: 1.6; outline: none;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .tp-note-area:focus { border-color: #800000; box-shadow: 0 0 0 3px rgba(128,0,0,.07); }

        .tp-save-btn {
          padding: 7px 16px; border-radius: 8px; border: none;
          background: linear-gradient(135deg, #800000, #5a0000);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 700; cursor: pointer;
          transition: all .2s ease;
        }
        .tp-save-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(128,0,0,.3); }

        @media (max-width: 768px) {
          .dash-widgets  { grid-template-columns: 1fr !important; }
          .dash-quick    { grid-template-columns: 1fr 1fr !important; }
          .dash-greeting { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .dash-quick { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F4F4F4", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Page Header ── */}
        <div style={{
          background: "linear-gradient(135deg, #800000 0%, #5a0000 100%)",
          padding: "48px 40px 42px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-60px", right: "-50px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", bottom: "-80px", left: "6%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(0,0,0,0.07)" }} />

          <div style={{ maxWidth: "1040px", margin: "0 auto", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ display: "inline-block", width: "32px", height: "2px", background: "rgba(255,255,255,0.35)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                Team Pragati · IITM
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800,
              color: "#FFFFFF", margin: "0 0 10px", lineHeight: 1.2,
            }}>
              My Dashboard
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", margin: "0 0 24px", maxWidth: "540px", lineHeight: 1.6 }}>
              A focused study workspace — progress tracking, test history, saved materials and your study plan.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="/dashboard" style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "11px 22px", borderRadius: "10px",
                background: "#FFFFFF", color: "#800000",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700,
                textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}>
                Open Dashboard
              </a>
              <a href="/study-materials" style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "11px 22px", borderRadius: "10px",
                background: "rgba(255,255,255,0.12)", color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.25)",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
                textDecoration: "none",
              }}>
                Study Materials
              </a>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "36px 24px 64px" }}>

          {/* Loading shimmer while me is null */}
          {!me && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[200, 340, 160].map((h, i) => (
                <div key={i} style={{
                  height: `${h}px`, borderRadius: "16px",
                  background: "linear-gradient(90deg, #eee 25%, #f9f9f9 50%, #eee 75%)",
                  backgroundSize: "1000px 100%", animation: "shimmer 1.6s infinite",
                }} />
              ))}
            </div>
          )}

          {/* ✅ FIX 2: Safely ensure 'me' exists before rendering children content */}
          {me && (
            <>
              {/* ── Greeting card ── */}
              <div
                className="dash-greeting"
                style={{
                  display: "flex", alignItems: "center", gap: "20px",
                  background: "#FFFFFF", borderRadius: "16px",
                  padding: "22px 28px", marginBottom: "24px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  border: "1px solid #EBEBEB",
                  animation: "fadeUp .5s ease both",
                  flexWrap: "wrap",
                }}
              >
                {/* Avatar with initials */}
                <div style={{
                  width: "58px", height: "58px", borderRadius: "14px",
                  background: "linear-gradient(135deg, #800000, #C0392B)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display', serif", fontWeight: 800,
                  fontSize: "22px", color: "#FFFFFF", flexShrink: 0,
                  boxShadow: "0 4px 16px rgba(128,0,0,0.3)",
                }}>
                  {initials}
                </div>

                {/* Name · Email · Role */}
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: "20px",
                    fontWeight: 700, color: "#2C3E50", margin: "0 0 6px",
                  }}>
                    {/* ✅ FIX 3: Safe .split() on the name */}
                    Welcome back, {me?.name ? me.name.split(" ")[0] : "User"}!
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center",
                      background: "#FDE8E8", color: "#800000",
                      fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.07em", textTransform: "uppercase",
                      padding: "3px 9px", borderRadius: "20px",
                    }}>
                      {me.role || "Member"}
                    </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#AAA" }}>
                      {me.email}
                    </span>
                  </div>
                </div>

                {/* Last login */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, color: "#BBB", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "3px" }}>
                    Last Login
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#555", fontWeight: 500 }}>
                    {new Date(me.lastLogin ?? Date.now()).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </div>
              </div>

              {/* ── Widget grid ── */}
              <div
                className="dash-widgets"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "18px", marginBottom: "24px" }}
              >
                {/* Progress — spans 2 cols */}
                <div style={{ gridColumn: "span 2", animation: "fadeUp .5s ease both", animationDelay: "0.05s" }}>
                  <Widget title="Syllabus Progress" icon="📈" accent="#800000">
                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <ProgressRing percent={progressPercent} size={110} stroke={10} />
                        <div style={{
                          position: "absolute", inset: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 800, color: "#800000",
                        }}>
                          {progressPercent}%
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, color: "#2C3E50", marginBottom: "6px" }}>
                          {progressPercent}% of syllabus completed
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "12px" }}>
                          Keep the streak going — focus on daily targets to stay on track.
                        </div>
                        <div style={{ height: "6px", background: "#F0F0F0", borderRadius: "10px", overflow: "hidden", maxWidth: "240px" }}>
                          <div style={{
                            height: "100%", width: `${progressPercent}%`,
                            background: "linear-gradient(90deg, #800000, #C0392B)",
                            borderRadius: "10px", transition: "width 1.2s ease",
                          }} />
                        </div>
                      </div>
                    </div>
                  </Widget>
                </div>

                {/* Streak */}
                <div style={{ animation: "fadeUp .5s ease both", animationDelay: "0.1s" }}>
                  <Widget title="Daily Streak" icon="🔥" accent="#E67E22">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "6px", paddingTop: "6px" }}>
                      <div style={{ fontSize: "52px", lineHeight: 1, animation: streak > 0 ? "flamePop 2s infinite" : "none", display: "inline-block" }}>
                        🔥
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 800, color: "#E67E22", lineHeight: 1 }}>
                        {streak}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#888", textAlign: "center" }}>
                        day{streak !== 1 ? "s" : ""} in a row
                      </div>
                      {streak === 0 && (
                        <span style={{ marginTop: "6px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#E67E22", fontWeight: 600, background: "#FEF3E2", padding: "3px 10px", borderRadius: "20px" }}>
                          Start your streak today!
                        </span>
                      )}
                    </div>
                  </Widget>
                </div>

                {/* Test History — spans 2 cols */}
                <div style={{ gridColumn: "span 2", animation: "fadeUp .5s ease both", animationDelay: "0.15s" }}>
                  <Widget title="Test History" icon="📊" accent="#2C3E50">
                    {testScores.length > 0 ? (
                      <div>
                        <SparkBar values={testScores} color="#800000" />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                          {testScores.map((_, i) => (
                            <span key={i} style={{ flex: 1, textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#CCC" }}>
                              T{i + 1}
                            </span>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "14px" }}>
                          {[
                            { label: "Latest",    val: testScores[testScores.length - 1] + " pts" },
                            { label: "Best",      val: Math.max(...testScores) + " pts" },
                            { label: "Attempted", val: attempted + " tests" },
                          ].map(({ label, val }) => (
                            <div key={label} style={{ textAlign: "center" }}>
                              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#2C3E50" }}>{val}</div>
                              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#AAA" }}>{label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#AAA" }}>
                        No test history yet.{" "}
                        <a href="/mock-tests" style={{ color: "#800000", fontWeight: 600 }}>Take a mock test →</a>
                      </p>
                    )}
                  </Widget>
                </div>

                {/* Quick Note */}
                <div style={{ animation: "fadeUp .5s ease both", animationDelay: "0.2s" }}>
                  <Widget title="Quick Note" icon="📌" accent="#E67E22" style={{ background: "#FEFDF5" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <textarea
                        className="tp-note-area"
                        placeholder="Jot a quick reminder…"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                      />
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: noteSaved ? "#27AE60" : "transparent", transition: "color .3s ease", fontWeight: 600 }}>
                          ✓ Saved
                        </span>
                        <button className="tp-save-btn" onClick={saveNote}>Save Note</button>
                      </div>
                    </div>
                  </Widget>
                </div>
              </div>

              {/* ── Quick Access ── */}
              <div style={{ animation: "fadeUp .5s ease both", animationDelay: "0.25s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ display: "inline-block", width: "24px", height: "2px", background: "#DDD" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#AAA", textTransform: "uppercase" }}>
                    Quick Access
                  </span>
                </div>
                <div className="dash-quick" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
                  {quickItems.map((item) => (
                    <QuickCard key={item.title} {...item} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;