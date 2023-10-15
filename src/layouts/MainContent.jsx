import React from 'react';

export default function MainContent({children}) {

    return (
        <main className={'main-content'}>
            {children}
        </main>

    );
};