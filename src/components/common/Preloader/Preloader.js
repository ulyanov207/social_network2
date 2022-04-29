import React from 'react';
import preloader from "../../../assets/images/Spinner-1.2s-217px.svg";

const Preloader = (props) => {
    return (
        <div  style={{backgroundColor:'white'}}>
            <img src={preloader}/>
        </div>
    );
};

export default Preloader;