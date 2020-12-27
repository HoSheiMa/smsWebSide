import React, { Component } from "react";
import Chart from "chart.js";
export default class Main extends Component {
    state = {
        info: null,
        smsSendedToday: 0,
        logintoday: 0,
        refreshData: null
    };
    getInfo = () => {
        fetch("/admin/dashbourd/get/home/info", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            method: "post"
        }).then(async d => {
            d = await d.json();
            this.setState(
                {
                    info: d
                },
                () => this.handlingData()
            );
        });
    };

    SortTime = timetemps => {
        for (var i in timetemps) {
            timetemps[i] = Date.parse(timetemps[i]);
        }
        return timetemps.sort();
    };
    returnToData = t => {
        for (var i in t) {
            var d = new Date(t[i]);
            t[i] = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
        }
        return t;
    };
    GetTimeData = (sortedKeys, Keys) => {
        var Data = [];
        var Label = [];
        for (var i in sortedKeys) {
            var d = new Date(sortedKeys[i]);
            var date =
                d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
            console.log(date, Keys[date]);
            Data.push(Keys[date] ? Keys[date] : 0);
            Label.push(date);
        }
        return {
            Data: Data,
            Label: Label
        };
    };
    handlingData = () => {
        var logintoday = JSON.parse(this.state.info[0]["value"]);

        var smsSendedToday = JSON.parse(this.state.info[1]["value"]);

        this.setState({
            smsSendedToday: smsSendedToday[
                Object.keys(smsSendedToday)[
                    Object.keys(smsSendedToday).length - 1
                ]
            ]
                ? smsSendedToday[
                      Object.keys(smsSendedToday)[
                          Object.keys(smsSendedToday).length - 1
                      ]
                  ]
                : 0,
            logintoday: logintoday[
                Object.keys(logintoday)[Object.keys(logintoday).length - 1]
            ]
                ? logintoday[
                      Object.keys(logintoday)[
                          Object.keys(logintoday).length - 1
                      ]
                  ]
                : 0
        });

        var logintodayKeys = Object.keys(logintoday);
        var sortedlogintodayKeys = this.SortTime(logintodayKeys);

        var smsSendedTodayKeys = Object.keys(smsSendedToday);
        var sortedsmsSendedTodayKeys = this.SortTime(smsSendedTodayKeys);

        var allLabels = [
            ...new Set([...sortedlogintodayKeys, ...sortedsmsSendedTodayKeys])
        ];
        allLabels = this.returnToData(allLabels);
        allLabels = this.SortTime(allLabels);
        allLabels = this.returnToData(allLabels);

        var { Data: LoginData, Label: LoginLabel } = this.GetTimeData(
            allLabels,
            logintoday
        );

        var { Data: SMSData, Label: SMSLabel } = this.GetTimeData(
            allLabels,
            smsSendedToday
        );
        // just show last 5 days ago
        allLabels.splice(0, allLabels.length - 5);
        LoginData.splice(0, LoginData.length - 5);
        SMSData.splice(0, SMSData.length - 5);

        this.ShowData(allLabels, [LoginData, SMSData]);
    };

    ShowData = (labels, data) => {
        var myLineChart = new Chart(document.querySelector("#showViews"), {
            type: "line",
            data: {
                labels: labels,

                datasets: [
                    {
                        data: data[0],
                        label: "user login",
                        borderColor: "#3e95cd",

                        fill: true
                    },
                    {
                        data: data[1],
                        label: "sms sended",
                        borderColor: "#fff444",

                        fill: true
                    }
                ]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    text: "Logins and sms today"
                },
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)"
                            }
                        }
                    ]
                }
            }
        });
    };

    async componentDidMount() {
        await this.getInfo();
        this.state.refreshData = setInterval(async () => {
            await this.getInfo();
        }, 60000);
    }
    componentWillUnmount() {
        clearInterval(this.state.refreshData);
    }

    render() {
        return (
            <div
                style={{
                    width: "100vw"
                }}
            >
                {" "}
                <div
                    class="row "
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
                        className="col-12 col-lg-8"
                        style={{
                            height: 320,
                            padding: 4,
                            background: "#fff",
                            borderRadius: "14px",
                            boxShadow: "0 0 37px rgba(8,21,66,0.05)",
                            margin: 4,
                            marginBottom: 12
                        }}
                    >
                        <canvas
                            style={{
                                display: "block",
                                background: "#fff",
                                width: "100%",
                                height: "100%",
                                borderRadius: "14px"
                            }}
                            id="showViews"
                        ></canvas>
                    </div>
                    <div
                        class="card col-12 col-lg-3"
                        style={{
                            width: "18rem",
                            padding: 4,
                            background: "#fff",
                            borderRadius: "14px",
                            boxShadow: "0 0 37px rgba(8,21,66,0.05)",
                            marginBottom: 12,
                            margin: 4,

                            border: "none",
                            height: 200,
                            maxHeight: 300
                        }}
                    >
                        <div class="card-body">
                            <h5 class="card-title">
                                {this.state.smsSendedToday} / today
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                                SMS sended
                            </h6>
                            <p class="card-text">
                                How many SMS sended today from the users in the
                                website
                            </p>
                        </div>
                    </div>
                    <div
                        class="card col-12 col-lg-3"
                        style={{
                            width: "18rem",
                            padding: 4,
                            background: "#fff",
                            borderRadius: "14px",
                            boxShadow: "0 0 37px rgba(8,21,66,0.05)",
                            marginBottom: 12,
                            height: 200,
                            margin: 4,

                            maxHeight: 300,
                            border: "none"
                        }}
                    >
                        <div class="card-body">
                            <h5 class="card-title">
                                {this.state.logintoday} / today
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                                users login
                            </h6>
                            <p class="card-text">
                                How many users log in today from the users in
                                the website
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
