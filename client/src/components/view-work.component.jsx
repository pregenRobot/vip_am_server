import React, { useState, useEffect } from "react";
import WorkDataService from "../services/work.service";

function ViewWork() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    WorkDataService.dummy()
      .then((response) => {
        setMessage(JSON.stringify(response.data));
      })
      .catch((err) => {
        // setMessage(JSON.stringify(err.reponse));
        setMessage(
          "You are not authorized to view this content. Please Authenticate."
        );
      });
  });

  return (
    <div className="view-work">
      <div className="view-work-title">{message}</div>
    </div>
  );
}

export default ViewWork;
