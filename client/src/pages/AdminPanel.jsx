import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

const AdminPanel = () => {
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    category: ""
  });

  const [testForm, setTestForm] = useState({
    title: "",
    type: "",
    syllabus: "",
    durationMinutes: "",
    totalMarks: "",
    link: ""
  });

  const [materialForm, setMaterialForm] = useState({
    title: "",
    type: "",
    subject: "",
    description: "",
    url: ""
  });

  const [message, setMessage] = useState("");

  const handleEventChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleTestChange = (e) => {
    setTestForm({ ...testForm, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleMaterialChange = (e) => {
    setMaterialForm({ ...materialForm, [e.target.name]: e.target.value });
    setMessage("");
  };

  const submitEvent = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/events", eventForm);
      setMessage("Event created successfully.");
      setEventForm({ title: "", description: "", date: "", category: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create event");
    }
  };

  const submitTest = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/tests", {
        ...testForm,
        durationMinutes: testForm.durationMinutes
          ? Number(testForm.durationMinutes)
          : undefined,
        totalMarks: testForm.totalMarks
          ? Number(testForm.totalMarks)
          : undefined
      });
      setMessage("Test created successfully.");
      setTestForm({
        title: "",
        type: "",
        syllabus: "",
        durationMinutes: "",
        totalMarks: "",
        link: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create test");
    }
  };

  const submitMaterial = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/materials", materialForm);
      setMessage("Study material added successfully.");
      setMaterialForm({
        title: "",
        type: "",
        subject: "",
        description: "",
        url: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add material");
    }
  };

  const adminName = localStorage.getItem("tp_name") || "Admin";

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Panel</h2>
      <p>Welcome, {adminName}</p>
      {message && <p style={{ marginTop: "0.5rem" }}>{message}</p>}

      {/* Events */}
      <section style={{ marginTop: "1.5rem" }}>
        <h3>Create Event</h3>
        <form onSubmit={submitEvent}>
          <input
            name="title"
            type="text"
            placeholder="Event title"
            value={eventForm.title}
            onChange={handleEventChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event description"
            value={eventForm.description}
            onChange={handleEventChange}
          />
          <input
            name="date"
            type="datetime-local"
            value={eventForm.date}
            onChange={handleEventChange}
          />
          <select
            name="category"
            value={eventForm.category}
            onChange={handleEventChange}
          >
            <option value="">Select category</option>
            <option value="Guest Lecture">Guest Lecture</option>
            <option value="GD/Debate">GD/Debate</option>
            <option value="Essay">Essay</option>
            <option value="Workshop">Workshop</option>
            <option value="Study Group">Study Group</option>
            <option value="Scholarship Test">Scholarship Test</option>
          </select>
          <button type="submit">Create Event</button>
        </form>
      </section>

      {/* Tests */}
      <section style={{ marginTop: "1.5rem" }}>
        <h3>Create Test</h3>
        <form onSubmit={submitTest}>
          <input
            name="title"
            type="text"
            placeholder="Test title"
            value={testForm.title}
            onChange={handleTestChange}
            required
          />
          <select
            name="type"
            value={testForm.type}
            onChange={handleTestChange}
            required
          >
            <option value="">Select type</option>
            <option value="Prelims">Prelims</option>
            <option value="Mains GS">Mains GS</option>
            <option value="Optional">Optional</option>
            <option value="Current Affairs">Current Affairs</option>
            <option value="Sectional">Sectional</option>
          </select>
          <textarea
            name="syllabus"
            placeholder="Syllabus / coverage"
            value={testForm.syllabus}
            onChange={handleTestChange}
          />
          <input
            name="durationMinutes"
            type="number"
            placeholder="Duration (minutes)"
            value={testForm.durationMinutes}
            onChange={handleTestChange}
          />
          <input
            name="totalMarks"
            type="number"
            placeholder="Total marks"
            value={testForm.totalMarks}
            onChange={handleTestChange}
          />
          <input
            name="link"
            type="url"
            placeholder="Google Form / PDF link"
            value={testForm.link}
            onChange={handleTestChange}
          />
          <button type="submit">Create Test</button>
        </form>
      </section>

      {/* Materials */}
      <section style={{ marginTop: "1.5rem" }}>
        <h3>Add Study Material</h3>
        <form onSubmit={submitMaterial}>
          <input
            name="title"
            type="text"
            placeholder="Material title"
            value={materialForm.title}
            onChange={handleMaterialChange}
            required
          />
          <select
            name="type"
            value={materialForm.type}
            onChange={handleMaterialChange}
            required
          >
            <option value="">Select type</option>
            <option value="Bluebook">Bluebook</option>
            <option value="NCERT">NCERT</option>
            <option value="Standard Book">Standard Book</option>
            <option value="Government Report">Government Report</option>
            <option value="Magazine">Magazine</option>
            <option value="Video">Video</option>
          </select>
          <input
            name="subject"
            type="text"
            placeholder="Subject (e.g. Polity, Economy)"
            value={materialForm.subject}
            onChange={handleMaterialChange}
          />
          <textarea
            name="description"
            placeholder="Short description"
            value={materialForm.description}
            onChange={handleMaterialChange}
          />
          <input
            name="url"
            type="url"
            placeholder="Drive / YouTube / PDF link"
            value={materialForm.url}
            onChange={handleMaterialChange}
          />
          <button type="submit">Add Material</button>
        </form>
      </section>
    </div>
  );
};

export default AdminPanel;
