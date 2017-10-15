import { css } from "styled-components"

export const sizes = {
    desktop: 992,
    tablet: 768,
    phone: 376
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (${label === "desktop" ? "min-width" : "max-width"}: ${sizes[
                label
            ] / 16}em) {
            ${css(...args)};
        }
    `

    return acc
}, {})
