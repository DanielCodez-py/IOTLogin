import "../Login/Login.css";
import axios from "../../api/axios";
import { Helmet } from "react-helmet";
import {useRef, useState, useEffect} from 'react';
import {
  InfoCircle,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const LOGIN_URL =  "https://industrialiot.onrender.com/api/login"

export default function Login({startLogin}) {
    const userRef = useRef();
    const errRef = useRef();

    const [userEmail, setUserEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [pwd, setPwd] = useState("");
    
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");

    
    useEffect(() => {
        const result = EMAIL_REGEX.test(userEmail);
        console.log(result);
        console.log(userEmail);
        setValidEmail(result);
    }, [userEmail]);

    useEffect(() => {
        setErrMsg("");
    }, [userEmail]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(userEmail);
        if (!v1) {
        setErrMsg("Invalid Entry");
        return;
        }
        try {
        const response = await axios.post(LOGIN_URL,    
            {email: userEmail, password: pwd},
            {
            headers: {"Content-Type": "application/json"},
            }
            );
            // console.log(response.data);
            // console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true)
        } catch(err) {
            if(!err?.response) {
            setErrMsg("No server response");
            } else if(err.response?.status === 400) {
                setErrMsg("Bad request");
                // setErrMsg(err.response["msg"]);
            } else if (err.response?.status === 403) {
                setErrMsg("Email verification not complete");
            } else if (err.response?.status === 500) {
                setErrMsg(err.response.error);
            } else {
                setErrMsg(err.response["Details"])
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            <Helmet>
                <title>IOT Login | Login</title>
            </Helmet>
            {success ? (
                <section >
                    <h1>Login is successful!</h1>
                </section>
            ) : (
                <section className="loginCard">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Login</h1>
                    <form>
                        <label htmlFor="email">
                            Email:
                            <span className={validEmail ? "valid" : "hide"}> <CheckCircleFill /> </span>
                            <span className={validEmail || !userEmail ? "hide" : "invalid"}> <XCircleFill /> </span>
                        </label>
                        <input type="email" id="email" autoComplete="off" onChange={(e) => setUserEmail(e.target.value)} required aria-invalid={validEmail ? "false" : "true"} aria-describedby="emailidnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}/>
                        <p id="emailidnote" className={emailFocus && userEmail && !validEmail ? "instructions" : "offscreen"}>
                            <InfoCircle />
                            Must be a valid email address with an <br />
                            @ symbol followed by a valid domain name
                        </p>


                        <label htmlFor="password">
                            Password:
                        </label>
                        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} required />

                        <button disabled={!validEmail ? true : false} onClick={handleSubmit} >
                            Login
                        </button>
                    </form>
                    <p>Haven't registered yet? <a href='#' onClick={startLogin}>Register</a></p>
                </section>
            ) 
            }
        </>
    )

}