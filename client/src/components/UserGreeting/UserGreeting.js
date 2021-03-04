import React from "react";
import { useDataLayerValue } from "../../context/DataLayer";
import "./UserGreeting.css";

function UserGreeting() {
  const [{ currentUser }] = useDataLayerValue();

  return (
    <div className="user-greeting">
      <a
        href={currentUser?.external_urls?.spotify}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            currentUser?.images[0]
              ? currentUser.images[0].url
              : "https://firebasestorage.googleapis.com/v0/b/last-30-top-30.appspot.com/o/userIcon.png?alt=media&token=26e20eae-64cc-4934-92d3-91888fb39fc7"
          }
          alt={currentUser?.display_name}
        />
      </a>
      <p>Hello, {currentUser?.display_name}!</p>
    </div>
  );
}

export default UserGreeting;
