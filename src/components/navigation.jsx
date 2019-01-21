import posed from 'react-pose';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import { Centered } from './utils';

import { CloseIcon } from './icons';
import styles from './navigation.module.scss';

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
			<AnimatedLink 
				to={path} 
				key={key}
				className={styles.navigationItem}
				activeClassName={styles.navigationItemActive}>
				{title}
			</AnimatedLink>
		);
	});

	return (
		<AnimatedNavigation 
			className={styles.navigation}
			pose={isOpen ? 'enter' : 'exit'}>
			<Centered>
				{items}
			</Centered>
			
		</AnimatedNavigation>
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
					template: {
					ne: null
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
const AnimatedNavigation = posed.div({
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

const AnimatedLink = posed(
	forwardRef(
		(props, ref) =>
			<Link
				innerRef={ref} {...props} />
	)
)({
	enter: { x: '0%', opacity: 1 },
	exit: { x: '50%', opacity: 0 }
});

