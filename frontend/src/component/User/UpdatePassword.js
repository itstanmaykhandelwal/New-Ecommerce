import React, { useEffect, useState } from 'react'
import './UpdatePassword.css';
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { FaLockOpen } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated } = useSelector((state) => state.profile)


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm))
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully");

            history.push("/account")

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, history, isUpdated])
    return (
        <>
            <MetaData title="Change Password" />
            <div className="updatePasswordContainer">
                <div className="updatePasswordUpBox">
                    <div className="updatePasswordBox">
                        <h2 className="updatePasswordHeading">Update Profile</h2>
                        <form
                            className='updatePasswordForm'
                            onSubmit={updatePasswordSubmit}
                        >
                            <div className='loginPassword'>
                                <FaKey />
                                <input
                                    type="password"
                                    placeholder='Old Password'
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                            <FaLockOpen />
                            <input
                                type="password"
                                placeholder='New Password'
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                                value="Change"
                                className='updatePasswordBtn'
                            // disabled={loading?true:false} 
                            />
                        </form>
                    </div>
                </div>                    
            </div >
        </>
    )
}

export default UpdatePassword