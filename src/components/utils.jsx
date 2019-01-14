import React from 'react';
import PropTypes from 'prop-types';

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