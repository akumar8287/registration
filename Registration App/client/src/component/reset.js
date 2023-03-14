import React, { Component } from "react";

export default class Reset extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const{ email } = this.state;
        console.log(email);
        fetch("http://localhost:8000/forgot-password", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "Application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
            }),
        }).then((res)=> res.json())
        .then((data)=> {
            console.log(data, "User Registered");
            alert(data.status);
        });
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Forget Password</h3>

                <div className="mb-3">
                <label>Email Address</label>
                <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={(e)=> this.setState({ email: e.target.value })}
                />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <p className="forgot-password text-right">
                    <a href="/sign-in">Sign In</a>
                </p>
            </form>
        )
    }
}