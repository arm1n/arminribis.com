import React from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import { Centered } from './utils';
import { BackButton } from './navigation';
import { parseHTML } from '../utils/html';

import styles from './subpage.module.scss';

export const LAYOUT_SMALL = styles.small;
export const LAYOUT_LARGE = styles.large;

//
// SUBPAGE
//
const SubPage = ({ html, layout }) => {
	const items = parseHTML(html)
		.concat([
			<BackButton/>
		])
		.map((item, index) => 
		(
			<PosedDiv 
				key={index} 
				index={index}>
				{item}
			</PosedDiv>
		)
	);

	return (
		<div className={`${styles.wrapper} ${layout}`}>
			<Centered>
				<PoseGroup>
					{items}
				</PoseGroup>
			</Centered>
		</div>
	)
};

SubPage.defaultProps = {
	html: '',
	layout: LAYOUT_SMALL
};

SubPage.propTypes = {
	html: PropTypes.string.isRequired,
	layout: PropTypes.string.isRequired
};

const PosedDiv = posed.div({
	enter: {
		y: 0,
		opacity: 1,
		delay: ({ index }) => index * 50
	},
	exit: {
		y: 100,
		opacity: 0,
		transition: {
			duration: 0
		}
	}
});

export default SubPage;