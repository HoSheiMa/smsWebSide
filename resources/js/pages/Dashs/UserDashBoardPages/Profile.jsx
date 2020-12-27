import React, { Component } from "react";

import {
    eraseCookie,
    getCookie,
    setCookie
} from "./../../../../functions/Cookeis";
import { translate } from "./../../../json/translate";

export default class Profile extends Component {
    state = {
        success: null,
        fname: null,
        email: null,
        pass: null,
        number: null
    };
    componentWillMount() {
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        this.state.lang = getCookie("lang");
    }
    postData = () => {
        if (this.state.fname && this.state.email)
            fetch("/profile/post", {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")

                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(this.state), // body data type must match "Content-Type" header
                method: "post"
            }).then(async d => {
                d = await d.json();
                this.setState(d);
                setTimeout(() => {
                    this.setState({
                        success: null
                    });
                }, 2000);
            });
    };
    componentDidMount() {
        fetch("/profile/get", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")

                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(async d => {
            d = await d.json();
            this.setState(d);
            setTimeout(() => {
                this.setState({
                    success: null
                });
            }, 2000);
        });
    }

    render() {
        return (
            <div class="container">
                <div class="row p-3">
                    <div class="col-12 col-lg-4">
                        <img
                            src="./assets/man-300x300.png"
                            width="300"
                            height="300"
                        />
                    </div>
                    <div class="col-12 col-lg-8">
                        {/* Default form register */}
                        <form
                            className="text-center border border-light p-5"
                            action="#!"
                        >
                            <p className="h4 mb-4">
                                {translate[this.state.lang].Profile}
                            </p>
                            <div className="form-row mb-4">
                                <div className="col">
                                    {/* First name */}
                                    <input
                                        value={this.state.fname}
                                        type="text"
                                        onChange={d => {
                                            this.setState({
                                                fname: d.target.value
                                            });
                                        }}
                                        id="defaultRegisterFormFirstName"
                                        className="form-control"
                                        placeholder={
                                            translate[this.state.lang].fn
                                        }
                                    />
                                </div>
                            </div>
                            {/* E-mail */}
                            <input
                                type="email"
                                onChange={d => {
                                    this.setState({
                                        email: d.target.value
                                    });
                                }}
                                value={this.state.email}
                                id="defaultRegisterFormEmail"
                                className="form-control mb-4"
                                placeholder={translate[this.state.lang].ea}
                            />
                            {/* Password */}
                            <input
                                value={this.state.pass}
                                onChange={d => {
                                    this.setState({
                                        pass: d.target.value
                                    });
                                }}
                                type="password"
                                id="defaultRegisterFormPassword"
                                className="form-control"
                                placeholder={translate[this.state.lang].pw}
                                aria-describedby="defaultRegisterFormPasswordHelpBlock"
                            />

                            {/* Phone number */}
                            <input
                                type="text"
                                value={this.state.number}
                                disabled
                                id="defaultRegisterPhonePassword"
                                className="form-control mt-3"
                                placeholder={translate[this.state.lang].pn}
                                aria-describedby="defaultRegisterFormPhoneHelpBlock"
                            />

                            {/* Sign up button */}
                            {this.state.success === null ? (
                                <div></div>
                            ) : this.state.success === false ? (
                                <div
                                    class="alert alert-danger m-1"
                                    role="alert"
                                >
                                    {translate[this.state.lang].fail}
                                </div>
                            ) : (
                                <div
                                    class="alert alert-success m-1"
                                    role="alert"
                                >
                                    {translate[this.state.lang].success}
                                </div>
                            )}

                            <button
                                class="btn btn-info my-4 btn-block"
                                onClick={this.postData}
                                type="button"
                            >
                                {translate[this.state.lang].update}
                            </button>
                        </form>
                        {/* Default form register */}
                    </div>
                </div>
            </div>
        );
    }
}
