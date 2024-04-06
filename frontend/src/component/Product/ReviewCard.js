import React from 'react';
import {Rating} from '@material-ui/lab';
import { CiUser } from "react-icons/ci";

const ReviewCard = ({review}) => {
    

    const options ={
        size:"large",
        value:review.rating,
        readOnly:true,
        precision:0.5
    }
    return (
        <>
            <div className='reviewCard'>
                {/* <img src={ProfileImg} alt="User"/> */}
                <div className='user'><CiUser /></div>
                <p>{review.name}</p>
                <Rating {...options} />
                <span className="reviewCardComment">{review.comment}</span>
            </div>
        </>
    )
}

export default ReviewCard