import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import styles from './utils.module.scss';

export const HTML = (props) => {

	const html = {
		__html: props.content
	};

	props = {
		...props,
		...{
			content: undefined
		}
	};

	return (
		<div
			{...props}
			className={styles.htmlWrapper}
			dangerouslySetInnerHTML={html} />
	);
};

HTML.propTypes = {
  content: PropTypes.node
};

export const Centered = ({ children }) => (
  <div className={styles.centeredWrapper}>
  	<div className={styles.centeredContainer}>
  		{children}
  	</div>
  </div>
);

Centered.propTypes = {
  children: PropTypes.node.isRequired
};

export const AnimatedLink = (props) => {

	let {
		path,
		label,
		active,
		internal,
		children,
		className = ''
	} = props;

	props = {
		...props,
		...{
			className: undefined,
			internal: undefined,
			active: undefined,
			label: undefined,
			path: undefined
		}
	};

	delete props.className;
	delete props.internal;
	delete props.label;
	delete props.path;

	className = !active
		? `${styles.animatedLink} ${className}`
		: `${styles.animatedLink} ${styles.animatedLinkActive} ${className}`;
	const content = children ? children : label;

	if (internal) {
		return (
			<Link
				to={path}
				data-label={label}
				className={className}
				activeClassName={styles.animatedLinkActive} {...props}>
				{content}
			</Link>
		);
	}

	return (
		<a
			href={path}
			data-label={label}
			className={className} {...props}>
			{content}
		</a>
	);
};

AnimatedLink.defaultProps = {
	internal: true
};

AnimatedLink.propTypes = {
	internal: PropTypes.bool,
	label: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired
};
