import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, Link, graphql } from 'gatsby';

import { LogoImageIcon, MenuIcon } from './icons';
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
			<div>
				<a
					onClick={this.toggle}
					className={styles.menuToggle}
					href={this.state.isOpen ? '' :'#menu'}>
					<MenuIcon isActive={this.state.isOpen}/>
				</a>
				<Menu className={styles.menuWrapper}/>
			</div>
		);
	}
}

const Menu = () => (
  <StaticQuery
    
    render={data => {
    	console.log(data);
    	return (
    		<div>data</div>
		);
    	}
    }
    query={menuQuery}
  />
);

const menuQuery = graphql`
	query layoutMenuQuery {
		allSitePage(filter: {context: {menu: {eq: true}}}) {
			edges {
				node {
					path,
					context {
						title
					}
				}
			}
		}
	}
`;