import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";

import {
    eraseCookie,
    getCookie,
    setCookie
} from "./../../../../functions/Cookeis";
import { translate } from "./../../../json/translate";
export default class FreeSMS extends Component {
    state = {
        link: "Loading"
    };
    componentWillMount() {
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        this.state.lang = getCookie("lang");
    }
    componentDidMount() {
        fetch("/profile/ownlink", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            method: "post"
        }).then(async d => {
            d = await d.json();
            this.setState(d);
        });
    }

    render() {
        return (
            <div class="container d-flex flex-column pt-4 justify-content-center">
                <Alert
                    style={{
                        borderRadius: 12
                    }}
                    severity="info"
                    className="col-sm-12 col-md-12 col-lg-10 m-1 justify-content-center text-center"
                >
                    {translate[this.state.lang].earnDesc}
                </Alert>

                <Alert
                    style={{
                        borderRadius: 12
                    }}
                    severity="info"
                    className="col-sm-12 col-md-12 col-lg-10 m-1 justify-content-center text-center"
                >
                    {translate[this.state.lang].SendDesc}
                </Alert>

                <div class="form-group col-sm-12 col-md-12 col-lg-10 m-1 p-0 justify-content-center text-center">
                    <label for="exampleCheck1">
                        {translate[this.state.lang].link}
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        id="exampleCheck1"
                        readOnly
                        value={this.state.link}
                    />
                </div>
            </div>
        );
    }
}
