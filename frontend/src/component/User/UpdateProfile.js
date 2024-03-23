import React, { useEffect, useState } from 'react'
import './UpdateProfile.css';
import MetaData from '../layout/MetaData'
import { CiMail } from "react-icons/ci";
import { TbFaceId } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = ({ history }) => {
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated } = useSelector((state) => state.profile)


    const updateProfile = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        console.log(avatar,"Changing")
        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            history.push("/account")

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, alert, history, user, isUpdated])
    return (
        <>
            <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
                <div className="updateProfileUpBox">
                    <div className="updateProfileBox">
                        <h2 className="updateProfileHeading">Update Profile</h2>
                        <form
                            className='updateProfileForm'

                            encType='multipart/form-data'
                            onSubmit={updateProfile}
                        >
                            <div className="updateProfileName">
                                <TbFaceId />
                                <input
                                    type="text"
                                    placeholder='Name'
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='updateProfileEmail'>
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

                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept='image/*'
                                    onChange={updateProfileDataChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Update"
                                className='updateProfileBtn'
                            // disabled={loading?true:false} 
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile