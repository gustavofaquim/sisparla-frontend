import React from "react";
import { useAuth } from "../AuthProvider";

import "../styles/components/user-front.sass";

const UserFront = () =>{
    
    return(
        <div class='user-front'>
            <p>{user && user.usuario}</p>
            
            
        </div>
    )
};

export default UserFront;