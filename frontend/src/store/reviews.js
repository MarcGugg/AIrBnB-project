import { csrfFetch } from "./csrf"

const GET_SPOT_REVIEWS = 'reviews/getSpotReview'
const CREATE_REVIEW = 'reviews/createReview'
const EDIT_REVIEW = 'reviews/editReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const getReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const updateReview = (updatedReview) => {
    return {
        type: EDIT_REVIEW,
        updatedReview
    }
}

const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const getSpotReviews = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    // console.log('thunk hit')
    if (res.ok) {
        const reviews = await res.json()
        console.log('reviews thunk', reviews)
        dispatch(getReviews(reviews))
    }
} 

export const postReview = (review, user, spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "review": review.review,
            "stars": review.stars
        })
    })

    if (res.ok) {
        const review = await res.json()
        console.log('review thunk', review)
        review.User = user
        await dispatch(createReview(review))
        return review
    }
}

export const editReview = (reviewDetails, user, reviewId) => async (dispatch) => {
    console.log('review details', reviewDetails)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "review": reviewDetails.review,
            "stars": reviewDetails.stars
        })
    })

    if (res.ok) {
        const updatedReview = await res.json()
        console.log('thunk res hit. UPDATED REVIEW: ', updatedReview)
        updatedReview.User = user
        dispatch(updateReview(updatedReview))
        return updatedReview
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        await dispatch(removeReview(reviewId))
    }
}

const initialState = {
    spot: {},
    user: {}
}

export default function reviewsReducer(state=initialState, action) {
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const newState = {...state, spot: {}}
            console.log('action reviews AAAA', action.reviews.Reviews)
            for (let review of action.reviews.Reviews) {
                newState.spot[review.id] = review
            }
            // console.log('newstate spot', newState.spot)
            return newState
        }
        case CREATE_REVIEW: {
            const newState2 = {...state, spot: {...state.spot}} //...state.spot
            newState2.spot[action.review.id] = action.review
            return newState2
        }
        case EDIT_REVIEW: {
            const newState3 = {...state, spot: {...state.spot}}
            console.log('newstate reviews', newState3.spot.Reviews)
            console.log('action review', action.updatedReview)
            // newState3.spot.Reviews[action.updatedReview.id] = {...action.updatedReview}
            // newState3.spot.Reviews[action.updatedReview.id].stars = {...action.updatedReview.stars}
            return newState3
        }
        case DELETE_REVIEW: {
            const newState4 = {...state, spot: {...state.spot}}

            delete newState4[action.reviewId]

            return newState4

        }
        default:
            return state
    }
}