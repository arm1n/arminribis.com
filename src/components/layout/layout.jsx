import React from "react"

import Nav from "./nav/nav"
import Header from "./header/header"
import Contact from "./contact/contact"

import "../../styles/main.scss"

const Layout = ({ children }) => (
	<div>
		<Nav />
		<Header />
		<Contact />
    	{children}
  	</div>
)

export default Layout