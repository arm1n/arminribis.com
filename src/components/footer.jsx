import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import styles from './footer.module.scss';
import Copyright from './copyright';

//
// FOOTER
//
const Footer = () => (
	<StaticQuery
		query={footerQuery}
		render={footerRender}
	/>
);

const footerRender = (data) => {
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
				className={styles.menuItem}>
				{title}
			</Link>
		);
	});

	return (
		<footer
			className={styles.wrapper}>
			<nav className={styles.menu}>
				{items}
			</nav>
			<Copyright />
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