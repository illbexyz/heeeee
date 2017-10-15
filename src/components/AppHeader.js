// @flow

import React, { Component } from "react"
import { Link } from "react-router-dom"

import { withStyles } from "material-ui/styles"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import Button from "material-ui/Button"
import IconButton from "material-ui/IconButton"
import MenuIcon from "material-ui-icons/Menu"

type HeaderProps = {}

const styles = theme => ({
    root: {
        width: "100%",
        marginBottom: "16px"
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
})

class AppHeader extends Component<HeaderProps> {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="contrast"
                            aria-label="Menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            type="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            Heeeee
                        </Typography>
                        <Link to="/lessons" style={{ textDecoration: "none" }}>
                            <Button color="contrast">Lezioni</Button>
                        </Link>
                        <Link to="/stats" style={{ textDecoration: "none" }}>
                            <Button color="contrast">Statistiche</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(AppHeader)
