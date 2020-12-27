import React, { Component } from "react";
import MenuAppBar from "./MenuAppBar";
import TemporaryDrawer from "./TemporaryDrawer";
import Main from "./AdminDashBoardPages/Main";
import Profile from "./UserDashBoardPages/profile";
import Users from "./AdminDashBoardPages/Users";
import UserEdit from "./AdminDashBoardPages/UserEdit";
import AddnewUser from "./AdminDashBoardPages/AddnewUser";
import Footer from "./AdminDashBoardPages/footer";
import MultiSender from "./AdminDashBoardPages/MultiSender";
import Products from "./AdminDashBoardPages/Products";
import PostProductData from "./AdminDashBoardPages/PostProductData";

export default class AdminDashBoard extends Component {
    state = {
        toggleDraw: null,
        index: 0,
        data: {}
    };

    getIndex = () => this.state.index;
    SetToggleDraw = fn => {
        this.state.toggleDraw = fn;
    };

    toggleDraw = d => {
        return this.state.toggleDraw
            ? this.state.toggleDraw(d)
            : (() => {
                  console.log("none");
              })();
    };

    Page = () => {
        var Index = <Main {...this.state.data} GoToPage={this.GoToPage} />;
        switch (this.state.index) {
            case 0:
                Index = <Main {...this.state.data} GoToPage={this.GoToPage} />;
                break;
            case 1:
                Index = (
                    <Profile {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            case 2:
                Index = <Users {...this.state.data} GoToPage={this.GoToPage} />;
                break;

            case 3:
                Index = (
                    <AddnewUser {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            case 4:
                Index = (
                    <Footer {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            case 5:
                Index = (
                    <MultiSender
                        {...this.state.data}
                        GoToPage={this.GoToPage}
                    />
                );
                break;
            case 6:
                Index = (
                    <Products {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            case 7:
                Index = (
                    <PostProductData
                        {...this.state.data}
                        GoToPage={this.GoToPage}
                    />
                );
                break;

            case 5000:
                Index = (
                    <UserEdit {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            default:
                break;
        }
        return Index;
    };
    GoToPage = (text, data = {}) => {
        switch (text) {
            case "Home":
                this.setState({
                    index: 0,
                    data: data
                });
                break;
            case "Profile":
                this.setState({
                    index: 1,
                    data: data
                });
                break;
            case "Users":
                this.setState({
                    index: 2,
                    data: data
                });
                break;

            case "Add User":
                this.setState({
                    index: 3,
                    data: data
                });
                break;
            case "Footer":
                this.setState({
                    index: 4,
                    data: data
                });
                break;
            case "Multi Sender":
                this.setState({
                    index: 5,
                    data: data
                });
                break;
            case "Products":
                this.setState({
                    index: 6,
                    data: data
                });
                break;
            case "PostProductData":
                this.setState({
                    index: 7,
                    data: data
                });
                break;
            case "UserEdit":
                this.setState({
                    index: 5000,
                    data: data
                });
                break;

            default:
                break;
        }
    };
    render() {
        return (
            <div
                style={{
                    width: "100vw"
                }}
            >
                {" "}
                <TemporaryDrawer
                    getIndex={this.getIndex}
                    SetToggleDraw={this.SetToggleDraw}
                    GoToPage={this.GoToPage}
                    Pages={[
                        "Home",
                        "Profile",
                        "Users",
                        "Add User",
                        "Footer",
                        "Multi Sender",
                        "Products"
                    ]}
                />
                <MenuAppBar
                    GoToPage={this.GoToPage}
                    toggleDraw={this.toggleDraw}
                />
                {this.Page()}
            </div>
        );
    }
}
