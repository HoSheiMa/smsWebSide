import React, { Component } from "react";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";

import CodePhone from "./../../CodePhone";
function AlertMui(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
import {
    eraseCookie,
    getCookie,
    setCookie
} from "./../../../../functions/Cookeis";
import { translate } from "./../../../json/translate";

export default class SendSMS extends Component {
    state = {
        Loading: false,
        success: false,
        error: false,
        numberCode: "44",
        number: null,
        text: null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    componentWillMount() {
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        this.state.lang = getCookie("lang");
    }
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

    send = () => {
        var n = this.state.number;
        var c = this.state.numberCode;
        var t = this.state.text;

        if (!this.state.Loading && n && t && c) {
            n = c + n; // mix two value to be a real phone number
            // send
            this.setState({
                Loading: true,
                error: false,
                success: false
            });

            fetch("/sendsms", {
                method: "POST",
                body: JSON.stringify({
                    n: n,
                    t: t,
                    timeZone: this.state.timezone
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content")
                }
            })
                .then(d => {
                    if (d.status == 404) {
                        this.setState({
                            Loading: false,
                            error: true,
                            success: false
                        });
                        return;
                    }
                    this.setState({
                        Loading: false,
                        error: false,
                        success: true
                    });
                })
                .catch(() => {
                    this.setState({
                        Loading: false,
                        error: true,
                        success: false
                    });
                });
        }
    };
    render() {
        return (
            <div
                className="row  justify-content-center align-items-center p-0 m-0"
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#f7f7f7"
                }}
            >
                <Alert
                    style={{
                        borderRadius: 12
                    }}
                    severity="info"
                    className="col-sm-12 col-md-12 col-lg-10 m-3 justify-content-center text-center"
                >
                    {translate[this.state.lang].SendDesc}
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
                            label={translate[this.state.lang].pn}
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
                        label={translate[this.state.lang].message}
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
                            <span className="text-white">
                                {translate[this.state.lang].SendNow}
                            </span>
                        )}
                    </Button>

                    <Snackbar
                        open={this.state.success}
                        onClose={this.closeSuccess}
                        autoHideDuration={5000}
                    >
                        <AlertMui severity="success">
                            {translate[this.state.lang].success}
                        </AlertMui>
                    </Snackbar>
                    <Snackbar
                        open={this.state.error}
                        onClose={this.closeError}
                        autoHideDuration={6000}
                    >
                        <AlertMui severity="error">
                            {translate[this.state.lang].fail}
                        </AlertMui>
                    </Snackbar>
                </div>
            </div>
        );
    }
}
