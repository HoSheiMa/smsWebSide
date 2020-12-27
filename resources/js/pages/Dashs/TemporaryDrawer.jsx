import React, { Component } from "react";
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

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
        indexActive: props.getIndex()
    });

    const toggleDrawer = open => {
        setState({ ...state, left: open, indexActive: props.getIndex() });
    };

    const list = anchor => (
        <div
            style={{
                padding: 40
            }}
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <List>
                {props.Pages.map((text, index) => (
                    <ListItem
                        onClick={() => {
                            console.log("he", text);
                            props.GoToPage(index);
                            setState({ ...state, indexActive: index });
                        }}
                        style={{
                            borderRadius: 9,
                            width: 240,
                            color:
                                state.indexActive == index ? "#fff" : "#2b2b2b",
                            boxShadow:
                                state.indexActive == index
                                    ? "0 0 37px rgba(8,21,66,0.05)"
                                    : "0 0 0",
                            margin: 5,
                            backgroundImage:
                                state.indexActive == index
                                    ? "linear-gradient(90deg, #7366ff 0%, #a26cf8 100%)"
                                    : "#fff"
                        }}
                        button
                        key={text}
                    >
                        <ListItemIcon>
                            <InboxIcon
                                style={{
                                    color:
                                        state.indexActive == index
                                            ? "#fff"
                                            : "#2b2b2b"
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            color={
                                state.indexActive == index ? "#fff" : "2b2b2b"
                            }
                            style={{
                                color:
                                    state.indexActive == index
                                        ? "#fff"
                                        : "2b2b2b",
                                fontWeight: "blod"
                            }}
                            primary={text}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    props.SetToggleDraw(toggleDrawer);
    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor="left"
                    open={state["left"]}
                    onClose={() => {
                        toggleDrawer(false);
                    }}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
