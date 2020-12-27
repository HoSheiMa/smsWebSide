import React, { Component } from "react";

export default class Footer extends Component {
    state = {
        Webtitle: "",
        fb: "",
        tw: "",
        gplus: "",
        ins: "",
        lin: "",
        email: "",
        fax: "",
        phone: "",
        address: "",
        desc: "",
        side1: [],
        side2: [],
        newSizeOneTitle: "",
        newSizeOneURL: "",
        newSizeTwoTitle: "",
        newSizeTwoURL: "",
        success: null,
    };
    Update=  () => {
        
        fetch("/admin/dashbourd/Footer/post", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")
            },
            method: "post",
            body: JSON.stringify({FooterData: this.state})
        }).then(async d => {
            d = await d.json();
            this.setState({ ...d });
        });
    }

    componentWillMount() {
        fetch("/Home/FooterData", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")
            },
            method: "post"
        }).then(async d => {
            d = await d.json();
            this.setState({ ...d });
        });
    }

    render() {
        return (
            <div
                class="row justify-content-center"
                style={{
                    width: "100vw"
                }}
            >
                <div
                    style={{
                        marginTop: 35,
                        width: "70%"
                    }}
                >
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                onChange={d =>
                                    this.setState({ email: d.target.value })
                                }
                                value={this.state.email}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Facebook</label>
                            <input
                                onChange={d =>
                                    this.setState({ fb: d.target.value })
                                }
                                value={this.state.fb}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Twitter</label>
                            <input
                                onChange={d =>
                                    this.setState({ tw: d.target.value })
                                }
                                value={this.state.tw}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Google Plus</label>
                            <input
                                onChange={d =>
                                    this.setState({ gplus: d.target.value })
                                }
                                value={this.state.gplus}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Instigram</label>
                            <input
                                onChange={d =>
                                    this.setState({ ins: d.target.value })
                                }
                                value={this.state.ins}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Linkedin</label>
                            <input
                                onChange={d =>
                                    this.setState({ lin: d.target.value })
                                }
                                value={this.state.lin}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Fax</label>
                            <input
                                onChange={d =>
                                    this.setState({ fax: d.target.value })
                                }
                                value={this.state.fax}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                onChange={d =>
                                    this.setState({ phone: d.target.value })
                                }
                                value={this.state.phone}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>address</label>
                            <input
                                onChange={d =>
                                    this.setState({ address: d.target.value })
                                }
                                value={this.state.address}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>description</label>
                            <input
                                onChange={d =>
                                    this.setState({ desc: d.target.value })
                                }
                                value={this.state.desc}
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div
                            style={{
                                border: "1px solid #00000010",
                                padding: 14,
                                marginTop: 35,
                                borderRadius: 8,
                                
                            overflow: "scroll"
                            }}
                            className="form-group"
                        >
                            <label>First Side</label>
                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">URL</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.side1.map((d, i) => {
                                        return (
                                            <tr>
                                                <th scope="row">{i}</th>
                                                <td>{d[0]}</td>
                                                <td>{d[1]}</td>
                                                <td>
                                                    <span
                                                        onClick={() => {
                                                            $.confirm({
                                                                title:
                                                                    "Confirm!",
                                                                content:
                                                                    "are You want to delete it ?",
                                                                buttons: {
                                                                    confirm: () => {
                                                                        var side1 = this
                                                                            .state
                                                                            .side1;
                                                                        side1.splice(
                                                                                i
                                                                                ,
                                                                            1
                                                                        );
                                                                        this.setState(
                                                                            {
                                                                                side1: side1
                                                                            },
                                                                            () => {
                                                                                $.alert(
                                                                                    "Confirmed!"
                                                                                );
                                                                            }
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
                            <div class="row justify-content-center p-1 m-0">
                                <div
                                    class="row  p-0 m-0 justify-content-center"
                                    style={{
                                        width: "80%"
                                    }}
                                >
                                    <input
                                        onChange={d =>
                                            this.setState({
                                                newSizeOneTitle: d.target.value
                                            })
                                        }
                                        value={this.state.newSizeOneTitle}
                                        class="mr-1  mb-2  form-control col-12 col-sm-4"
                                        placeholder="Title"
                                    />
                                    <input
                                        onChange={d =>
                                            this.setState({
                                                newSizeOneURL: d.target.value
                                            })
                                        }
                                        value={this.state.newSizeOneURL}
                                        class="mr-1  mb-2  form-control col-12 col-sm-3 "
                                        placeholder="URL"
                                    />
                                    <button
                                        onClick={() => {
                                            var side1 = this.state.side1;
                                            side1.push([
                                                this.state.newSizeOneTitle,
                                                this.state.newSizeOneURL
                                            ]);
                                            this.setState({
                                                side1: side1
                                            });
                                        }}
                                        type="button"
                                        className="btn btn-primary mr-1 mb-2  col-12 col-sm-4"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                        style={{
                            border: "1px solid #00000010",
                            padding: 14,
                            marginTop: 35,
                            borderRadius: 8,
                            overflow: "scroll"
                        }}
                        className="form-group"
                    >
                        <label>sec Side</label>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">URL</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.side2.map((d, i) => {
                                    return (
                                        <tr>
                                            <th scope="row">{i}</th>
                                            <td>{d[0]}</td>
                                            <td>{d[1]}</td>
                                            <td>
                                                <span
                                                    onClick={() => {
                                                        $.confirm({
                                                            title:
                                                                "Confirm!",
                                                            content:
                                                                "are You want to delete it ?",
                                                            buttons: {
                                                                confirm: () => {
                                                                    var side2 = this
                                                                        .state
                                                                        .side2;
                                                                    side2.splice(
                                                                            i
                                                                            ,
                                                                        1
                                                                    );
                                                                    this.setState(
                                                                        {
                                                                            side2: side2
                                                                        },
                                                                        () => {
                                                                            $.alert(
                                                                                "Confirmed!"
                                                                            );
                                                                        }
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
                        <div class="row justify-content-center p-1 m-0">
                            <div
                                class="row  p-0 m-0 justify-content-center"
                                style={{
                                    width: "80%"
                                }}
                            >
                                <input
                                    onChange={d =>
                                        this.setState({
                                            newSizeTwoTitle: d.target.value
                                        })
                                    }
                                    value={this.state.newSizeTwoTitle}
                                    class="mr-1 mb-2 form-control col-12 col-sm-4 "
                                    placeholder="Title"
                                />
                                <input
                                    onChange={d =>
                                        this.setState({
                                            newSizeTwoURL: d.target.value
                                        })
                                    }
                                    value={this.state.newSizeTwoURL}
                                    class="mr-1 mb-2  form-control col-12 col-sm-4 "
                                    placeholder="URL"
                                />
                                <button
                                    onClick={() => {
                                        var side2 = this.state.side2;
                                        side2.push([
                                            this.state.newSizeTwoTitle,
                                            this.state.newSizeTwoURL
                                        ]);
                                        this.setState({
                                            side2: side2
                                        });
                                    }}
                                    type="button"
                                    className="btn btn-primary mr-1 mb-2 col-12 col-sm-3"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
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
                   
                        <button onClick={() => this.Update()} type="button" className="btn btn-primary btn-lg btn-block">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
