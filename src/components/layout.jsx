import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import {
	HTML,
	Centered,
	AnimatedLink
} from './utils';
import Footer from './footer';
import ContextMenu from './contextmenu';
import { LogoImageIcon, MenuIcon } from './icons';
import Navigation, { BackButton } from './navigation';

import styles from './layout.module.scss';

// import global styles for layout
import '../styles/main.scss';

//
// LAYOUT
//
const Layout = ({ children, showFooter }) => (
	<div className={styles.wrapper}>
		<Logo />
		<Menu />
		<Contact/>
    	<main className={styles.main}>
    		{children}
    	</main>
    	{showFooter && <Footer/>}
    	<ContextMenu>
    		All photos are copyrighted by their respective owners. All rights reserved. Unauthorized use prohibited.
    	</ContextMenu>
  	</div>
);

Layout.defaultProps = {
	showFooter: false
};

Layout.propTypes = {
	showFooter: PropTypes.bool.isRequired
};

export default Layout;

//
// SUBPAGE
//
export const SubPage = ({ content }) => {
  return (
    <Centered>
      <HTML content={content} />
      <BackButton />
    </Centered>
  )
};

//
// LOGO
//
const Logo = ({ icon: Icon }) => (
	<div className={styles.logo}>
		<Link
			to='/'
			className={styles.logoLink}>
			<Icon
				className={styles.logoSvg} />
		</Link>
	</div>
);

Logo.defaultProps = {
	icon: LogoImageIcon
};

Logo.propTypes = {
	icon: PropTypes.func
};

//
// CONTACT
//
const Contact = ({ label }) => (
	<div className={styles.contact}>
		<AnimatedLink label={label} path='/contact/' />
	</div>
);

Contact.defaultProps = {
	label: 'Contact'
};

Contact.propTypes = {
	label: PropTypes.string.isRequired
};

//
// MENU
//
class Menu extends Component {

	state = {
		isOpen: false
	}

	toggle = (event) => {
		event.preventDefault();

		this.setState(
			(state) => ({
				isOpen: !state.isOpen
			})
		);
	}

	close = (event) => {
		event.preventDefault();
		
		this.setState({
			isOpen: false
		});
	}

	render() {
		return (
			<nav className={styles.nav}>
				<a
					onClick={this.toggle}
					href={
						!this.state.isOpen
							? '#menu' 
							: ''
					}
					className={styles.menuToggle}>
					<MenuIcon
						className={styles.menuSvg}
						isActive={this.state.isOpen} />
				</a>
				<div
					id="menu"
					role="button"
					tabIndex="-1"
					onClick={this.close}
					className={styles.menuWrapper}>
					<Navigation
						isOpen={this.state.isOpen}/>
				</div>
			</nav>
		);
	}
}