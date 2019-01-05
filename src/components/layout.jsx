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
		const {
			state: {
				isOpen
			}
		} = this;

		return (
			<nav>
				<a
					onClick={this.toggle}
					className={styles.menuToggle}
					href={this.state.isOpen ? '' :'#menu'}>
					<MenuIcon isActive={isOpen}/>
				</a>
				{isOpen
					? (
						<div
							id="menu"
							tabIndex="-1"
							role="button"
							onClick={this.close}
							className={styles.menuWrapper}>
							<div className={styles.menuCentered}>
							<Centered className={styles.menuCentered}>
								<Navigation />
							</Centered>
							</div>
						</div>
					)
					: null
				}
			</nav>
		);
	}
}