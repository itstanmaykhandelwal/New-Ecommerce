import React, { useEffect, useState } from 'react';
import './ResetPassoword.css';
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const ResetPassword = ({history,match}) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success, } = useSelector((state) => state.forgotPassword)


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("Password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(match.params.token, myForm))
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");

            history.push("/login")

        }
    }, [dispatch, error, alert, history, success])
    return (
        <>
            <MetaData title="Change Password" />
            <div className="resetPasswordContainer">
                <div className="resetPasswordUpBox">
                    <div className="resetPasswordBox">
                        <h2 className="resetPasswordHeading">Update Profile</h2>
                        <form
                            className='resetPasswordForm'
                            onSubmit={resetPasswordSubmit}
                        >
                            <div >
                            <FaLockOpen />
                            <input
                                type="password"
                                placeholder='New Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                            <div className='loginPassword'>
                            <FaLock />
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            </div>

                            <input
                                type="submit"
                                value="Update"
                                className='resetPasswordBtn'
                            // disabled={loading?true:false} 
                            />
                        </form>
                    </div>
                </div>                    
            </div >
        </>
    )
}

export default ResetPassword