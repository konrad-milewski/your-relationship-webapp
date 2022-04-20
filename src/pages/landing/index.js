import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { animations } from "react-animation";
import axios from "axios";
import checkTodayDate from "../../utils/checkTodayDate";
export default function Landing({setuserMoods}) {
  const style = {
    animation: animations.bounceIn,
  };

  const [isLogged, setisLogged] = useState(false);

  let navigate = useNavigate();
useEffect(() => {
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

  useEffect(() => {
    let timeout = setTimeout(() => {
      navigate("/main");
    }, 2300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Link to="main" className="landing-component bounce2 pointer">
      <svg
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42 0C30.8609 0 20.178 4.42499 12.3015 12.3015C4.42499 20.178 0 30.8609 0 42C0 53.1391 4.42499 63.822 12.3015 71.6985C20.178 79.575 30.8609 84 42 84C53.1391 84 63.822 79.575 71.6985 71.6985C79.575 63.822 84 53.1391 84 42C84 30.8609 79.575 20.178 71.6985 12.3015C63.822 4.42499 53.1391 0 42 0V0ZM24.969 23.9715C28.9748 16.4955 46.074 23.3415 29.967 42C6.363 33.621 17.6295 19.4355 24.969 23.9715ZM59.4037 52.5735C59.9021 52.4562 60.4239 52.4871 60.9049 52.6626C61.3859 52.838 61.8051 53.1503 62.1108 53.561C62.4166 53.9716 62.5956 54.4627 62.6258 54.9738C62.656 55.4849 62.536 55.9937 62.2808 56.4375C60.2076 60.0304 57.2247 63.0137 53.6322 65.0874C50.0397 67.1611 45.9643 68.2519 41.8162 68.25C37.6682 68.2519 33.5928 67.1611 30.0003 65.0874C26.4078 63.0137 23.4249 60.0304 21.3517 56.4375C21.0965 55.9937 20.9765 55.4849 21.0067 54.9738C21.0369 54.4627 21.2159 53.9716 21.5217 53.561C21.8274 53.1503 22.2466 52.838 22.7276 52.6626C23.2086 52.4871 23.7304 52.4562 24.2287 52.5735H24.255L24.3442 52.5998L24.696 52.6785L26.019 52.9672C27.1477 53.2087 28.7228 53.5343 30.5183 53.8545C34.1565 54.5055 38.5088 55.125 41.8162 55.125C45.1238 55.125 49.4812 54.5055 53.1142 53.8545C55.0631 53.5039 57.0043 53.1118 58.9365 52.6785L59.2882 52.5998L59.3775 52.5788L59.4037 52.5682V52.5735ZM59.0363 23.9715C66.3705 19.4355 77.637 33.621 54.033 42C37.9312 23.3415 55.0305 16.4955 59.031 23.9715H59.0363Z"
          fill="#FFFFFC"
        />
      </svg>

      <h1>Twój Związek</h1>
    </Link>
  );
}
