import React, { Component } from "react";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";

import CodePhone from "./CodePhone";
function AlertMui(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class SimplePage extends Component {
    state = {
        Loading: false,
        success: false,
        error: false,
        numberCode: "44",
        delay: 0,
        number: null,
        text: null
    };
    closeError = () => {
        this.setState({
            error: false
        });
    };
    closeSuccess = () => {
        this.setState({
            success: false
        });
    };
    delay = () => {
        setTimeout(() => {
            this.setState({
                delay: this.state.delay - 1
            });
            if (this.state.delay > 0) {
                this.delay();
            } else {
                this.setState({
                    success: false,
                    error: false,
                    Loading: false
                });
            }
        }, 1000);
    };
    send = () => {
        var n = this.state.number;
        var c = this.state.numberCode;
        var t = this.state.text;

        if (this.state.delay == 0 && !this.state.Loading && n && t && c) {
            n = c + n; // mix two value to be a real phone number
            // send
            this.setState({
                Loading: true,
                error: false,
                success: false
            });

            fetch("/sendsms", {
                method: "POST",
                body: JSON.stringify({ n: n, t: t }),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                }
            })
                .then(d => {
                    this.setState({
                        Loading: false,
                        error: false,
                        success: true
                    });
                    this.setState(
                        {
                            success: true,
                            delay: 60
                        },
                        () => {
                            this.delay();
                        }
                    );
                })
                .catch(() => {
                    this.setState({
                        Loading: false,
                        error: true,
                        success: false
                    });
                    this.setState(
                        {
                            error: true,
                            delay: 60
                        },
                        () => {
                            this.delay();
                        }
                    );
                });
        }
    };
    render() {
        return (
            <div
                className="row  justify-content-center align-items-center p-0 m-0"
                style={{
                    width: "100vw",
                    height: "100vh",
                    background: "#f7f7f7"
                }}
            >
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#">
                        LOGO
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarCollapse"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">
                                    Home{" "}
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Link
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main
                    style={{
                        marginTop: 90
                    }}
                    role="main"
                    className="container"
                >
                    <div className="jumbotron">
                        <h1>LOGO</h1>
                        <p className="lead">
                            This example is a quick exercise to illustrate how
                            fixed to top navbar works. As you scroll, it will
                            remain fixed to the top of your browser's viewport.
                        </p>
                        <a
                            className="btn btn-lg btn-primary"
                            href="#tool"
                            role="button"
                        >
                            View sender tool »
                        </a>
                    </div>
                </main>
                <Alert
                    style={{
                        borderRadius: 12
                    }}
                    severity="info"
                    className="col-sm-12 col-md-12 col-lg-10 m-3"
                >
                    Send your Text Message to anyone worldwide for FREE with our
                    International SMS Messaging Service. Send FREE SMS instantly
                    with our incredibly fast SMS Service. The world best and
                    fastest text messaging service online!
                </Alert>

                <div
                    id="tool"
                    className="col-sm-12 col-md-12 col-lg-10  align-items-center m-0 p-5 text-center"
                    style={{
                        boxShadow: "0 0 37px rgba(8,21,66,0.05)",
                        borderRadius: "12px",
                        background: "#fff",
                        height: 600,
                        minHeight: 600
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="m-0 p-0">
                        <CodePhone
                            setCode={d => {
                                this.setState({
                                    numberCode: d
                                });
                            }}
                        />

                        <TextField
                            className="mb-1 col-sm-12 col-md-12 col-lg-6"
                            id="outlined-basic"
                            label="phone number"
                            variant="outlined"
                            onChange={d => {
                                this.setState({
                                    number: d.target.value
                                });
                            }}
                            inputProps={{
                                maxLength: "16"
                            }}
                        />
                    </div>

                    <TextField
                        className="mb-1 col-sm-12 col-md-12 col-lg-8"
                        id="outlined-basic"
                        label="write your message..."
                        variant="outlined"
                        multiline
                        onChange={d => {
                            this.setState({
                                text: d.target.value
                            });
                        }}
                        row={4}
                        rowsMax={4}
                        inputProps={{
                            style: {
                                minHeight: "240px"
                            },
                            maxLength: "160"
                        }}
                    />
                    {this.state.delay ? (
                        <div className="m-2">
                            You Can send again after {this.state.delay} sec.
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <Button
                        inputProps={{
                            type: "button"
                        }}
                        className="col-sm-12 col-md-12 col-lg-8 p-3 "
                        variant="contained"
                        color="primary"
                        onClick={this.send}
                    >
                        {this.state.Loading ? (
                            <img width="26" src="../assets/Loading.gif" />
                        ) : (
                            <span className="text-white">Send</span>
                        )}
                    </Button>

                    <Snackbar
                        open={this.state.success}
                        onClose={this.closeSuccess}
                        autoHideDuration={5000}
                    >
                        <AlertMui severity="success">
                            the message send!
                        </AlertMui>
                    </Snackbar>
                    <Snackbar
                        open={this.state.error}
                        onClose={this.closeError}
                        autoHideDuration={6000}
                    >
                        <AlertMui severity="success">
                            the message error!
                        </AlertMui>
                    </Snackbar>
                </div>

                <footer
                    className="bg-dark pb-5 mt-4 page-footer font-small mdb-color pt-4 "
                    style={{
                        background: "#45526e !important",
                        width: "100vw"
                    }}
                >
                    <div className="container text-center text-md-left">
                        <div className="row text-center text-md-left mt-3 pb-3">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">
                                    Company name
                                </h6>
                                <p>
                                    Here you can use rows and columns to
                                    organize your footer content. Lorem ipsum
                                    dolor sit amet, consectetur adipisicing
                                    elit.
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">
                                    Products
                                </h6>
                                <p>
                                    <a href="#!">link 1</a>
                                </p>
                                <p>
                                    <a href="#!">link 2</a>
                                </p>
                                <p>
                                    <a href="#!">link 3</a>
                                </p>
                                <p>
                                    <a href="#!">link 4</a>
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#!">Your Account</a>
                                </p>
                                <p>
                                    <a href="#!">Become an Affiliate</a>
                                </p>
                                <p>
                                    <a href="#!">Shipping Rates</a>
                                </p>
                                <p>
                                    <a href="#!">Help</a>
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">
                                    Contact
                                </h6>
                                <p>
                                    <i className="fas fa-home mr-3" /> New York,
                                    NY 10012, US
                                </p>
                                <p>
                                    <i className="fas fa-envelope mr-3" />{" "}
                                    info@gmail.com
                                </p>
                                <p>
                                    <i className="fas fa-phone mr-3" /> + 01 234
                                    567 88
                                </p>
                                <p>
                                    <i className="fas fa-print mr-3" /> + 01 234
                                    567 89
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row d-flex align-items-center">
                            <div className="col-md-7 col-lg-8">
                                <p className="text-center text-md-left">
                                    © 2020 Copyright:
                                    <a href="#">
                                        <strong> localHost</strong>
                                    </a>
                                </p>
                            </div>
                            <div className="col-md-5 col-lg-4 ml-lg-0">
                                <div className="text-center text-md-right">
                                    <ul className="list-unstyled list-inline">
                                        <li
                                            style={{
                                                position: "relative",
                                                zIndex: 1,
                                                display: "inline-block",
                                                padding: 0,
                                                margin: 10,
                                                overflow: "hidden",
                                                verticalAlign: "middle",
                                                cursor: "pointer",
                                                borderRadius: "50%",
                                                transition:
                                                    "all 0.2s ease-in-out"
                                            }}
                                            className="list-inline-item"
                                        >
                                            <a className="btn-floating btn-sm rgba-white-slight mx-1">
                                                <i
                                                    style={{
                                                        fontSize: ".96154rem",
                                                        lineHeight: "36.15385px"
                                                    }}
                                                    className="fab fa-facebook-f"
                                                />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="btn-floating btn-sm rgba-white-slight mx-1">
                                                <i className="fab fa-twitter" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="btn-floating btn-sm rgba-white-slight mx-1">
                                                <i className="fab fa-google-plus-g" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="btn-floating btn-sm rgba-white-slight mx-1">
                                                <i className="fab fa-linkedin-in" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
