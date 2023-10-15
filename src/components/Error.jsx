import React from 'react';
import ErrorImage from '../assets/error.gif'

export default function Error() {

    return (
        <div className="loader-container">
            <img src={ErrorImage} alt="red-eclipse circulating"/>
            <p className="error">Error Fetching Questions!</p>
        </div>
    );
};