import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Spots from "./components/Spots";
import SingleSpot from "./components/SingleSpot";
import CreateNewSpot from "./components/CreateNewSpot";
import UserSpots from "./components/UserSpots";
import UpdateSpot from "./components/UpdateSpot";
import ManageReviews from "./components/ManageReviews";
import UserBookings from "./components/ManageUserBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>
          <Route exact path='/spots'>
            <CreateNewSpot />
          </Route>
          <Route exact path='/spots/current'>
              <UserSpots />
          </Route>
          <Route exact path={'/spots/:spotId/edit'}>
              <UpdateSpot />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SingleSpot />
          </Route>
          <Route exact path='/reviews/current'>
            <ManageReviews />
          </Route>
        <Route exact path='/bookings/:userId'>
          <UserBookings />
        </Route>
        </Switch>
      )}
    </>
  );
}

export default App;