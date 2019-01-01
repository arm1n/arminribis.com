import React from "react"
import styles from "./nav.module.scss"

class Nav extends React.Component {

	state = { isOpen: false }

	toggle = () => {
		this.setState(
			(state) => ({ isOpen: !state.isOpen })
		);
	}

	render() {
		return (
			<div
				onClick={this.toggle}
				className={`
					${styles.toggle} 
					${this.state.isOpen
						? styles.toggleActive
						: ''
					}
				`}>
				<div className={styles.toggle__outer}>
					<div className={styles.toggle__inner}>
					</div>
				</div>
			</div>
		)
	}
}

export default Nav