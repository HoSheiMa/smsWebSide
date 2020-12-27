import React, { Component } from "react";
import { translate } from "../../json/translate";
import {
    eraseCookie,
    getCookie,
    setCookie
} from "./../../../functions/Cookeis";
export default class CheckCode extends Component {
    state = {
        Loading: false,
        error: false,
        Done: false,
        code: null
    };
    componentWillMount() {
        this.setState(
            {
                Loading: true
            },
            () => {
                this.sendSms();
            }
        );
        console.log(Object.keys(translate));
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        this.state.lang = getCookie("lang");
    }

    sendSms = () => {
        fetch(
            "./sendsmsCode?n=" +
                this.props.num() +
                "&PageId=" +
                this.props.PageId
        ).then(async d => {
            this.setState({
                Loading: false
            });
        });
    };
    ERR = () => {
        this.setState({
            error: true,
            Loading: false,
            Done: false
        });
    };

    SCC = () => {
        this.setState(
            {
                error: false,
                Done: true,
                Loading: false
            },
            () => {
                setTimeout(() => {
                    window.location.assign("/login");
                }, 1000);
            }
        );
    };
    CheckCode = () => {
        this.props.RegisterNow(this.state.code, this.ERR, this.SCC);
    };

    render() {
        return (
            <div class="Register_left_side">
                {!this.state.Loading ? (
                    !this.state.Done ? (
                        <div>
                            <br />
                            <p className="text-center">
                                {translate[this.state.lang].Registion}
                            </p>
                            <hr />
                            <div>
                                <article className="card-body ">
                                    <div
                                        style={{
                                            margin: 15
                                        }}
                                    >
                                        <span></span>
                                    </div>
                                    <form>
                                        <div className="form-group input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-lock" />
                                                </span>
                                            </div>
                                            <input
                                                name
                                                className="form-control"
                                                placeholder="Code"
                                                type="text"
                                                onChange={d => {
                                                    this.setState({
                                                        code: d.target.value
                                                    });
                                                }}
                                            />
                                        </div>
                                        <a
                                            style={{
                                                display: "block",
                                                margin: 5
                                            }}
                                            onClick={() => {
                                                this.sendSms();
                                            }}
                                            href="#"
                                        >
                                            {translate[this.state.lang].rsc}
                                        </a>
                                        {this.state.error ? (
                                            <div
                                                class="alert alert-danger"
                                                role="alert"
                                            >
                                                {
                                                    translate[this.state.lang]
                                                        .cerr
                                                }
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        <div className="form-group">
                                            <button
                                                onClick={() => this.CheckCode()}
                                                type="button"
                                                className="btn btn-primary btn-block"
                                            >
                                                {translate[this.state.lang].Ck}
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                onClick={() => this.props.rev()}
                                                type="button"
                                                className="btn  btn-block"
                                            >
                                                {translate[this.state.lang].bk}
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
                                        src="./assets/success.png"
                                    />
                                </article>
                            </div>
                        </div>
                    )
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
        );
    }
}
