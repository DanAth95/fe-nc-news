import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("https://nc-news-z5fx.onrender.com/api/users")
      .then((response) => {
        setUserList(response.data.users);
      });
  }, []);

  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  }, [user]);

  function handleSubmit(e) {
    setError(false);
    e.preventDefault();
    setUser(
      userList.filter((u) => {
        return u.username === username;
      })[0] ?? {}
    );
    setUsername("");
    if (!user.username) {
      setError(true);
    }
  }

  function handleChange(e) {
    setError(false);
    setUsername(e.target.value);
  }

  return (
    <>
      <form className="login">
        <h3>Log In</h3>
        <label htmlFor="login">Username</label>
        <input
          value={username}
          className="login-input"
          type="text"
          id="login"
          onChange={handleChange}
        />
        <input type="submit" onClick={handleSubmit} />
      </form>
      {error ? <p className="login-error">Username not Found</p> : null}
    </>
  );
}
