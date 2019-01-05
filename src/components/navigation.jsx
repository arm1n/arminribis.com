import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';

import { ArrowIcon } from './icons';
import styles from './navigation.module.scss';

export const BackButton = (props) => {
	const { label } = props;

	props = {
		...props,
		...{
			label: undefined
		}
	};

	return (
		<Link
			to='/'
			className={styles.backButton}
			{...props}>
			<ArrowIcon
				className={styles.backButtonArrow}/>
			<span
				className={styles.backButtonLabel}>
				{label}
			</span>
		</Link>
	);
};

BackButton.defaultProps = {
	label: 'Go back'
};

BackButton.propTypes = {
	label: PropTypes.string
};

const Navigation = () => (
  <StaticQuery
    query={navigationQuery}
    render={navigationRender}
  />
);

const navigationRender = (data) => {
	const {
		allSitePage: {
			edges
		}
	} = data;

	const items = edges.map((edge) => {

		const {
			node: {
				id,
				path,
				context: {
					title
				}
			}
		} = edge;

		return (
			<Link
				key={id}
				to={path}
				className={styles.navigationItem}
				activeClassName={styles.navigationItemActive}>
				{title}
			</Link>
			
		);
	});

	return (
		<nav className={styles.navigation}>{items}</nav>
	);
};

const navigationQuery = graphql`
	query navigationQuery {
		allSitePage(filter: {context: {menu: {eq: true}}}) {
			edges {
				node {
					id,
					path,
					context {
						title
					}
				}
			}
		}
	}
`;

export default Navigation;