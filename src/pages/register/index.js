import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animations } from "react-animation";
import axios from "axios";
export default function Register({setloggedUser}) {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  useEffect(() => {
    console.log((JSON.parse(localStorage.getItem('logged'))))
    if(JSON.parse(localStorage.getItem('logged'))=== true){
      navigate('/')
    
    
    }else{
      localStorage.getItem('user') !== undefined &&  setloggedUser(JSON.parse(localStorage.getItem('user')))
    }
    }, [])
  const style = {
    animation: animations.bounceIn,
  };
  function register() {
    if(validateEmail(inputData.email)){
      if(inputData.pass === inputData.pass_sec && inputData.pass.length > 5){
        axios
        .post("http://localhost:3001/users", inputData)
        .then(function (response) {
          localStorage.setItem('logged', JSON.stringify(true))
          localStorage.setItem('user', JSON.stringify(response.data))
          setloggedUser(response.data.user)
          navigate("/")
        })
        .catch(function (error) {
          seterror(true);
      seterrorInputs({...errorInputs, email:true})
      setTimeout(() => {
        seterror(false)
        seterrorInputs({email: false, password:false})
      }, 3000);
        });
      }else{
        seterror(true);
      seterrorInputs({...errorInputs, password:true, pass_sec: true})
      setTimeout(() => {
        seterror(false)
        seterrorInputs({email: false, password:false})
      }, 3000);
      }
    }else{
      seterror(true);
      seterrorInputs({...errorInputs, email:true})
      setTimeout(() => {
        seterror(false)
        seterrorInputs({email: false, password:false})
      }, 3000);
    }
   
    
  }
  const [errorInputs, seterrorInputs] = useState({email: false, password:false, pass_sec: false})
 const [error, seterror] = useState(false)

  const [inputData, setinputData] = useState({
    email: "",
    pass: "",
    pass_sec: "",
  });
  let navigate = useNavigate();
  return (
    <>
      <svg
        width="35"
        className="back"
        onClick={() => navigate("/login")}
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="35" height="35" rx="17.5" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.3581 24.715L12.1948 18.4752C11.9351 18.2125 11.9351 17.7882 12.1948 17.5248L18.3581 11.285C18.733 10.905 19.3429 10.905 19.7185 11.285C20.0934 11.665 20.0934 12.2818 19.7185 12.6618L14.4461 18.0003L19.7185 23.3375C20.0934 23.7182 20.0934 24.335 19.7185 24.715C19.3429 25.095 18.733 25.095 18.3581 24.715Z"
          fill="#DE3A89"
          stroke="#DE3A89"
          stroke-width="2"
        />
      </svg>
      <div
        style={{
          ...style,
          marginTop: "100px",
          maxWidth: "400px",
          display: "inline-block",
        }}
      >
       {error  ? <svg width="81" height="82" viewBox="0 0 81 82" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40.5 0.3125C18.127 0.3125 0 18.5234 0 41C0 55.782 7.87137 68.6773 19.5968 75.7977V46.25C19.5968 44.8063 20.7726 43.625 22.2097 43.625C23.6468 43.625 24.8226 44.8063 24.8226 46.25V78.5211C29.6401 80.5555 34.9476 81.6875 40.5 81.6875C46.0524 81.6875 51.3599 80.5555 56.1774 78.5211V46.25C56.1774 44.8063 57.3532 43.625 58.7903 43.625C60.2274 43.625 61.4032 44.8063 61.4032 46.25V75.7977C73.1286 68.6773 81 55.7656 81 41C81 18.5234 62.873 0.3125 40.5 0.3125ZM29.8034 35.832C27.3865 33.6664 22.2587 33.6664 19.8417 35.832L18.2903 37.2266C17.6698 37.768 16.7716 37.8828 16.053 37.4891C15.3345 37.0953 14.9262 36.275 15.0569 35.4547C15.7101 31.3203 20.6419 28.5477 24.8389 28.5477C29.0359 28.5477 33.9677 31.3203 34.621 35.4547C34.7516 36.275 34.3433 37.0953 33.6248 37.4891C32.6776 37.9977 31.7958 37.6039 31.3875 37.2266L29.8034 35.832ZM40.5 67.25C36.1724 67.25 32.6613 62.5414 32.6613 56.75C32.6613 50.9586 36.1724 46.25 40.5 46.25C44.8276 46.25 48.3387 50.9586 48.3387 56.75C48.3387 62.5414 44.8276 67.25 40.5 67.25ZM64.9633 37.4727C64.0161 37.9813 63.1343 37.5875 62.726 37.2102L61.1746 35.8156C58.7577 33.65 53.6298 33.65 51.2129 35.8156L49.6452 37.2266C49.0246 37.768 48.1264 37.8828 47.4079 37.4891C46.6893 37.0953 46.281 36.275 46.4117 35.4547C47.0649 31.3203 51.9968 28.5477 56.1937 28.5477C60.3907 28.5477 65.3226 31.3203 65.9758 35.4547C66.0738 36.2586 65.6819 37.0789 64.9633 37.4727Z" fill="white"/>
</svg>
 : <svg
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
}
        <h1>Twój Związek</h1>

        <input
           type={'email'}
          className={`${errorInputs.email && 'fade'} input` }
          style={{ marginTop: "15px" }}
          onChange={(e) =>
            setinputData({ ...inputData, email: e.target.value })
          }
          placeholder="Email"
        />
        <input
         className={`${errorInputs.password && 'fade'} input` }
          type="password"
          placeholder="Hasło"
          onChange={(e) => setinputData({ ...inputData, pass: e.target.value })}
        />
        <input
         className={`${errorInputs.pass_sec && 'fade'} input` }
          type="password"
          placeholder="Powtórz hasło"
          onChange={(e) =>
            setinputData({ ...inputData, pass_sec: e.target.value })
          }
        />
        <div>
          <svg
            width="41"
            height="57"
            onClick={() =>{
              register()
            }}
            className="Ok pointer"
            viewBox="0 0 41 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.9346 14.5528C33.8772 10.7231 32.7194 8.57227 30.239 5.44172C27.7631 2.31117 24.833 -0.823828 21.5555 1.97719C19.8989 3.38883 20.3976 5.6332 21.6312 7.86422C21.4219 7.72617 21.8226 8.82609 21.6267 8.67914C17.9083 5.8425 17.1157 6.15422 15.8332 7.16953C12.7872 9.57867 18.0419 14.5038 19.7564 17.1445C20.0503 17.5987 21.1235 18.0218 21.3773 18.4404C21.551 18.7254 21.7158 19.0015 21.8716 19.2687C21.6801 19.2108 21.4842 19.1529 21.2838 19.095C19.4847 18.5918 15.3522 18.0485 13.473 18.7566C1.81475 23.1562 2.40256 25.0755 3.29764 27.596C4.19272 30.1165 7.46131 31.9779 12.8051 28.6559C19.4001 25.9305 24.8775 29.5821 24.8775 33.3762C24.8775 38.5863 23.1719 41.5298 18.6965 41.5298C11.6205 41.5298 11.242 35.7586 7.46131 31.9779C6.44154 30.9581 3.99233 30.6598 2.54506 31.7062C-0.830408 34.151 1.35162 39.2231 2.19326 40.9198C3.9567 44.4689 6.12983 49.6167 11.8521 54.2569C14.8624 56.6972 22.3303 56.3231 26.6498 55.4414C34.8614 53.767 36.5135 48.312 39.1497 38.9737C40.1428 35.4602 40.2764 32.6325 40.2764 28.7093C40.2764 24.7861 37.8494 18.1198 35.9346 14.5528V14.5528Z"
              fill="#FFFFFC"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
