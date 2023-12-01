import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle, icon }) => (
  <header
    className="hidden"
  >
      <title>{siteTitle}</title>
      <link rel="icon" type="image/x-icon" href={icon}></link>
  </header>
)

export default Header
