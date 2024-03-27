import React from "react";
import { useAuth } from "../AuthProvider";

import "../styles/components/user-front.sass";

import { FiLogOut } from "react-icons/fi";

import { FaRegCircleUser } from "react-icons/fa6";

const UserFront = () =>{

   // const { user } = useAuth();
    const user = JSON.parse(sessionStorage.getItem('usuario'));
    const { handleLogout } = useAuth();

   
   
    const logoutAndRedirect = () => {
        handleLogout();
        
    };
    

    return(
        <div className='user-front'>
            {user ? (
            <>
                <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.nome}
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#"  onClick={logoutAndRedirect}><FiLogOut className="icon"/> Sair</a>
                    </div>
                </div>
            </>
            ) : (
            ""
            )}    
       </div>
    )
};

export default UserFront;