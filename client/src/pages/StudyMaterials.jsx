import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import React from "react";
const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axiosClient.get("/materials").then(res => setMaterials(res.data));
  }, []);

  return (
    <section>
      <h2>Study Materials</h2>
      <ul>
        {materials.map(m => (
          <li key={m._id}>
            <strong>{m.title}</strong> ({m.type}) {m.subject && <>- {m.subject}</>}
            {m.url && (
              <>
                {" "}
                - <a href={m.url} target="_blank" rel="noreferrer">Open</a>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StudyMaterials;
