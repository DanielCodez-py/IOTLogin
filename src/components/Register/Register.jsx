import axios from '../../api/axios';
import VerifyEmail from '../VerifyEmail/VerifyEmail';
import "./Register.css";
import { useRef, useState, useEffect } from "react";
import {
  InfoCircle,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const REGISTER_URL =  "https://industrialiot.onrender.com/api/register"
// const REGISTER_URL =  "http://serveo.net:4962/api/register";


export default function Register({handleSuccess, handleVerification}) {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);
 
  useEffect(() => {
    const result = EMAIL_REGEX.test(userEmail);
    console.log(result);
    console.log(userEmail);
    setValidEmail(result);
  }, [userEmail]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, 
        {email: userEmail, username: user, password: pwd},
        {
          headers: {"Content-Type": "application/json"},
          // withCredentials: true
        }
        );
        // console.log(response.data);
        // console.log(response.accessToken);
        console.log(JSON.stringify(response));
        handleSuccess();
    } catch(err) {
        if(!err?.response) {
          setErrMsg("No server response");
        } else if(err.response?.status === 400) {
            setErrMsg("Username is already taken");
        } else {
          setErrMsg("Registration failed")
        }
        errRef.current.focus();
    }
  };

  

  return (
    <>
      {success ? (
          <VerifyEmail userEmail={userEmail}/>
      ) : (
        <section className="signupCard">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <CheckCircleFill />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <XCircleFill />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <InfoCircle />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, hyphens, underscores allowed.
            </p>

            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <CheckCircleFill />
              </span>
              <span className={validEmail || !userEmail ? "hide" : "invalid"}>
                <XCircleFill />
              </span>
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setUserEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />

            <p
              id="emailidnote"
              className={
                emailFocus && userEmail && !validEmail ? "instructions" : "offscreen"
              }
            >
              <InfoCircle />
              Must be a valid email address with an <br />
              @ symbol followed by a valid domain name
            </p>


            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <CheckCircleFill />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <XCircleFill />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <InfoCircle />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <CheckCircleFill />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <XCircleFill />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <InfoCircle />
              Must match the first password input field.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </form>
          <p>Already signed up? <a href='#' onClick={handleVerification}>Login</a></p>
        </section>
      )}
    </>
  );
}
