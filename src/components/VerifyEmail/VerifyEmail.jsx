import axios from "../../api/axios";
import {useRef, useState, useEffect} from 'react';
import {
  InfoCircle,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";

const VERIFY_EMAIL_URL =  "https://industrialiot.onrender.com/api/verifyemail"

export default function VerifyEmail({userEmail}) {
    const userRef = useRef();
    const errRef = useRef();

    const [userOTP, setUserOTP] = useState();
    const [OTPFocus, setOTPFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userOTP) {
        setErrMsg("Invalid Entry");
        return;
        }
        try {
        const response = await axios.post(VERIFY_EMAIL_URL,    
            {"otp": userOTP, "email": userEmai},
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
            {success ? (
                <section >
                    <h1>Congratulations!</h1>
                    <p>Registration is successful.</p>
                </section>
            ) : (
                <section className="verifyEmailCard">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Verify your Email</h1>
                    <p>An OTP has been sent to your email : {userEmail} <br/> Please enter the OTP to verify your email address.</p>
                    <form>
                        <label htmlFor="verifyOtp">
                            Input OTP:
                        </label>
                        <input type="number" id="verifyOtp" autoComplete="off" onChange={(e) => setUserOTP(e.target.value)} required />

                        <button onClick={handleSubmit} >
                            Verify
                        </button>
                    </form>
                    {/* <p>Haven't registered yet? <a href='#' onClick={handleRegistration}>Register</a></p> */}
                </section>
            ) 
            }
        </>
    )

}