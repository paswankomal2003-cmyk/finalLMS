import {useSelector} from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'

function RequireAuth({allowedRoles}){
    const {isLoggedIn, role} = useSelector((state)=> state.auth);
    // const location = useSelector();

    // below line tells that if the user is loggedin and they have roles which is present in allowedRole then 
    return isLoggedIn && allowedRoles.find((myRole)=> myRole === role)? (
        // this outlet component is already given by react router Dom
        <Outlet/>
    
        // this code tells that u are loggedIn but u dont have roles then go to deniedPage and if user in not loggedIn then then it will go to /login page
): isLoggedIn ? (<Navigate to="/denied"/>):(<Navigate to="/login"/>) }

export default RequireAuth