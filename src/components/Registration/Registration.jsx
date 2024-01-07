import Register from "../Register/Register";
import VerifyEmail from "../VerifyEmail/VerifyEmail";
import { useState } from "react";


export default function Registration({startLogin}) {
    const [userEmail, setUserEmail] = useState("");
    const handleUserEmail = (e) => {
        setUserEmail(e)
    }
    const [startVerification, setStartVerificatino] = useState(false);
    const handleVerification = () => {
        setStartVerificatino(true);
    }

    return (
        <>
            {startVerification ? (
                <VerifyEmail userEmail={userEmail} startLogin={startLogin}/> 
            ): (
                <Register handleLogin={startLogin} setToVerify={handleVerification} handleUserEmail={handleUserEmail}/>
            )}
        </>
    )
}