import React from 'react';
import PropTypes from 'prop-types';

import styles from './icons.module.scss';

import ArrowSVG from '../icons/arrow.svg';
import CloseSVG from '../icons/close.svg';

import HikeSVG from '../icons/hike.svg';
import TravelSVG from '../icons/travel.svg';
import ExploreSVG from '../icons/explore.svg';

import LogoTextSVG from '../icons/logo-text.svg';
import LogoImageSVG from '../icons/logo-image.svg';

import FacebookSVG from '../icons/facebook.svg';
import InstagramSVG from '../icons/instagram.svg';

export const ArrowIcon = (props) => (
  <Icon icon={ArrowSVG} {...props}/>
);

export const CloseIcon = (props) => (
  <Icon icon={CloseSVG} {...props}/>
);

export const LogoTextIcon = (props) => (
  <Icon icon={LogoTextSVG} {...props}/>
);

export const LogoImageIcon = (props) => (
  <Icon icon={LogoImageSVG} {...props}/>
);

export const HikeIcon = (props) => (
  <Icon icon={HikeSVG} {...props}/>
);

export const TravelIcon = (props) => (
  <Icon icon={TravelSVG} {...props}/>
);

export const ExploreIcon = (props) => (
  <Icon icon={ExploreSVG} {...props}/>
);

export const FacebookIcon = (props) => (
  <Icon icon={FacebookSVG} {...props}/>
);

export const InstagramIcon = (props) => (
  <Icon icon={InstagramSVG} {...props}/>
);

export const MenuIcon = ({ isActive }) => (
	<svg
		viewBox='0 0 40 40'
		className={`
			${styles.menu} 
			${isActive ? styles.menuActive : ''}
		`}>
		<g className={styles.menuLines}>
			<line
				x1='0'
				x2='40'
				y1='5'
				y2='5'
				className={styles.menuLine1}>
			</line>
			<line
				x1='0'
				x2='40' 
				y1='20'
				y2='20'
				className={styles.menuLine2}>
			</line>
			<line
				x1='0'
				x2='40'
				y1='35'
				y2='35' 
				className={styles.menuLine3}>
			</line>
		</g>
		<circle
			r='18'
			cx='20'
			cy='20'
			strokeWidth='2'
			className={styles.menuCircle} />
	</svg>
);

const Icon = (props) => {
	const { icon: { id, viewBox } } = props;

	props = {
		...props,
		...{
			icon: undefined // remove icon
		}
	};

	return (
		<svg viewBox={viewBox} {...props}>
	    	<use xlinkHref={`#${id}`} />
	  	</svg>
	);
};

Icon.defaultProps = {
	width: 25,
	height: 25
}

Icon.propTypes = {
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	height: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	icon: PropTypes.shape({
		id: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		viewBox: PropTypes.string.isRequired
	})
}

export default Icon;