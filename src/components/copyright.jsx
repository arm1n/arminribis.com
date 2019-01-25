import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { HTML } from './utils';

import styles from './copyright.module.scss';

const Copyright = () => (
  <StaticQuery
    query={copyrightQuery}
    render={copyrightRender}
  />
);

const copyrightRender = (data) => {
	const {
		markdownRemark: {
			html
		}
	} = data;
	return (
		<div className={styles.wrapper}>
			<HTML content={html} />
		</div>
	);
};

const copyrightQuery = graphql`
	query copyrightQuery {
		markdownRemark (
			frontmatter: { 
				name: { 
					eq: "footer"
				}
			}) {
			html
		}
	}
`;

export default Copyright;