import React, { Component } from "react";
import Chart from "chart.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NavigationIcon from "@material-ui/icons/Navigation";
import {
    eraseCookie,
    getCookie,
    setCookie
} from "./../../../../functions/Cookeis";
import { translate } from "./../../../json/translate";

export default class Main extends Component {
    componentWillMount() {
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        this.state.lang = getCookie("lang");
    }
    state = {
        today: 0,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    async componentDidMount() {
        await this.getSmsRemains();
    }

    getSmsRemains = () => {
        fetch("/smsRemains", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")
            },
            body: JSON.stringify(this.state), // body data type must match "Content-Type" header
            method: "post"
        }).then(async d => {
            d = await d.json();
            this.setState(d);
        });
    };
    render() {
        return (
            <div>
                <div
                    style={{
                        padding: 15,
                        background: "#f7f7f7",
                        minHeight: "100vh",
                        maxWidth: "100vw",
                        margin: 0
                        // justifyContent: "space-evenly    "
                    }}
                >
                    <div
                        class="card"
                        style={{
                            width: "18rem",
                            padding: 4,
                            background: "#fff",
                            borderRadius: "14px",
                            boxShadow: "0 0 37px rgba(8,21,66,0.05)",
                            margin: 12,
                            border: "none"
                        }}
                    >
                        <div class="card-body">
                            <h5 class="card-title">{this.state.today} / 5</h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                                {translate[this.state.lang].SMSRemains}
                            </h6>
                            <p class="card-text">
                                {translate[this.state.lang].FreeSendDesc}
                            </p>
                            <a
                                onClick={() => {
                                    this.props.GoToPage("Send SMS");
                                }}
                                href="#"
                                class="card-link"
                            >
                                {translate[this.state.lang].SendNow}
                            </a>
                        </div>
                    </div>
                </div>

                <Fab
                    onClick={() => this.props.GoToPage("Send SMS")}
                    style={{
                        position: "fixed",
                        right: "2vw",
                        bottom: "2vh"
                    }}
                    variant="extended"
                    color="primary"
                    aria-label="add"
                    className="m-1"
                >
                    <NavigationIcon
                        style={{
                            fill: "#fff"
                        }}
                        className="m-1"
                    />
                    <span
                        style={{
                            color: "#fff"
                        }}
                    >
                        {translate[this.state.lang].SendNow}
                    </span>
                </Fab>
            </div>
        );
    }
}
