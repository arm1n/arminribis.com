import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { AnimatedLink } from './utils';

import styles from './navigation.module.scss';

//
// FOOTER
//
const Footer = () => (
  <StaticQuery
    query={footerQuery}
    render={
    	(data) => 
    		footerRender({data})
    }
  />
);

const footerRender = ({ data }) => {
	const {
		allSitePage: {
			edges
		}
	} = data;

	const items = edges.map((edge, index) => {
		const {
			node: {
				path,
				id,
				context: {
					title
				}
			}
		} = edge;

		return (
			<AnimatedLink 
				key={id}
				path={path} 
				label={title} />
		);
	});

	return (
		<footer 
			className={styles.footer}>
			<nav class={styles.nav}>
				{items}
			</nav>
			<div class={styles.copy}>
			</div>
		</footer>
	);
};

const footerQuery = graphql`
	query footerQuery {
		allSitePage(
			sort: {
				fields: [context___order],
				order: ASC
			},
			filter: {
				context: {
					menu: {
						eq: "footer"
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

export default Footer;

