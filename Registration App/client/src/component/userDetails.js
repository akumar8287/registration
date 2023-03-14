import React, { useEffect, useState } from "react";
import AdminHome from "./adminHome";
import UserHome from "./userHome";

export default function UserDetails() {
    const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);

useEffect(()=> {
    fetch("http://localhost:8000/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "Application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token"),
        }),
    }).then((res)=> res.json())
    .then((data)=> {
        console.log(data, "UserData");
        if(data.data.userType === "Admin") {
            setAdmin(true)
        }

        setUserData(data.data);
    }); 
}, []);

    return admin ? <AdminHome/> : <UserHome userData={userData}/>
}
