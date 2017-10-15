// @flow weak

import React from "react"
import PropTypes from "prop-types"

import { withStyles } from "material-ui/styles"
import Drawer from "material-ui/Drawer"

import LessonsList from "./LessonsList"

const drawerWidth = 240

const styles = theme => ({
    root: {
        width: "100%",
        height: 430,
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: "hidden"
    },
    appFrame: {
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%"
    },
    drawerPaper: {
        position: "relative",
        height: "100%",
        width: drawerWidth
    }
})

function PermanentDrawer(props) {
    const { classes } = props

    return (
        <Drawer
            type="permanent"
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <LessonsList />
        </Drawer>
    )
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PermanentDrawer)
