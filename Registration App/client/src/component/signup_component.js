import React, { Component, useState } from 'react'

export default function SignUp(){
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [locality, setLocality] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const handleSubmit = (e) => {
        if (userType === "Admin" && secretKey!=="champishere") {
            e.preventDefault();
            alert("Invalid Admin")
        }else {
            e.preventDefault();
        
        console.log(name, username, email, mobileNo, locality, password);
        fetch("http://localhost:8000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "Application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                name,
                username,
                email,
                mobileNo,
                locality,
                password,
                userType,
            })
        }).then((res)=> res.json())
        .then((data)=> {
            console.log(data, "User Registered");
            if (data.status == "ok") {
                alert("Registration Successful");
              } else {
                alert("Something went wrong");
              }
        });
        }
        
    }
    
        return (
            <form className='aman' onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <div className='aman2'>
            <h4>Register As</h4>
            <input
            className='user'
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            <label >User</label>
            <input
            
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            <label>Admin</label>
          </div>
          {userType === "Admin" ? (
          <div className="mb-3">
                    <label>Secret Key</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Secret Key"
                        onChange={(e)=> setSecretKey(e.target.value)}
                    />
                </div>
                ) : null}
          
                <div className="mb-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Full Name"
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>UserName</label>
                    <input type="text" className="form-control"
                    placeholder="Enter UserName"
                    onChange={(e)=> setUserName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Mobile Number</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Mobile No"
                        onChange={(e)=> setMobileNo(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Locality</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Locality"
                        onChange={(e)=> setLocality(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        )
    }
