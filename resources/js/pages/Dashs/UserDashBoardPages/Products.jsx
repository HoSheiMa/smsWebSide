import React, { Component } from "react";

export default class Products extends Component {
    state = {
        Products: []
    };
    componentWillMount() {
        fetch("/get/products", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
        }).then(async d => {
            d = await d.json();
            this.setState({
                Products: d
            });
        });
    }

    render() {
        return (
            <div class="row p-3 m-0 justify-content-center">
                {/* Card */}
                {this.state.Products.map(d => {
                    return (
                        <div
                            className="col col-sm-3 card border-0 promoting-card"
                            style={{
                                boxShadow: "0 0 37px rgba(8,21,66,0.05)",
                                borderRadius: 8,
                                minHeight: 600,
                                margin: 8
                            }}
                        >
                            {/* Card content */}
                            <div className="card-body d-flex flex-row">
                                {/* Content */}
                                <div>
                                    {/* Title */}
                                    <h4 className="card-title font-weight-bold mb-2">
                                        {d["title"]}
                                    </h4>
                                    {/* Subtitle */}
                                    <p className="card-text">{d["num"]} SMS</p>
                                </div>
                            </div>
                            {/* Card image */}
                            <div className="view overlay">
                                <img
                                    className="card-img-top rounded-0"
                                    src="./assets/start_53876-25533.jpg"
                                    alt="Card image cap"
                                />
                                <a href="#!">
                                    <div className="mask rgba-white-slight" />
                                </a>
                            </div>
                            {/* Card content */}
                            <div className="card-body">
                                <div className="collapse-content">
                                    {/* Text */}
                                    <p
                                        className="card-text "
                                        id="collapseContent"
                                    >
                                        {d["desc"]}
                                    </p>
                                    {/* Button */}
                                    <a
                                        className="btn btn-outline-success red-text p-1 my-1 mr-0 mml-1 "
                                        data-toggle="collapse"
                                        href="#collapseContent"
                                        aria-expanded="false"
                                        aria-controls="collapseContent"
                                        onClick={() => {
                                            this.props.GoToPage("Contect Us", {
                                                message:
                                                    "Hi, i want to buy your Promotion offer, offer that name is " +
                                                    d["title"] +
                                                    " SMS, ..."
                                            });
                                        }}
                                    >
                                        Buy now
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                    {
                        /* Card */
                    }
                })}
            </div>
        );
    }
}
