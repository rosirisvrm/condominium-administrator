import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

AuthRoute.propTypes = {
    children: PropTypes.node,
}

function AuthRoute(props){
    const auth = useSelector(state => state.auth.user)
    const location = useLocation()

    if(!auth) return(<Navigate to='/login' state={{ from: location }} replace />);

    return props.children;
}

export { AuthRoute };