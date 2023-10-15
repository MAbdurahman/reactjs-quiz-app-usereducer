import React from 'react';
import LoadingImage from './../assets/loading.gif';

export default function Loader() {

    return (
        <div className="loader-container">
            <img src={LoadingImage} alt="gray-eclipse circulating"/>
            <p className="loading">Loading Questions...</p>
        </div>
    );
};