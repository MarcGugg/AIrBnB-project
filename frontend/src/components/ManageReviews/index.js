import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateNewSpot from "../CreateNewSpot";
import { Link, useHistory } from "react-router-dom";
import { getUserReviews } from "../../store/reviews";

export default function ManageReviews() {
    // const user = useSelector((state) => )
    const reviews = useSelector((state) => state.reviews.user.userReviews)
    console.log('user reviews', reviews)
    // const {Reviews} = reviews
    // console.log('Reviews', Reviews)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])

    // if (!Object.values(reviews).length === 0) return null

    return (
        <>
        <h1>Manage Reviews</h1>
        <div className="allReviews">
        </div>
        </>
    );
}