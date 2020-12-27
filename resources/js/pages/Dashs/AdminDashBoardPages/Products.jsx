import React, { Component } from "react";

export default class Products extends Component {
    state = {
        Products: []
    };
    componentWillMount() {
        this.getProducts();
    }

    getProducts = async () => {
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
    };
    delete = id => {
        fetch("/admin/dashbourd/get/Product/delete", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify({
                id: id
            }),
            method: "post"
        }).then(async d => {
            this.getProducts();
        });
    };
    render() {
        return (
            <div>
                <div
                    class=" row p-3 m-0 justify-content-center"
                    style={{
                        background: "rgb(247, 247, 247)"
                    }}
                >
                    <div class="col-12  m-2 row justify-content-end p-2 pr-5">
                        <div
                            onClick={() =>
                                this.props.GoToPage("PostProductData")
                            }
                            class="btn btn-info"
                        >
                            +Add
                        </div>
                    </div>
                    <div
                        class="card col-11"
                        style={{
                            overflow: "scroll",
                            width: "90%",
                            height: "fit-content",
                            padding: 4,
                            background: "#fff",
                            borderRadius: "14px",
                            boxShadow: "0 0 37px rgba(8,21,66,0.05)",
                            border: "none"
                        }}
                    >
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">#id</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Desc</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Products.map((d, i) => {
                                    return (
                                        <tr>
                                            <th scope="row">{d["id"]}</th>
                                            <td>{d["title"]}</td>
                                            <td>{d["num"]}</td>
                                            <td>{d["desc"]}</td>

                                            <td class="row">
                                                <span
                                                    onClick={() => {
                                                        this.props.GoToPage(
                                                            "PostProductData",
                                                            { ...d }
                                                        );
                                                    }}
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                    class="text-info material-icons mr-2"
                                                >
                                                    edit
                                                </span>
                                                <span
                                                    onClick={() => {
                                                        $.confirm({
                                                            title: "Confirm!",
                                                            content:
                                                                "are You want to delete it ?",
                                                            buttons: {
                                                                confirm: () => {
                                                                    this.delete(
                                                                        d["id"]
                                                                    );
                                                                    $.alert(
                                                                        "Confirmed!"
                                                                    );
                                                                },
                                                                cancel: function() {
                                                                    $.alert(
                                                                        "Canceled!"
                                                                    );
                                                                }
                                                            }
                                                        });
                                                    }}
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                    class="text-danger material-icons mr-2"
                                                >
                                                    delete
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
