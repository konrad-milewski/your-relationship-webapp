import "./App.css";
import Landing from "./pages/landing";
import Main from "./pages/main";
import Summary from "./pages/summary";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Redirect,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import axios from "axios";
import checkTodayDate from "./utils/checkTodayDate";

function App() {
  const [isLogged, setisLogged] = useState(false);
  const [loggedUser, setloggedUser] = useState({});
  const [userMoods, setuserMoods] = useState([])
  let navigate = useNavigate();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("logged")));
    if (JSON.parse(localStorage.getItem("logged")) == null) {
      navigate("/login");
    } else {
      if (localStorage.getItem("user") != "undefined") {
        setloggedUser(JSON.parse(localStorage.getItem("user")));
      }
    }

    localStorage.getItem("logged") && axios
      .get(
        `http://localhost:3001/users/${
          JSON.parse(localStorage.getItem("user"))._id
        }`
      )
      .then((res) => {
        let isRowToday = res.data.moods_relation.some((x) => {
          return checkTodayDate(x.date);
        });
        setuserMoods(res.data.moods_relation)

        isRowToday && navigate("/summary");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login setloggedUser={setloggedUser} />}
        />
        <Route
          path="/register"
          element={<Register setloggedUser={setloggedUser} />}
        />

        <>
          <Route path="/" element={<Landing setuserMoods={setuserMoods}/>} />
          <Route path="main" element={<Main loggedUser={loggedUser} />} />
          <Route path="summary" element={<Summary userMoods={userMoods}/>} />
          <Route path="*" element={<Landing />} />
        </>
      </Routes>
    </div>
  );
}

export default App;
