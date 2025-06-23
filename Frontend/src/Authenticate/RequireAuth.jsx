import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Spinner from "../Loader/Spinner";

export default function RequireAuth({children}){

    const {userData, loading} = useContext(AuthContext);
   
    if(loading) return <Spinner/>;

    return userData ? children : <Navigate to= "/auth"/>
}