import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { LogoImage, Menu } from './icons';
import styles from './layout.module.scss';

import '../styles/main.scss';

const Layout = ({ children }) => (
	<div className={styles.wrapper}>
		<Logo />
		<Nav />
		<Contact/>
    	<main className={styles.main}>
    		{children}
    	</main>
  	</div>
);

export default Layout;

const Logo = ({ icon: Icon }) => (
	<Link className={styles.logoLink} to='/'>
		<Icon className={styles.logoSvg}/>
  	</Link>
);

Logo.defaultProps = {
	icon: LogoImage
};

Logo.propTypes = {
	icon: PropTypes.func
};

const Contact = ({ label }) => (
	<Link
		to='/contact'
		data-label={label}
		className={styles.contactLink}
		activeClassName={styles.contactLinkActive}>
		{label}
	</Link>
);

Contact.defaultProps = {
	label: 'Contact'
};

class Nav extends Component {

	state = { isOpen: false }

	toggle = (event) => {
		event.preventDefault();

		this.setState(
			(state) => ({ isOpen: !state.isOpen })
		);
	}

	render() {
		return (
			<a
				onClick={this.toggle}
				className={styles.menuToggle}
				href={this.state.isOpen ? '' :'#menu'}>
				<Menu isActive={this.state.isOpen}/>
			</a>
		);
		/*return (
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
		)*/
	}
}