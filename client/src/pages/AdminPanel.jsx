import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

// ── Shared primitives ────────────────────────────────────────────────────────

const Label = ({ children }) => (
  <label style={{
    display: "block",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    color: "#666",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: "6px",
  }}>
    {children}
  </label>
);

const inputBase = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 14px",
  border: "1.5px solid #E0E0E0",
  borderRadius: "9px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  color: "#333",
  background: "#FAFAFA",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
};

const StyledInput = ({ style = {}, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputBase,
        ...(focused ? { borderColor: "#800000", background: "#FFF", boxShadow: "0 0 0 3px rgba(128,0,0,0.07)" } : {}),
        ...style,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const StyledTextarea = ({ style = {}, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      style={{
        ...inputBase,
        resize: "vertical",
        minHeight: "88px",
        lineHeight: 1.6,
        ...(focused ? { borderColor: "#800000", background: "#FFF", boxShadow: "0 0 0 3px rgba(128,0,0,0.07)" } : {}),
        ...style,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const StyledSelect = ({ style = {}, children, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        {...props}
        style={{
          ...inputBase,
          appearance: "none",
          paddingRight: "36px",
          cursor: "pointer",
          ...(focused ? { borderColor: "#800000", background: "#FFF", boxShadow: "0 0 0 3px rgba(128,0,0,0.07)" } : {}),
          ...style,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </select>
      <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#AAA" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  );
};

const SubmitButton = ({ loading, label, loadingLabel, color = "#800000" }) => (
  <button
    type="submit"
    disabled={loading}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "11px 22px",
      border: "none",
      borderRadius: "9px",
      background: loading ? "#CCC" : `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
      color: "#FFFFFF",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: "0.04em",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "all 0.2s ease",
      boxShadow: loading ? "none" : `0 4px 14px ${color}44`,
    }}
    onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
  >
    {loading ? (
      <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
    ) : (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    )}
    {loading ? loadingLabel : label}
  </button>
);

// ── Section card ─────────────────────────────────────────────────────────────
const SectionCard = ({ icon, title, accent = "#800000", children }) => (
  <div style={{
    background: "#FFFFFF",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    border: "1px solid #EBEBEB",
  }}>
    {/* Card header */}
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "20px 28px",
      borderBottom: "1px solid #F0F0F0",
      background: "#FAFAFA",
    }}>
      <div style={{
        width: "36px", height: "36px",
        borderRadius: "9px",
        background: accent + "15",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "18px",
        fontWeight: 700,
        color: "#2C3E50",
        margin: 0,
      }}>
        {title}
      </h2>
    </div>

    {/* Card body */}
    <div style={{ padding: "24px 28px" }}>
      {children}
    </div>
  </div>
);

// ── Toast notification ────────────────────────────────────────────────────────
const Toast = ({ message, type }) => {
  if (!message) return null;
  const isSuccess = type === "success";
  return (
    <div style={{
      position: "fixed",
      bottom: "28px",
      right: "28px",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: isSuccess ? "#F0FBF4" : "#FFF0F0",
      border: `1.5px solid ${isSuccess ? "#A8E6C0" : "#FFCCCC"}`,
      borderRadius: "12px",
      padding: "14px 18px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "13px",
      color: isSuccess ? "#27AE60" : "#C0392B",
      fontWeight: 500,
      maxWidth: "340px",
      animation: "slideInRight 0.3s ease",
    }}>
      <span style={{ fontSize: "16px" }}>{isSuccess ? "✅" : "⚠️"}</span>
      {message}
    </div>
  );
};

// ── Grid helpers ─────────────────────────────────────────────────────────────
const FormGrid = ({ children, cols = 2 }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: "16px",
  }}>
    {children}
  </div>
);

const FormField = ({ label, children, span = 1 }) => (
  <div style={{ gridColumn: `span ${span}` }}>
    <Label>{label}</Label>
    {children}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const AdminPanel = () => {
  const [eventForm, setEventForm] = useState({ title: "", description: "", date: "", category: "" });
  const [testForm, setTestForm] = useState({ title: "", type: "", syllabus: "", durationMinutes: "", totalMarks: "", link: "" });
  const [materialForm, setMaterialForm] = useState({ title: "", type: "", subject: "", description: "", url: "" });

  const [toast, setToast] = useState({ message: "", type: "" });
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [loadingTest, setLoadingTest] = useState(false);
  const [loadingMaterial, setLoadingMaterial] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3500);
  };

  const handleChange = (setter, state) => (e) =>
    setter({ ...state, [e.target.name]: e.target.value });

  const submitEvent = async (e) => {
    e.preventDefault();
    setLoadingEvent(true);
    try {
      await axiosClient.post("/events", eventForm);
      showToast("Event created successfully.", "success");
      setEventForm({ title: "", description: "", date: "", category: "" });
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to create event.", "error");
    } finally { setLoadingEvent(false); }
  };

  const submitTest = async (e) => {
    e.preventDefault();
    setLoadingTest(true);
    try {
      await axiosClient.post("/tests", {
        ...testForm,
        durationMinutes: testForm.durationMinutes ? Number(testForm.durationMinutes) : undefined,
        totalMarks: testForm.totalMarks ? Number(testForm.totalMarks) : undefined,
      });
      showToast("Test created successfully.", "success");
      setTestForm({ title: "", type: "", syllabus: "", durationMinutes: "", totalMarks: "", link: "" });
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to create test.", "error");
    } finally { setLoadingTest(false); }
  };

  const submitMaterial = async (e) => {
    e.preventDefault();
    setLoadingMaterial(true);
    try {
      await axiosClient.post("/materials", materialForm);
      showToast("Study material added successfully.", "success");
      setMaterialForm({ title: "", type: "", subject: "", description: "", url: "" });
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to add material.", "error");
    } finally { setLoadingMaterial(false); }
  };

  const adminName = localStorage.getItem("tp_name") || "Admin";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        * { box-sizing: border-box; }
        textarea { font-family: 'DM Sans', sans-serif; }
        select option { font-family: 'DM Sans', sans-serif; }

        @media (max-width: 640px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .admin-header-meta { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F4F4F4", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Page header ── */}
        <div style={{
          background: "linear-gradient(135deg, #800000 0%, #5a0000 100%)",
          padding: "40px 40px 36px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-50px", right: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", bottom: "-80px", left: "5%", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(0,0,0,0.08)" }} />

          <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span style={{ display: "inline-block", width: "28px", height: "2px", background: "rgba(255,255,255,0.35)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                Team Pragati · IITM
              </span>
            </div>

            <div className="admin-header-meta" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, color: "#FFFFFF", margin: "0 0 6px", lineHeight: 1.2 }}>
                  Admin Panel
                </h1>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", margin: 0 }}>
                  Manage events, tests, and study materials for the community.
                </p>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "10px 16px",
              }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                  👤
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>{adminName}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "36px 24px 64px", display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* ── Create Event ── */}
          <div style={{ animation: "fadeUp 0.45s ease both", animationDelay: "0.05s" }}>
            <SectionCard icon="📅" title="Create Event" accent="#800000">
              <form onSubmit={submitEvent} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <FormGrid cols={2}>
                  <FormField label="Event Title" span={2}>
                    <StyledInput name="title" type="text" placeholder="e.g. UPSC Mock Interview Session" value={eventForm.title} onChange={handleChange(setEventForm, eventForm)} required />
                  </FormField>
                  <FormField label="Date & Time">
                    <StyledInput name="date" type="datetime-local" value={eventForm.date} onChange={handleChange(setEventForm, eventForm)} />
                  </FormField>
                  <FormField label="Category">
                    <StyledSelect name="category" value={eventForm.category} onChange={handleChange(setEventForm, eventForm)}>
                      <option value="">Select category</option>
                      {["Guest Lecture", "GD/Debate", "Essay", "Workshop", "Study Group", "Scholarship Test"].map(c => <option key={c} value={c}>{c}</option>)}
                    </StyledSelect>
                  </FormField>
                  <FormField label="Description" span={2}>
                    <StyledTextarea name="description" placeholder="Brief description of the event…" value={eventForm.description} onChange={handleChange(setEventForm, eventForm)} />
                  </FormField>
                </FormGrid>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <SubmitButton loading={loadingEvent} label="Create Event" loadingLabel="Creating…" color="#800000" />
                </div>
              </form>
            </SectionCard>
          </div>

          {/* ── Create Test ── */}
          <div style={{ animation: "fadeUp 0.45s ease both", animationDelay: "0.12s" }}>
            <SectionCard icon="✏️" title="Create Mock Test" accent="#2C3E50">
              <form onSubmit={submitTest} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <FormGrid cols={2}>
                  <FormField label="Test Title" span={2}>
                    <StyledInput name="title" type="text" placeholder="e.g. GS Paper I — Modern History" value={testForm.title} onChange={handleChange(setTestForm, testForm)} required />
                  </FormField>
                  <FormField label="Test Type">
                    <StyledSelect name="type" value={testForm.type} onChange={handleChange(setTestForm, testForm)} required>
                      <option value="">Select type</option>
                      {["Prelims", "Mains GS", "Optional", "Current Affairs", "Sectional"].map(t => <option key={t} value={t}>{t}</option>)}
                    </StyledSelect>
                  </FormField>
                  <FormField label="Google Form / PDF Link">
                    <StyledInput name="link" type="url" placeholder="https://forms.gle/…" value={testForm.link} onChange={handleChange(setTestForm, testForm)} />
                  </FormField>
                  <FormField label="Duration (minutes)">
                    <StyledInput name="durationMinutes" type="number" placeholder="e.g. 120" min="1" value={testForm.durationMinutes} onChange={handleChange(setTestForm, testForm)} />
                  </FormField>
                  <FormField label="Total Marks">
                    <StyledInput name="totalMarks" type="number" placeholder="e.g. 200" min="1" value={testForm.totalMarks} onChange={handleChange(setTestForm, testForm)} />
                  </FormField>
                  <FormField label="Syllabus / Coverage" span={2}>
                    <StyledTextarea name="syllabus" placeholder="Topics covered in this test…" value={testForm.syllabus} onChange={handleChange(setTestForm, testForm)} />
                  </FormField>
                </FormGrid>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <SubmitButton loading={loadingTest} label="Create Test" loadingLabel="Creating…" color="#2C3E50" />
                </div>
              </form>
            </SectionCard>
          </div>

          {/* ── Add Material ── */}
          <div style={{ animation: "fadeUp 0.45s ease both", animationDelay: "0.19s" }}>
            <SectionCard icon="📚" title="Add Study Material" accent="#27AE60">
              <form onSubmit={submitMaterial} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <FormGrid cols={2}>
                  <FormField label="Material Title" span={2}>
                    <StyledInput name="title" type="text" placeholder="e.g. NCERT History Class 12" value={materialForm.title} onChange={handleChange(setMaterialForm, materialForm)} required />
                  </FormField>
                  <FormField label="Type">
                    <StyledSelect name="type" value={materialForm.type} onChange={handleChange(setMaterialForm, materialForm)} required>
                      <option value="">Select type</option>
                      {["Bluebook", "NCERT", "Standard Book", "Government Report", "Magazine", "Video"].map(t => <option key={t} value={t}>{t}</option>)}
                    </StyledSelect>
                  </FormField>
                  <FormField label="Subject">
                    <StyledInput name="subject" type="text" placeholder="e.g. Polity, Economy, History" value={materialForm.subject} onChange={handleChange(setMaterialForm, materialForm)} />
                  </FormField>
                  <FormField label="Drive / YouTube / PDF URL" span={2}>
                    <StyledInput name="url" type="url" placeholder="https://drive.google.com/…" value={materialForm.url} onChange={handleChange(setMaterialForm, materialForm)} />
                  </FormField>
                  <FormField label="Short Description" span={2}>
                    <StyledTextarea name="description" placeholder="What does this material cover?" value={materialForm.description} onChange={handleChange(setMaterialForm, materialForm)} />
                  </FormField>
                </FormGrid>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <SubmitButton loading={loadingMaterial} label="Add Material" loadingLabel="Adding…" color="#27AE60" />
                </div>
              </form>
            </SectionCard>
          </div>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} />
    </>
  );
};

export default AdminPanel;