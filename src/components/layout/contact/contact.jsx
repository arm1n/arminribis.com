import React from "react"
import { Link } from "gatsby"
import styles from "./contact.module.scss"

const Contact = () => {
	const label = 'Contact'

	return (
		<Link 
			to="/" 
			data-label={label}
			className={styles.toggle}>
			{label}
		</Link>
	)
}

export default Contact