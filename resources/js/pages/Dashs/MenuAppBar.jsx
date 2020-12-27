import React, { Component, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import {
    eraseCookie,
    getCookie,
    setCookie
} from "./../../../functions/Cookeis";
import { translate } from "./../../json/translate";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

export default function MenuAppBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    var lang = getCookie("lang");
    if (!lang) {
        setCookie("lang", "fr", 7);
    }
    var lang = getCookie("lang");

    const handleChange = event => {
        setAuth(event.target.checked);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar
                style={{
                    background: "#fff"
                }}
                position="static"
            >
                <Toolbar
                    style={{
                        boxShadow: "rgba(8, 21, 66, 0.05) 0px 0px 37px"
                    }}
                >
                    <IconButton
                        style={{
                            color: "#2b2b2b"
                        }}
                        onClick={e => {
                            console.log("here");
                            props.toggleDraw(true);
                        }}
                        edge="start"
                        className={classes.menuButton}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        style={{
                            color: "#2b2b2b"
                        }}
                        variant="h6"
                        className={classes.title}
                    >
                        {translate[lang].DashBoard}
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            style={{ color: "#2b2b2b" }}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem
                                style={{ color: "#2b2b2b" }}
                                onClick={() => {
                                    props.GoToPage("Profile");
                                    handleClose();
                                }}
                            >
                                {translate[lang].Profile}
                            </MenuItem>
                            <MenuItem
                                style={{ color: "#2b2b2b" }}
                                onClick={() => {
                                    fetch("/logOut", {
                                        headers: {
                                            "Content-Type": "application/json",
                                            "X-CSRF-TOKEN": $(
                                                'meta[name="csrf-token"]'
                                            ).attr("content")
                                        },
                                        method: "post"
                                    }).then(async d => {
                                        window.location.reload();
                                    });

                                    handleClose();
                                }}
                            >
                                {translate[lang].logout}
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
