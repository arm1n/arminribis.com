import posed from 'react-pose';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import styles from './navigation.module.scss';
import { Centered, AnimatedLink } from './utils';

import { ArrowIcon } from './icons'

//
// BACK BUTTON
//
export const BackButton = (props) => {
	const { label } = props;

	props = {
		...props,
		...{
			label: undefined
		}
	};

	delete props.label;

	return (
		<div 
			className={styles.backButton} {...props}>
			<ArrowIcon className={styles.backButtonIcon} />
			<AnimatedLink 
				path='/' 
				label={label} />
		</div>
	);
};

BackButton.defaultProps = {
	label: 'Go back'
};

BackButton.propTypes = {
	label: PropTypes.string
};

//
// NAVIGATION
//
const Navigation = ({ isOpen }) => (
  <StaticQuery
    query={navigationQuery}
    render={
    	(data) => navigationRender({
			isOpen,
			data
		})
    }
  />
);

Navigation.defaultProps = {
	isOpen: false
};

Navigation.propTypes = {
	isOpen: PropTypes.bool.isRequired
};

const navigationRender = ({ data, isOpen }) => {
	const {
		allSitePage: {
			edges
		}
	} = data;

	const items = edges.map((edge, index) => {
		const {
			node: {
				path,
				id: key,
				context: {
					title
				}
			}
		} = edge;

		return (
			<PosedLink 
				to={path} 
				key={key}
				className={styles.navigationItem}
				activeClassName={styles.navigationItemActive}>
				{title}
			</PosedLink>
		);
	});

	return (
		<PosedNavigation 
			className={styles.navigation}
			pose={isOpen ? 'enter' : 'exit'}>
			<Centered>
				{items}
			</Centered>
		</PosedNavigation>
	);
};

const navigationQuery = graphql`
	query navigationQuery {
		allSitePage(
			sort: {
				fields: [context___order],
				order: ASC
			},
			filter: {
				context: {
					menu: {
						eq: "main"
					}
				}
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

//
// Animations
//
const PosedNavigation = posed.div({
	enter: {
		opacity: 1,
		staggerChildren: 50,
		beforeChildren: true,
		applyAtStart: {
			display: 'block'
		}
	},
	exit: {
		opacity: 0,
		staggerChildren: 50,
		staggerDirection: -1,
		afterChildren: true,
		applyAtEnd: {
			display: 'none'
		}
	}
});

const PosedLink = posed(
	forwardRef(
		(props, ref) =>
			<Link
				innerRef={ref} {...props} />
	)
)({
	enter: { x: '0%', opacity: 1 },
	exit: { x: '50%', opacity: 0 }
});

