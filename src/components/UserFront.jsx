import React from "react";
import { useAuth } from "../AuthProvider";

import "../styles/components/user-front.sass";

import { FaRegCircleUser } from "react-icons/fa6";

const UserFront = () =>{

    const { user } = useAuth();

    console.log(user)
    return(
        <div class='user-front'>
        {user ? (
        <>
            <p>{user.nome}</p>
        </>
        ) : (
        ""
        )}
            
        </div>
    )
};

export default UserFront;