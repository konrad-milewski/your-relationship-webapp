import axios from "axios";
import React, { useEffect, useState } from "react";
import { animations } from "react-animation";
import { useNavigate } from "react-router-dom";
import checkTodayDate from "../../utils/checkTodayDate";

export default function Summary() {
  const style = {
    animation: animations.fadeIn,
    animation: animations.bounceIn,
  };
const [userMoodsFlattenArr, setuserMoodsFlattenArr] = useState([])
const [perc, setperc] = useState({})

const [userMoods, setuserMoods] = useState([])
let navigate = useNavigate()
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
 
  let arr = []
  userMoods.forEach(x => {
    arr.push(x.name)
  })
  const percentages = (xs) =>
  xs .reduce ((pcts, x) => ({...pcts, [x]: (pcts [x] || 0) + 100 / (xs .length)}), {})


  setperc(percentages(arr))
}, [userMoods])


 

  return (
    <>
      <h1 className="title-main">W przeciągu {userMoods.length} {userMoods.length === 1 ? 'dnia' : 'dni'} miałeś </h1>
      <div className="container-main">
        <div className="pink">
          <svg
            className="icon-summary"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 0C18.3696 0 12.0107 2.63392 7.32233 7.32233C2.63392 12.0107 0 18.3696 0 25C0 31.6304 2.63392 37.9893 7.32233 42.6777C12.0107 47.3661 18.3696 50 25 50C31.6304 50 37.9893 47.3661 42.6777 42.6777C47.3661 37.9893 50 31.6304 50 25C50 18.3696 47.3661 12.0107 42.6777 7.32233C37.9893 2.63392 31.6304 0 25 0V0ZM14.8625 14.2688C17.2469 9.81875 27.425 13.8938 17.8375 25C3.7875 20.0125 10.4938 11.5687 14.8625 14.2688ZM35.3594 31.2938C35.656 31.2239 35.9666 31.2423 36.2529 31.3468C36.5392 31.4512 36.7887 31.6371 36.9707 31.8815C37.1527 32.126 37.2593 32.4183 37.2772 32.7225C37.2952 33.0267 37.2238 33.3296 37.0719 33.5938C35.8379 35.7324 34.0623 37.5082 31.9239 38.7425C29.7855 39.9768 27.3597 40.6261 24.8906 40.625C22.4215 40.6261 19.9957 39.9768 17.8573 38.7425C15.7189 37.5082 13.9434 35.7324 12.7094 33.5938C12.5574 33.3296 12.486 33.0267 12.504 32.7225C12.522 32.4183 12.6285 32.126 12.8105 31.8815C12.9925 31.6371 13.242 31.4512 13.5283 31.3468C13.8146 31.2423 14.1252 31.2239 14.4219 31.2938H14.4375L14.4906 31.3094L14.7 31.3563L15.4875 31.5281C16.1594 31.6719 17.0969 31.8656 18.1656 32.0563C20.3313 32.4438 22.9219 32.8125 24.8906 32.8125C26.8594 32.8125 29.4531 32.4438 31.6156 32.0563C32.7757 31.8475 33.9311 31.6141 35.0812 31.3563L35.2906 31.3094L35.3438 31.2969L35.3594 31.2906V31.2938ZM35.1406 14.2688C39.5062 11.5687 46.2125 20.0125 32.1625 25C22.5781 13.8938 32.7563 9.81875 35.1375 14.2688H35.1406Z"
              fill="#FFFFFC"
            />
          </svg>
          <h1 className="icon-summary sum" style={style}>
           {perc.good ? perc.good : 0}%
          </h1>
          <h4 className="icon-summary sum-count" style={style}>
            ({userMoods.filter(x => x.name === 'good').length})
          </h4>
          <h3 className="icon-summary label">dobrych</h3>
        </div>
        <div className="black">
          <svg
            className="icon-summary"
            width="50"
            height="52"
            viewBox="0 0 50 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 0.8125C11.1895 0.8125 0 12.0859 0 26C0 35.1508 4.85887 43.1336 12.0968 47.5414V29.25C12.0968 28.3562 12.8226 27.625 13.7097 27.625C14.5968 27.625 15.3226 28.3562 15.3226 29.25V49.2273C18.2964 50.4867 21.5726 51.1875 25 51.1875C28.4274 51.1875 31.7036 50.4867 34.6774 49.2273V29.25C34.6774 28.3562 35.4032 27.625 36.2903 27.625C37.1774 27.625 37.9032 28.3562 37.9032 29.25V47.5414C45.1411 43.1336 50 35.1406 50 26C50 12.0859 38.8105 0.8125 25 0.8125ZM18.3972 22.8008C16.9052 21.4602 13.7399 21.4602 12.248 22.8008L11.2903 23.6641C10.9073 23.9992 10.3528 24.0703 9.90927 23.8266C9.46573 23.5828 9.21371 23.075 9.29435 22.5672C9.69758 20.0078 12.7419 18.2914 15.3327 18.2914C17.9234 18.2914 20.9677 20.0078 21.371 22.5672C21.4516 23.075 21.1996 23.5828 20.756 23.8266C20.1714 24.1414 19.627 23.8977 19.375 23.6641L18.3972 22.8008V22.8008ZM25 42.25C22.3286 42.25 20.1613 39.3352 20.1613 35.75C20.1613 32.1648 22.3286 29.25 25 29.25C27.6714 29.25 29.8387 32.1648 29.8387 35.75C29.8387 39.3352 27.6714 42.25 25 42.25ZM40.1008 23.8164C39.5161 24.1312 38.9718 23.8875 38.7198 23.6539L37.7621 22.7906C36.2702 21.45 33.1048 21.45 31.6129 22.7906L30.6452 23.6641C30.2621 23.9992 29.7077 24.0703 29.2641 23.8266C28.8206 23.5828 28.5685 23.075 28.6492 22.5672C29.0524 20.0078 32.0968 18.2914 34.6875 18.2914C37.2782 18.2914 40.3226 20.0078 40.7258 22.5672C40.7863 23.0648 40.5444 23.5727 40.1008 23.8164Z"
              fill="white"
            />
          </svg>

          <h1 className="icon-summary sum" style={style}>
          {perc.bad ? perc.bad : 0}%
          </h1>
          <h4 className="icon-summary sum-count" style={style}>
          ({userMoods.filter(x => x.name === 'bad').length})
          </h4>
          <h3 className="icon-summary label">złych</h3>
        </div>

        <h3 className="p-abs bottom-text">{!userMoods.length === 1 ? 'dnia' : 'dni'} w związku.</h3>
      </div>
    </>
  );
}
