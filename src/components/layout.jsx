import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { Centered } from './utils';
import Navigation from './navigation';
import styles from './layout.module.scss';
import { LogoImageIcon, MenuIcon } from './icons';

import '../styles/main.scss';

const Layout = ({ children }) => (
	<div className={styles.wrapper}>
		<Logo />
		<Menu />
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
	icon: LogoImageIcon
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

class Menu extends Component {

	state = { isOpen: false }

	toggle = (event) => {
		event.preventDefault();

		this.setState(
			(state) => ({ isOpen: !state.isOpen })
		);
	}

	render() {
		const {
			state: {
				isOpen
			}
		} = this;

		return (
			<div>
				<a
					onClick={this.toggle}
					className={styles.menuToggle}
					href={this.state.isOpen ? '' :'#menu'}>
					<MenuIcon isActive={isOpen}/>
				</a>
				{isOpen
					? (
						<Centered>
							<Navigation />
						</Centered>
					)
					: null
				}
			</div>
		);
	}
}