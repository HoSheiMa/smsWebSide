import React, { Component } from "react";
import MenuAppBar from "./MenuAppBar";
import TemporaryDrawer from "./TemporaryDrawer";
import ContectUs from "./UserDashBoardPages/ContectUs";
import FreeSMS from "./UserDashBoardPages/FreeSMS";
import Main from "./UserDashBoardPages/Main";
import Products from "./UserDashBoardPages/Products";
import Profile from "./UserDashBoardPages/profile";
import SendSMS from "./UserDashBoardPages/SendSMS";

import {
    eraseCookie,
    getCookie,
    setCookie
} from "./../../../functions/Cookeis";
import { translate } from "./../../json/translate";

export default class UserDashBoard extends Component {
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
                Index = (
                    <ContectUs {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            case 3:
                Index = (
                    <SendSMS {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            case 4:
                Index = (
                    <FreeSMS {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            case 5:
                Index = (
                    <Products {...this.state.data} GoToPage={this.GoToPage} />
                );
                break;
            default:
                break;
        }
        return Index;
    };
    GoToPage = (text, data = {}) => {
        if (typeof text == "number") {
            this.setState({
                index: text,
                data: data
            });
            return;
        }
        switch (text) {
            case "Profile":
                this.setState({
                    index: 1,
                    data: data
                });
                break;
            case "Home":
                this.setState({
                    index: 0,
                    data: data
                });
                break;
            case "Contect Us":
                this.setState({
                    index: 2,
                    data: data
                });
                break;
            case "Send SMS":
                this.setState({
                    index: 3,
                    data: data
                });
                break;
            case "Free SMS":
                this.setState({
                    index: 4,
                    data: data
                });
                break;
            case "Products":
                this.setState({
                    index: 5,
                    data: data
                });
                break;
            default:
                break;
        }
    };

    render() {
        var lang = getCookie("lang");
        if (!lang) {
            setCookie("lang", "fr", 7);
        }
        var lang = getCookie("lang");
        return (
            <div>
                {" "}
                <TemporaryDrawer
                    getIndex={this.getIndex}
                    SetToggleDraw={this.SetToggleDraw}
                    GoToPage={this.GoToPage}
                    Pages={[
                        translate[lang].home,
                        translate[lang].Profile,
                        translate[lang].ContectUs,
                        translate[lang].sendsms,
                        translate[lang].freeSms,
                        translate[lang].Products
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
