import React from 'react';
import Layout from './src/components/layout';

//
// Implement the `shouldUpdateScroll` hook avoiding scroll on route change:
// https://www.gatsbyjs.org/docs/browser-apis/#shouldUpdateScroll
//
export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
	const currentPosition = getSavedScrollPosition(location)

  	window.scrollTo(...(currentPosition || [0, 0]))

	return false;
}

//
// Implement the `wrapPageElement` hook to avoid remounting of layout:
// https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement
//
export const wrapPageElement = ({ element, props }) => {
  	return (
	  	<Layout {...props}>
	  		{element}
		</Layout>
	);
};

