import React, { Component } from "react";
import UserDashBoard from "./Dashs/UserDashBoard";
import AdminDashBoard from "./Dashs/AdminDashBoard";

export default class Dashboard extends Component {
    state = {
        Login: false,
        isAdmin: "false",
        loading: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    isLogin = async () => {
        fetch("/isLogin", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(this.state), // body data type must match "Content-Type" header
            method: "post"
        }).then(async d => {
            d = await d.json();
            this.setState({ ...d }, () => {
                if (!this.state.Login) {
                    window.location.assign("/");
                } else {
                    this.setState({
                        loading: false
                    });
                }
            });
        });
    };
    async componentDidMount() {
        await this.isLogin();
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <div
                        style={{
                            width: "100vw",
                            height: "100vh"
                        }}
                        class="row justify-content-center align-items-center"
                    >
                        <img width="50" src="./assets/Loading.gif" />
                    </div>
                ) : this.state.isAdmin == "true" ? (
                    <AdminDashBoard />
                ) : (
                    <UserDashBoard />
                )}
            </div>
        );
    }
}
