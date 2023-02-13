import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../store/spots';

export default function UserSpots() {
    return (
        <>
        <div>
            <h1>Manage Your Spots</h1>
        </div>
        </>
    )
}