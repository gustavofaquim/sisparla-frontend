import React from "react";
import { useAuth } from "../AuthProvider";

import "../styles/components/user-front.sass";

const UserFront = () =>{
    
    return(
        <div class='user-front'>
            <p>{user && user.usuario}</p>
            <p>{user && user.regra}</p>
            
        </div>
    )
};

export default UserFront;