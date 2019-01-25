import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import Layout from './src/components/layout';
import smoothscroll from 'smoothscroll-polyfill';

// runtime state for different properties
let state = { };

// kick off the smooth scroll polyfill
smoothscroll.polyfill();

//
// Implement the `shouldUpdateScroll` hook avoiding scroll on route change:
// https://www.gatsbyjs.org/docs/browser-apis/#shouldUpdateScroll
//
export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
	const savedPosition = getSavedScrollPosition(location);
	const scrollTo = location.pathname === '/'
		? savedPosition || [0, 0]
		: [0, 0];
		
  	window.scrollTo(...scrollTo)

	return false;
};

//
// Implement the `wrapPageElement` hook to avoid remounting of layout:
// https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement
//
export const wrapPageElement = ({ element, props }) => {
	const {
		pageContext: {
			isRoot
		},
		location: {
			pathname,
			key
		}
	} = props;

	const {
		prevPathname
	} = state;

	// save current pathname as prev
	// one in runtime state property
	state.prevPathname = pathname;

  	return (
  		<Layout showFooter={isRoot}>
			{
				(prevPathname !== pathname) && (
					<PoseGroup animateOnMount>
						<PosedPage key={key}>
							{element}
						</PosedPage>
					</PoseGroup>
				) || (element)
			}
		</Layout>
	);
};

const PosedPage = posed.div({
  enter: {
  	opacity: 1,
  	beforeChildren: true
  },
  exit: {
  	opacity: 0,
  	afterChildren: true
  }
});