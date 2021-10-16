import React from 'react'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';

export default function Logout() {
    const cookies = new Cookies();
    const history = new useHistory();

    cookies.remove("uuid");
    history.push("/");

    return (
        <div>
            Logging out...
        </div>
    )
}
