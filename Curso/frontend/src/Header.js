import React from 'react'; //Essencial sempre que for usar JSX

export default function Header({children}){
    return(
        <header>
            <h1>{children}</h1>
        </header>
    );
}
//<h1>{propos.title}</h1>
//<h1>{propos.children}</h1>