import React, { useEffect, useState } from "react";

export default function UserHome({ userData }) {
    const logOut = () => {
        window.localStorage.clear();
        window.location.href="./sign-in";
    }
    return(
        <div>
            Name : <h4>{userData.name}</h4>
            User Name : <h4>{userData.username}</h4>
            Email : <h4>{userData.email}</h4>
            Mobile No : <h4>{userData.mobileNo}</h4>
            locality : <h4>{userData.locality}</h4><br/>
            <button onClick={logOut} className="btn btn-primary">Logout</button>
            </div>
    )
}
