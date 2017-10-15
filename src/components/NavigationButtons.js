import React from "react"
import tail from "lodash/tail"
import { Link, withRouter } from "react-router-dom"

import Button from "material-ui/Button"

const NavigationButtons = ({ location }) =>
    tail(location.pathname.split("/")).map((path, index) => (
        <Link
            key={path}
            to={location.pathname.split("/", index + 2).join("/")}
            style={{ textDecoration: "none" }}
        >
            <Button color="contrast" dense>
                {path}
            </Button>
        </Link>
    ))

export default withRouter(NavigationButtons)
