import Register from "../Register/Register";
import VerifyEmail from "../VerifyEmail/VerifyEmail";
import { useState } from "react";


export default function Registration({setToVerify, startLogin}) {
    const [success, setSuccess] = useState(false);
    const handleSuccess = () => {
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <VerifyEmail/> 
            ): (
                <Register handleSuccess={handleSuccess} handleVerification={setToVerify}/>
            )}
        </>
    )
}