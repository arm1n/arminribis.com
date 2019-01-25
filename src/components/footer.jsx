import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import styles from './footer.module.scss';
import Copyright from './copyright';

//
// FOOTER
//
const Footer = () => (
  <footer 
	className={styles.wrapper}>
	
	<Copyright />
	<Menu />
  </footer>
);

//
// MENU
//
const Menu = () => (
  <StaticQuery
    query={menuQuery}
    render={
    	(data) => 
    		menuRender({data})
    }
  />
);

const menuRender = ({ data }) => {
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
		<nav className={styles.menu}>
			{items}
		</nav>
	);
};

const menuQuery = graphql`
	query footerMenuQuery {
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

//
// FOOTER COPY
//


export default Footer;

