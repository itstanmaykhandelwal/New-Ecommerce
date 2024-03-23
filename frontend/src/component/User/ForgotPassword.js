import React,{useState,useEffect} from 'react'
import './ForgotPassword.css'
import MetaData from '../layout/MetaData'
import { CiMail } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { error, message } = useSelector((state) => state.forgotPassword)

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert,message])
    return (
        <>
            <MetaData title="Forgot Password" />
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordUpBox">
                    <div className="forgotPasswordBox">
                        <h2 className="forgotPasswordHeading">Forgot Password</h2>
                        <form
                            className='forgotPasswordForm'
                            onSubmit={forgotPasswordSubmit}
                        >
                            
                            <div className='forgotPasswordEmail'>
                                <CiMail />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            
                            <input
                                type="submit"
                                value="Send"
                                className='forgotPasswordBtn'
                            // disabled={loading?true:false} 
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword