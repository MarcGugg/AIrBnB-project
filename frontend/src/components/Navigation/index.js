import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
    <ul className='navBar'>
      <li className='homeButton'>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li className='profileButton'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    {/* <NavLink className='createSpotButton' to='/spots'>Create new Spot</NavLink> */}
    </div> //ul is boilerplate. div is not
  );
}

export default Navigation;

// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       <li>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginFormModal />}
//         />
//         <OpenModalButton
//           buttonText="Sign Up"
//           modalComponent={<SignupFormModal />}
//         />
//       </li>
//     );
//   }

//   return (
//     <ul>
//       <li>
//         <NavLink exact to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;