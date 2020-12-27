import React, { Component } from "react";
import CheckCode from "./Register/CheckCode";
import Registion from "./Register/Registion";
import { translate } from "../json/translate";
import { eraseCookie, getCookie, setCookie } from "./../../functions/Cookeis";

export default class Register extends Component {
    state = {
        CheckNumberCode: false,
        PageId: "id" + Math.floor(Math.random() * 412412412414141222),
        fname: null,
        email: null,
        numCode: null,
        number: null,
        pass: null,
        repass: null,
        code: null,
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
    rev = () => {
        this.setState({
            CheckNumberCode: !this.state.CheckNumberCode
        });
    };
    RegisterNow = (c, err, scc) => {
        fetch("./checkCode", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                n: this.state.numCode + this.state.number,
                PageId: this.state.PageId,
                code: c,
                fname: this.state.fname,
                email: this.state.email,
                pass: this.state.pass,
                timezone: this.state.timezone
            }), // body data type must match "Content-Type" header
            method: "post"
        })
            .then(async d => {
                d = await d.json();
                if (d.success) {
                    scc();
                } else {
                    err();
                }
            })
            .catch(() => err());
    };
    num = () => this.state.numCode + this.state.number;
    UpData = data => {
        console.log(data);
        this.setState(data);
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
                <div class="Register_right_side">
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
                {!this.state.CheckNumberCode ? (
                    <Registion
                        UpData={this.UpData}
                        rev={this.rev}
                        PageId={this.state.PageId}
                    />
                ) : (
                    <CheckCode
                        num={this.num}
                        RegisterNow={this.RegisterNow}
                        UpData={this.UpData}
                        rev={this.rev}
                        PageId={this.state.PageId}
                    />
                )}
            </div>
        );
    }
}
