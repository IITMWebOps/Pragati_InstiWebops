import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";


const Dashboard = () => {
  const [me, setMe] = useState(null);

  useEffect(() => {
    axiosClient.get("/auth/me").then(res => setMe(res.data));
  }, []);

  const progressPercent = me?.progress ?? 42;

  return (
    <div className="tp-dashboard">
      <div className="tp-container">

        {/* Hero */}
        <section
          className="tp-hero"
          aria-labelledby="dashboard-hero-title"
        >
          <h1 id="dashboard-hero-title">My Dashboard</h1>
          <p className="lead">
            A focused study workspace — progress tracking, test history,
            saved materials and a study plan.
          </p>

          <div className="cta-row">
            <a className="tp-btn tp-btn--primary" href="/dashboard">
              Open Dashboard
            </a>
            <a className="tp-btn tp-btn--outline" href="/study-materials">
              Study Materials
            </a>
          </div>
        </section>

        {/* Header */}
        <div
          className="dashboard-header"
          style={{ marginTop: 18 }}
        >
          <h2 className="dashboard-title">Welcome</h2>
          <div className="muted small">
            Future: test history, progress tracking, saved materials, study plan.
          </div>
        </div>

        {me && (
          <>
            {/* Greeting Card */}
            <div className="greeting-card">
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  background:
                    "linear-gradient(180deg, rgba(128,0,0,0.14), rgba(0,0,0,0.03))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--iitm-maroon)",
                }}
              >
                {me.name?.[0]?.toUpperCase()}
              </div>

              <div className="greeting-text">
                <h3>Welcome, {me.name}</h3>
                <p>Role: {me.role}</p>
              </div>

              <div style={{ textAlign: "right" }}>
                <div className="small muted">Last login</div>
                <div className="small">
                  {new Date(me.lastLogin ?? Date.now()).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Widgets */}
            <div className="widgets">

              {/* Progress */}
              <div
                className="widget widget--large"
                style={{ gridColumn: "span 8" }}
              >
                <div className="widget-title">Progress</div>
                <div className="widget-body">
                  <div className="progress-ring">
                    <div
                      className="progress-circle"
                      style={{ "--progress": `${progressPercent}%` }}
                    >
                      {progressPercent}%
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "var(--civil-blue)",
                        }}
                      >
                        {progressPercent}% syllabus completed
                      </div>
                      <div className="small muted">
                        Keep the streak going — focus on daily targets
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Streak */}
              <div
                className="widget widget--small"
                style={{ gridColumn: "span 4" }}
              >
                <div className="widget-title">Streak</div>
                <div className="widget-body">
                  <div className="streak">
                    <div className="count">{me.streak ?? 0} *</div>
                    <div className="small muted">Daily login streak</div>
                  </div>
                </div>
              </div>

              {/* Test History */}
              <div
                className="widget widget--large"
                style={{ gridColumn: "span 8" }}
              >
                <div className="widget-title">Test History</div>
                <div className="widget-body">
                  <div className="test-graph">
                    [Chart will render here]
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div
                className="widget widget--small"
                style={{ gridColumn: "span 4" }}
              >
                <div className="widget-title">Pinned Notes</div>
                <div className="widget-body">
                  <div className="small muted">
                    No pinned notes yet.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <section style={{ marginTop: 26 }}>
              <h3
                className="muted small"
                style={{ marginBottom: 12 }}
              >
                Quick Access
              </h3>

              <div className="quick-grid">
                {[
                  ["Latest Current Affairs", "Weekly compilations and quizzes.", "/current-affairs"],
                  ["Upcoming Mock Tests", "Prelims and Mains schedules.", "/mock-tests"],
                  ["Events", "Talks and workshops.", "/events"],
                  ["Study Materials", "Bluebooks, NCERTs and curated lists.", "/study-materials"],
                ].map(([title, desc, link]) => (
                  <a key={title} className="quick-card" href={link}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>
                      {title}
                    </div>
                    <div className="small muted">{desc}</div>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
