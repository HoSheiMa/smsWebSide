import React, { Component } from "react";
import { translate } from "../json/translate";
import { eraseCookie, getCookie, setCookie } from "./../../functions/Cookeis";

export default class Login extends Component {
    state = {
        Loading: false,
        error: false,
        Done: false,
        Forget: false,
        showCodeInput: false,
        Code: null,
        email: null,
        pass: null,
        newpass: null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    componentWillMount() {
        console.log(Object.keys(translate));
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        this.state.lang = getCookie("lang");
    }

    log = () => {
        this.setState({
            Loading: true,
            error: false,
            Done: false
        });
        if (this.state.pass && this.state.email) {
            fetch("/loginapi", {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")

                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(this.state), // body data type must match "Content-Type" header
                method: "post"
            })
                .then(async d => {
                    d = await d.json();
                    if (d.success) {
                        window.location.assign("/dashboard");
                    } else {
                        this.setState({
                            error: true,
                            Loading: false
                        });
                    }
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        Loading: false
                    });
                });
        }
    };
    nextCodeStep = () => {
        if (!this.state.showCodeInput) {
            fetch("/sendsmsCodeForget?email=" + this.state.email).then(
                async d => {
                    this.setState({
                        Loading: false,
                        showCodeInput: true
                    });
                }
            );
        } else {
            fetch(
                "/checkCodeForget?code=" +
                    this.state.Code +
                    "&pass=" +
                    this.state.newpass
            ).then(async d => {
                d = await d.json();
                if (d.success) {
                    this.setState({
                        CodeError: false,
                        Loading: false,
                        Done: false,
                        Forget: false
                    });
                } else {
                    this.setState({
                        CodeError: false,
                        Loading: false,
                        Done: true
                    });
                }
            });
        }
    };
    render() {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100vh"
                }}
            >
                <div class="Register_right_side  ">
                    <img
                        src="./assets/photo-1513151233558-d860c5398176.jpeg"
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                    <div class="title_hide_in_small">
                        <span
                            style={{
                                fontSize: "25px",
                                color: "white",
                                textShadow: "0 0 6px #000"
                            }}
                        >
                            {translate[this.state.lang].lw}
                        </span>
                    </div>
                </div>
                {this.state.Forget ? (
                    <div className="container Register_left_side ">
                        {!this.state.Loading ? (
                            <div>
                                <br />
                                <p className="text-center">
                                    {translate[this.state.lang].Login}
                                </p>
                                <hr />
                                <div>
                                    <article
                                        style={{
                                            marginTop: "15vh"
                                        }}
                                        className="card-body "
                                    >
                                        <form>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-envelope" />
                                                    </span>
                                                </div>
                                                <input
                                                    onChange={d => {
                                                        this.setState({
                                                            email:
                                                                d.target.value
                                                        });
                                                    }}
                                                    name
                                                    className="form-control"
                                                    placeholder={
                                                        translate[
                                                            this.state.lang
                                                        ].ea
                                                    }
                                                    type="email"
                                                />
                                            </div>

                                            {this.state.showCodeInput ? (
                                                <div>
                                                    {" "}
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fa fa-lock" />
                                                            </span>
                                                        </div>
                                                        <input
                                                            onChange={d => {
                                                                this.setState({
                                                                    Code:
                                                                        d.target
                                                                            .value
                                                                });
                                                            }}
                                                            className="form-control"
                                                            placeholder={
                                                                translate[
                                                                    this.state
                                                                        .lang
                                                                ].code
                                                            }
                                                            type="password"
                                                        />
                                                    </div>
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fa fa-lock" />
                                                            </span>
                                                        </div>
                                                        <input
                                                            onChange={d => {
                                                                this.setState({
                                                                    newpass:
                                                                        d.target
                                                                            .value
                                                                });
                                                            }}
                                                            className="form-control"
                                                            placeholder={
                                                                translate[
                                                                    this.state
                                                                        .lang
                                                                ].pw
                                                            }
                                                            type="password"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}

                                            {this.state.CodeError ? (
                                                <div
                                                    class="alert alert-danger"
                                                    role="alert"
                                                >
                                                    {
                                                        translate[
                                                            this.state.lang
                                                        ].ForGetCodeERror
                                                    }
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                            <div className="form-group">
                                                <button
                                                    onClick={() => {
                                                        this.nextCodeStep();
                                                    }}
                                                    type="button"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    {
                                                        translate[
                                                            this.state.lang
                                                        ].sc
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </article>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p className="text-center">
                                    {translate[this.state.lang].Login}
                                </p>
                                <hr />
                                <div>
                                    <article
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        className="card-body "
                                    >
                                        <img
                                            style={{
                                                width: 80,
                                                height: 80
                                            }}
                                            src="./assets/Loading.gif"
                                        />
                                    </article>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="container Register_left_side">
                        {!this.state.Loading ? (
                            <div>
                                <br />
                                <p className="text-center">
                                    {translate[this.state.lang].Login}
                                </p>
                                <hr />
                                <div
                                    style={{
                                        marginTop: "15vh"
                                    }}
                                >
                                    <article className="card-body ">
                                        <form>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-envelope" />
                                                    </span>
                                                </div>
                                                <input
                                                    onChange={d => {
                                                        this.setState({
                                                            email:
                                                                d.target.value
                                                        });
                                                    }}
                                                    name
                                                    className="form-control"
                                                    placeholder={
                                                        translate[
                                                            this.state.lang
                                                        ].ea
                                                    }
                                                    type="email"
                                                />
                                            </div>

                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-lock" />
                                                    </span>
                                                </div>
                                                <input
                                                    onChange={d => {
                                                        this.setState({
                                                            pass: d.target.value
                                                        });
                                                    }}
                                                    className="form-control"
                                                    placeholder={
                                                        translate[
                                                            this.state.lang
                                                        ].pw
                                                    }
                                                    type="password"
                                                />
                                            </div>

                                            {this.state.error ? (
                                                <div
                                                    class="alert alert-danger"
                                                    role="alert"
                                                >
                                                    {
                                                        translate[
                                                            this.state.lang
                                                        ].errPass
                                                    }
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                            <div
                                                className="m-4"
                                                style={{
                                                    textAlign: "right"
                                                }}
                                            >
                                                <a
                                                    href="#"
                                                    onClick={() => {
                                                        this.setState({
                                                            Forget: true
                                                        });
                                                    }}
                                                >
                                                    {
                                                        translate[
                                                            this.state.lang
                                                        ].fg
                                                    }
                                                </a>
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    onClick={() => {
                                                        this.log();
                                                    }}
                                                    type="button"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    {
                                                        translate[
                                                            this.state.lang
                                                        ].li
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </article>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p className="text-center">
                                    {translate[this.state.lang].Registion}
                                </p>
                                <hr />
                                <div>
                                    <article
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        className="card-body "
                                    >
                                        <img
                                            style={{
                                                width: 80,
                                                height: 80
                                            }}
                                            src="./assets/Loading.gif"
                                        />
                                    </article>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
