import React, { Component } from "react";

export default class AddnewUser extends Component {
    state = {
        success: null,
        fname: "",
        email: "",
        pass: "",
        number: "",
        block: "false"
    };
    postData = () => {
        if (this.state.fname && this.state.email)
            fetch("/admin/dashbourd/get/users/add", {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                body: JSON.stringify({ ...this.state, id: this.props.id }), // body data type must match "Content-Type" header
                method: "post"
            }).then(async d => {
                d = await d.json();
                this.setState(d);
                setTimeout(() => {
                    this.setState({
                        success: null
                    });
                    this.props.GoToPage("Users");
                }, 2000);
            });
    };

    render() {
        return (
            <div class="container">
                <div class="row p-3">
                    <div class="col-12 col-lg-4">
                        <img
                            src="./assets/man-300x300.png"
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
                            <p className="h4 mb-4">User Info</p>
                            <div className="form-row mb-4">
                                <div className="col">
                                    {/* First name */}
                                    <input
                                        value={this.state.fname}
                                        type="text"
                                        onChange={d => {
                                            this.setState({
                                                fname: d.target.value
                                            });
                                        }}
                                        id="defaultRegisterFormFirstName"
                                        className="form-control"
                                        placeholder="Full name"
                                    />
                                </div>
                            </div>
                            {/* E-mail */}
                            <input
                                type="email"
                                onChange={d => {
                                    this.setState({
                                        email: d.target.value
                                    });
                                }}
                                value={this.state.email}
                                id="defaultRegisterFormEmail"
                                className="form-control mb-4"
                                placeholder="E-mail"
                            />
                            {/* Password */}
                            <input
                                value={this.state.pass}
                                onChange={d => {
                                    this.setState({
                                        pass: d.target.value
                                    });
                                }}
                                type="password"
                                id="defaultRegisterFormPassword"
                                className="form-control"
                                placeholder="Password"
                                aria-describedby="defaultRegisterFormPasswordHelpBlock"
                            />
                            <small
                                id="defaultRegisterFormPasswordHelpBlock"
                                className="form-text text-muted mb-4"
                            >
                                At least 8 characters and 1 digit
                            </small>
                            {/* Phone number */}
                            <input
                                onChange={d => {
                                    console.log("sddd");
                                    this.setState({
                                        number: d.target.value
                                    });
                                }}
                                type="text"
                                value={this.state.number}
                                className="form-control"
                                placeholder="Phone number"
                            />
                            <select
                                onChange={d => {
                                    this.setState({
                                        block: d.target.value
                                    });
                                }}
                                class="form-control mt-3"
                            >
                                <option value="false">No block</option>
                                <option value="true">Block</option>
                            </select>
                            <small
                                id="defaultRegisterFormPhoneHelpBlock"
                                className="form-text text-muted mb-4"
                            >
                                Optional - for two step authentication
                            </small>

                            {/* Sign up button */}
                            {this.state.success === null ? (
                                <div></div>
                            ) : this.state.success === false ? (
                                <div
                                    class="alert alert-danger m-1"
                                    role="alert"
                                >
                                    Fail!
                                </div>
                            ) : (
                                <div
                                    class="alert alert-success m-1"
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
                                Add
                            </button>

                            {/* Terms of service */}
                            <p>
                                By clicking you agree to our
                                <a href target="_blank">
                                    terms of service
                                </a>
                            </p>
                        </form>
                        {/* Default form register */}
                    </div>
                </div>
            </div>
        );
    }
}
