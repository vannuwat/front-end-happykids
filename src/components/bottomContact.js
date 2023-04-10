import React  from 'react';
import { NavLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import "./bottom.css";

export default function ContactBelow(){

    const LinkStyle = {
        display: 'flex', margin: 'auto', justifyContent: 'space-between', width: '30%'
      };

    const LinkStyleIcon = {
    display: 'flex', margin: 'auto', justifyContent: 'space-between', width: '10%', paddingBottom: '3em', paddingTop: '2em'
    };

    return(
        <div className="bottom-area" style={{width: '100%', marginTop: '0.5em', textAlign: 'center', position: 'absolute'}}>
            <h2 style={{paddingTop: '1em'}}>Happy kids</h2>
            <div style={LinkStyle}>
                <NavLink className="NavLink" to="/contact" >
                    <h4 >Contact Us</h4 >
                </NavLink>
                <NavLink className="NavLink" to="/story">
                    <h4 >Our Story</h4 >
                </NavLink>
                <NavLink className="NavLink" to="/policy">
                    <h4 >Our Policy</h4 >
                </NavLink>
            </div>
            <div style={LinkStyleIcon}>
            <NavLink to="https://www.facebook.com/"> 
                <FacebookIcon />
            </NavLink>
            <NavLink to="https://www.pinterest.com/"> 
                <PinterestIcon />
            </NavLink>
            <NavLink to="https://www.instagram.com/">  
                <InstagramIcon />
            </NavLink>   
            </div>
        </div>
          )
}

