import React from "react";
import { useAuth } from "../AuthProvider";

import "../styles/components/user-front.sass";

const UserFront = () =>{

    const { user } = useAuth();
    
    return(
        <div class='user-front'>
        {user ? (
        <p>{user.usuario}</p>
        ) : (
        <p></p>
        )}
            
        </div>
    )
};

export default UserFront;