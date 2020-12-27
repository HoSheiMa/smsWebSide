import React, { Component } from "react";
import CodePhone from "../../CodePhone";

export default class MultiSender extends Component {
    state = {
        code: null,
        message: "",
        number: 100,
        showCodesNumberAvailible: null,
        success: null,
        codes: []
    };
    componentDidMount() {
        fetch("/admin/dashbourd/Top/UsersCodes", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
        }).then(async d => {
            d = await d.json();
            this.setState({
                codes: d
            });
            setTimeout(() => {
                this.setState({
                    success: null
                });
            }, 2000);
        });
    }
    postData = () => {
        fetch("/admin/dashbourd/Top/multiSend", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify(this.state)
        })
            .then(async d => {
                d = await d.json();
                this.setState({
                    codes: d,
                    success: true
                });
                setTimeout(() => {
                    this.setState({
                        success: null
                    });
                }, 2000);
            })
            .catch(() => {
                this.setState({
                    success: false
                });
                setTimeout(() => {
                    this.setState({
                        success: null
                    });
                }, 2000);
            });
    };
    handleCode = d => {
        var n = 0;
        var c = "+" + d;
        console.log("start", c);

        var keys = Object.keys(this.state.codes);

        for (var i in keys) {
            if (this.state.codes[keys[i]]["dial_code"] == c) {
                console.log("found", this.state.codes[keys[i]]["dial_code"], c);
                n = this.state.codes[keys[i]]["numberOfUsers"];
            }
        }

        this.setState({
            code: d,
            showCodesNumberAvailible: n,
            number: n
        });
    };
    render() {
        return (
            <div class="container">
                <div class="row p-3">
                    <div class="col-12 col-lg-4">
                        <img
                            src="./assets/unnamed (1).png"
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
                            <p className="h4 mb-4">Mutli Sender</p>
                            <CodePhone
                                classs={"col-lg-12"}
                                setCode={d => this.handleCode(d)}
                            />
                            {this.state.showCodesNumberAvailible === null ? (
                                <div></div>
                            ) : this.state.showCodesNumberAvailible > 0 ? (
                                <div
                                    class="alert alert-info mt-4 mb-4"
                                    role="alert"
                                >
                                    number Availible :{" "}
                                    {this.state.showCodesNumberAvailible}
                                </div>
                            ) : (
                                <div
                                    class="alert alert-danger mt-4 mb-4"
                                    role="alert"
                                >
                                    number Availible :{" "}
                                    {this.state.showCodesNumberAvailible}
                                </div>
                            )}
                            <div className="form-row  mt-4 mb-4">
                                <div className="col">
                                    {/* First name */}
                                    <textarea
                                        value={this.state.message}
                                        type="text"
                                        onChange={d => {
                                            this.setState({
                                                message: d.target.value
                                            });
                                        }}
                                        className="form-control"
                                        placeholder="message"
                                    />
                                </div>
                            </div>
                            {/* E-mail */}
                            <input
                                type="number"
                                min={1}
                                max={this.state.showCodesNumberAvailible}
                                onChange={d => {
                                    this.setState({
                                        number: d.target.value
                                    });
                                }}
                                value={this.state.number}
                                className="form-control mb-4"
                                placeholder="numner of Messages"
                            />
                            {/* Password */}

                            {/* Sign up button */}
                            {this.state.success === null ? (
                                <div></div>
                            ) : this.state.success === false ? (
                                <div
                                    class="alert alert-danger m-2"
                                    role="alert"
                                >
                                    Fail!
                                </div>
                            ) : (
                                <div
                                    class="alert alert-success m-2"
                                    role="alert"
                                >
                                    Success
                                </div>
                            )}

                            <button
                                class="btn btn-info my-4 btn-block"
                                onClick={this.postData}
                                type="button"
                            >
                                Send
                            </button>
                        </form>
                        {/* Default form register */}
                    </div>
                </div>
            </div>
        );
    }
}
