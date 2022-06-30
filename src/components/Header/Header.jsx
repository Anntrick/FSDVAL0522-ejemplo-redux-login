import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userSelector, login } from '../../containers/User/userSlice'
import './Header.css';
import { Button } from 'react-bootstrap';


const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    let navegador = useNavigate()

    const viajar = (destino) => {
        navegador(destino)
    };

    return (
        <div className='headerDesign'>
            {!user.isLogged &&
                <div>
                    <div className='textLink' onClick={()=>viajar("/login")}>Login</div>
                    <div className='textLink' onClick={()=>viajar("/register")}>Register</div>
                </div>
            }

            {user.isLogged &&
                <div>
                    <Button onClick={()=>{
                        localStorage.clear()
                        dispatch(logout())
                    }}>Logout</Button>
                </div>
            }
        </div>
    )

};

export default Header;