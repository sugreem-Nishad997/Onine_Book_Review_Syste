import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Spinner from "../Loader/Spinner";

export default function RequireAdmin({children}){

    const {userData, loading} = useContext(AuthContext)

    if(loading) return <Spinner/>;


    return userData && userData.isAdmin ? children : <Navigate to="/"/>
}