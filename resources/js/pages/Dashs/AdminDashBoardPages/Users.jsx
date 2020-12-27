import React, { Component } from "react";

export default class Users extends Component {
    state = {
        users: [],
        search: "",
        pageIndex: 0,
        SearchVisiale: false
    };
    componentDidMount() {
        this.getUsers();
    }
    getUsers = () => {
        fetch("/admin/dashbourd/get/users/info", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify({
                index: this.state.pageIndex,
                search: this.state.search
            }),
            method: "post"
        }).then(async d => {
            d = await d.json();
            this.setState({
                users: d
            });
        });
    };

    deleteUser = id => {
        fetch("/admin/dashbourd/get/users/delete/", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify({
                id: id
            }),
            method: "post"
        }).then(async d => {
            this.getUsers();
        });
    };
    render() {
        return (
            <div
                onClick={() => this.props.GoToPage("AddNewUser")}
                class=" row p-3 m-0 justify-content-center"
                style={{
                    background: "rgb(247, 247, 247)"
                }}
            >
                <div class="col-12 text-right m-2 mr-5 ">
                    <div class="form-group d-flex flex-column align-items-center">
                        <label
                            onClick={() => {
                                this.setState({
                                    SearchVisiale: !this.state.SearchVisiale
                                });
                            }}
                            for="exampleInputEmail1"
                        >
                            Search
                        </label>
                        {this.state.SearchVisiale ? (
                            <input
                                style={{
                                    width: " 80%"
                                }}
                                type="text"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Search"
                                onChange={d =>
                                    this.setState(
                                        {
                                            pageIndex: 0,
                                            search: d.target.value
                                        },
                                        () => this.getUsers()
                                    )
                                }
                            />
                        ) : (
                            <div></div>
                        )}
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
                                <th scope="col">Full name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Number</th>
                                <th scope="col">block</th>
                                <th scope="col">admin</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((d, i) => {
                                return (
                                    <tr>
                                        <th scope="row">{d["id"]}</th>
                                        <td>{d["fname"]}</td>
                                        <td>{d["email"]}</td>
                                        <td>{d["number"]}</td>
                                        <td>
                                            {d["block"] == "true" ? (
                                                <p class="text-danger">yes</p>
                                            ) : (
                                                <p class="text-success">no</p>
                                            )}{" "}
                                        </td>
                                        <td>
                                            {d["isAdmin"] == "false" ? (
                                                <p class="text-success">no</p>
                                            ) : (
                                                <p class="text-danger">yes</p>
                                            )}{" "}
                                        </td>
                                        <td class="row">
                                            <span
                                                onClick={() => {
                                                    this.props.GoToPage(
                                                        "UserEdit",
                                                        { id: d["id"] }
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
                                                                this.deleteUser(
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
                <div
                    class=" col-12 row d-flex m-2 justify-content-center btn-group"
                    role="group"
                    aria-label="Basic example"
                >
                    <button
                        style={{
                            maxWidth: 60,
                            textAlign: "center"
                        }}
                        onClick={() => {
                            this.setState(
                                {
                                    pageIndex:
                                        this.state.pageIndex == 0
                                            ? this.state.pageIndex
                                            : this.state.pageIndex - 1
                                },
                                () => this.getUsers()
                            );
                        }}
                        type="button"
                        class="btn btn-secondary"
                    >
                        Back
                    </button>
                    <button
                        style={{
                            maxWidth: 60,

                            textAlign: "center"
                        }}
                        onClick={() => {
                            this.setState(
                                {
                                    pageIndex: this.state.pageIndex + 1
                                },
                                () => this.getUsers()
                            );
                        }}
                        type="button"
                        class="btn btn-secondary"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}
