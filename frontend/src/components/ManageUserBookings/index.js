import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getUserBookings } from "../../store/bookings"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

export default function UserBookings() {
    const dispatch = useDispatch()
    // const {userId} = useParams()
    const bookings = useSelector((state) => state.bookings.userBookings)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch, user])

    if (!bookings || !Object.values(bookings).length) {
        return null
    }

    return (
        <>
        <h1>User Bookings</h1>
        </>
    )
}