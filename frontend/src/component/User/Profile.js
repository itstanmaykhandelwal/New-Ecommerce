import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Profile.css'
const Profile = ({history}) => {

    const {user,isAuthenticated} = useSelector((state) => state.user);

    useEffect(() => {
        if(isAuthenticated === false){
            history.push("/login")
        }
    }, [history,isAuthenticated])
    

    return (
        <div>
            <MetaData title={`${user.name}'s Profile`}/>
            <div className='profileContainer'>
                <div>
                    <h1>My Profile</h1>
                    {user.avatar && <img src={user.avatar.url} alt={user.name} />}
                    <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substr(0,10)}</p>
                </div>
                <div>
                    <Link to="/orders">My Order</Link>
                    <Link to="/password/update">Change Password</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Profile