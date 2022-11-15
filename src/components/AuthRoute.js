function AuthRoute(props){
    // const auth = useAuth()
    // const location = useLocation()

    // if(!auth.user) return(<Navigate to='/login' state={{ from: location }} replace />);

    return props.children;
}

export { AuthRoute };