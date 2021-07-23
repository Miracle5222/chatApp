import React from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();

  console.log(user);

  const handlelogout = async () => {
    await  auth.signOut();

    history.push("/");
  };

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
            Unichat
            </div>
        <div onClick={handlelogout} className="logout-tab">
          Logout
        </div>

        <ChatEngine
          height="calc(100vh - 66px)"
          projectId="bef688fe-a7a0-48b8-a239-e03e2b2643d5"
          userName="."
          userSecret="."
        />
      </div>
    </div>
  );
};

export default Chats;
