import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import React from "react";
const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosClient.get("/events").then(res => setEvents(res.data));
  }, []);

  return (
    <section>
      <h2>Upcoming Events</h2>
      {events.length === 0 && <p>No events yet.</p>}
      <ul>
        {events.map(e => (
          <li key={e._id}>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            {e.date && <p>{new Date(e.date).toLocaleString()}</p>}
            {e.category && <p>Category: {e.category}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Events;
