import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const keys = (function(){
  const id =  "bef688fe-a7a0-48b8-a239-e03e2b2643d5";
  const key = "ac9918d2-7f6c-4978-a769-eedf046ed88e";

  return {
    react_key: key,
    react_id:id
  }
  
})();
const Chats = () => {

  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
  }

  useEffect(() => {

    if (!user) {
      history.push('/');

      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "projectd-id": keys.react_id,
        "user-name": user.email,
        "user-secret": user.uid
      }
    })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);
        
        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios.post('https://api.chatengine.io/users',
              formdata,
              { headers: { "private-key": keys.react_key } }
            ).then(() => setLoading(false))
              .catch((error) => console.log(error))
          })
      })

    if (!user || loading) return 'loading ...';

  }, [user, history]);


  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          Unichat
        </div>
        <div onClick={handleLogout} className="logout-tab" >
          Logout
        </div>
      </div>

      <ChatEngine
          height="calc(100vh - 66px)"
          projectID= {keys.react_id}
          userName={user.email}
          userSecret={user.uid}
         
        />
    </div>
  );
};

export default Chats;
