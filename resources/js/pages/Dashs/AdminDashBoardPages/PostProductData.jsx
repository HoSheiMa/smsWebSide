import React, { Component } from "react";

export default class PostProductData extends Component {
    state = {
        title: this.props.title ? this.props.title : "",
        num: this.props.num ? this.props.num : 1000,
        id: this.props.id ? this.props.id : null,
        desc: this.props.desc ? this.props.desc : "",
        success: null
    };
    postData = () => {
        fetch("/admin/dashbourd/get/Product/post", {
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
    };
    render() {
        return (
            <div class="container">
                <div class="row p-3">
                    <div class="col-12 col-lg-4">
                        <img
                            src="./assets/start_53876-25533.jpg"
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
                            <p className="h4 mb-4">Product</p>

                            <div className="form-row  mt-4 mb-4">
                                <div className="col">
                                    {/* First name */}
                                    <input
                                        value={this.state.title}
                                        type="text"
                                        onChange={d => {
                                            this.setState({
                                                title: d.target.value
                                            });
                                        }}
                                        className="form-control"
                                        placeholder="Title"
                                    />
                                </div>
                            </div>
                            <div className="form-row  mt-4 mb-4">
                                <div className="col">
                                    {/* First name */}
                                    <textarea
                                        value={this.state.desc}
                                        type="text"
                                        onChange={d => {
                                            this.setState({
                                                desc: d.target.value
                                            });
                                        }}
                                        className="form-control"
                                        placeholder="description"
                                    />
                                </div>
                            </div>
                            {/* E-mail */}
                            <input
                                type="number"
                                onChange={d => {
                                    this.setState({
                                        num: d.target.value
                                    });
                                }}
                                value={this.state.num}
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
                                {this.props.id ? "Update" : "Add"}
                            </button>
                        </form>
                        {/* Default form register */}
                    </div>
                </div>
            </div>
        );
    }
}
