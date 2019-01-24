import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import styles from './footer.module.scss';

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
			<Link 
				key={id}
				to={path} 
				className={styles.navItem}>
				{title}
			</Link>
		);
	});

	return (
		<footer 
			className={styles.wrapper}>
			<nav className={styles.nav}>
				{items}
			</nav>
			<div className={styles.copy}>
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

