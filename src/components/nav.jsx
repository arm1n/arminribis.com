import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import { Arrow } from './icons';
import styles from './nav.module.scss';

export const BackButton = (props) => {
	const { label } = props;

	props = {
		...props,
		...{
			label: undefined
		}
	};

	return (
		<Link to='/' className={styles.backButton} {...props}>
			<Arrow className={styles.backButtonArrow}/>
			<span className={styles.backButtonLabel}>
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