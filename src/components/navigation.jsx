import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';

import { CloseIcon } from './icons';
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
			<CloseIcon
				className={styles.backButtonArrow}/>
			<span
				className={styles.backButtonLabel}>
				{label}
			</span>
		</Link>
	);
};

BackButton.defaultProps = {
	label: 'Close'
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

	// https://reactjs.org/docs/lists-and-keys.html
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
		<div className={styles.navigation}>{items}</div>
	);
};

const navigationQuery = graphql`
	query navigationQuery {
		allSitePage(
			filter: {
				context: {
					menu: { eq:true }
				}
			},
			sort: {
				fields: [context___order],
				order: ASC
			}
		) {
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