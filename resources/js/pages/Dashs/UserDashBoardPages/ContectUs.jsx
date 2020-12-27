import React, { Component } from "react";
import {
    eraseCookie,
    getCookie,
    setCookie
} from "./../../../../functions/Cookeis";
import { translate } from "./../../../json/translate";

export default class ContectUs extends Component {
    state = {
        success: null,
        name: null,
        email: null,
        message: this.props.message ? this.props.message : null,
        subject: 1
    };
    componentWillMount() {
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        this.state.lang = getCookie("lang");
    }
    send = () => {
        var name = this.state.name;
        var email = this.state.email;
        var message = this.state.message;
        var subject = this.state.subject;
        if (name && email && message && subject) {
            fetch("/contectUs/send", {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
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
        }
    };
    render() {
        return (
            <div class="container justify-content-center">
                {/* Default form contact */}
                <form
                    className="text-center border border-light p-5"
                    action="#!"
                >
                    <p className="h4 mb-4">
                        {translate[this.state.lang].ContectUs}
                    </p>
                    {/* Name */}
                    <input
                        onChange={d => {
                            this.setState({
                                name: d.target.value
                            });
                        }}
                        type="text"
                        id="defaultContactFormName"
                        className="form-control mb-4"
                        placeholder={translate[this.state.lang].fn}
                    />
                    {/* Email */}
                    <input
                        onChange={d => {
                            this.setState({
                                email: d.target.value
                            });
                        }}
                        type="email"
                        id="defaultContactFormEmail"
                        className="form-control mb-4"
                        placeholder={translate[this.state.lang].ea}
                    />
                    {/* Subject */}
                    <label>{translate[this.state.lang].subject}</label>
                    <select
                        onChange={d => {
                            this.setState({
                                subject: d.target.value
                            });
                        }}
                        className="browser-default custom-select mb-4"
                    >
                        <option value disabled>
                            {translate[this.state.lang].choose}
                        </option>
                        <option value={"Feedback"} selected>
                            {translate[this.state.lang].feedback}
                        </option>
                        <option value={"Report a bug"}>
                            {translate[this.state.lang].rab}
                        </option>
                        <option value={"Feature request"}>
                            {translate[this.state.lang].fq}
                        </option>
                    </select>
                    {/* Message */}
                    <div className="form-group">
                        <textarea
                            onChange={d => {
                                this.setState({
                                    message: d.target.value
                                });
                            }}
                            value={this.state.message}
                            className="form-control rounded-0"
                            id="exampleFormControlTextarea2"
                            rows={3}
                            placeholder={translate[this.state.lang].message}
                            defaultValue={""}
                        />
                    </div>
                    {/* message of req */}

                    {this.state.success === null ? (
                        <div></div>
                    ) : this.state.success === false ? (
                        <div class="alert alert-danger m-1" role="alert">
                            {translate[this.state.lang].fail}
                        </div>
                    ) : (
                        <div class="alert alert-success m-1" role="alert">
                            {translate[this.state.lang].success}
                        </div>
                    )}

                    {/* Send button */}
                    <button
                        onClick={this.send}
                        className="btn btn-info btn-block"
                        type="button"
                    >
                        {translate[this.state.lang].SendNow}
                    </button>
                </form>
                {/* Default form contact */}
            </div>
        );
    }
}
