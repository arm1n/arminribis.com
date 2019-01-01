import React from "react"
import { Link } from "gatsby"
import logo from "./logo.svg"
import styles from "./header.module.scss"

const Header = () => (
	<Link className={styles.link} to="/">
		<img 
			src={logo} 
			className={styles.logo} 
			alt="A warm welcome to my website"/>
  	</Link>
)

export default Header