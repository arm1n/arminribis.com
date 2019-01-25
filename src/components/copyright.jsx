import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import styles from './copyright.module.scss';

const Copyright = () => (
  <StaticQuery
    query={copyrightQuery}
    render={
    	(data) => 
    		copyrightRender({data})
    }
  />
);

const copyrightRender = ({ data }) => {
	/*const {
		allSitePage: {
			edges
		}
	} = data;*/
	console.log(data);

	return (
		<div className={styles.wrapper}>

		</div>
	);
};

const copyrightQuery = graphql`
	query copyrightQuery {
		allMarkdownRemark(
			filter: {
				frontmatter: {
					type: {
						eq: "block"
					}
				}
			})
		{
			edges {
				node {
					id
				}
			}
		}
	}
`;

export default Copyright;