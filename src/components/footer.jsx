import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import styles from './footer.module.scss';

//
// FOOTER
//
const Footer = () => (
  <footer 
	className={styles.wrapper}>
	<Menu />
	<Copy />
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
const Copy = () => (
  <StaticQuery
    query={copyQuery}
    render={
    	(data) => 
    		copyRender({data})
    }
  />
);

const copyRender = ({ data }) => {
	/*const {
		allSitePage: {
			edges
		}
	} = data;*/
	console.log(data);

	return (
		<div className={styles.copy}>

		</div>
	);
};

const copyQuery = graphql`
	query footerCopyQuery {
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

