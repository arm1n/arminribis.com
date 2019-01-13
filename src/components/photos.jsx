import React from 'react';
// import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import styles from './photos.module.scss';

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const Photos = () => (
	<StaticQuery
		query={photosQuery}
        render={photosRender} />
);

const photosRender = (data) => {
	data = data.allMarkdownRemark || { /* null */ };
	const { group: categories = [] } = data;

	const images = [];

	categories.forEach((category) => {
		const { edges: photos = [] } = category;

		// const c = images[category.fieldValue] = [];

		photos.forEach((photo) => {
			const { image } = photo.node.frontmatter;
      const { id, childImageSharp: { fluid } } = image;
      const aspectRatio = round(fluid.aspectRatio, 2);

      console.log(round(image.childImageSharp.fluid.aspectRatio, 2));
			images.push(
        <Img
          key={id}
          fluid={fluid}
          className={styles.image}
          data-ar={aspectRatio} />
      );

		})
	});

  	return (
      <div className={styles.wrapper}>
        {images}
      </div>
    );
};

const photosQuery = graphql`
  query photosQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          type: {
            eq: "photo"
          }
        }
      }) {
      group(field: fields___category) {
        fieldValue,
        totalCount,
        edges {
          node {
            frontmatter {
              name,
              image {
              	id,
              	childImageSharp {
	              fluid(maxWidth: 700) {
	                ...GatsbyImageSharpFluid
	              }
	            }
              }
            }
          }
        }
      }
    }
  }
`;

export default Photos;