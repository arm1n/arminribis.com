import React from 'react';
// import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Gallery from 'react-photo-gallery';

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

	const photos = [];

	categories.forEach((category) => {
		const { edges = [] } = category;

		edges.forEach((edge) => {
      const { image } = edge.node.frontmatter;
      console.log(image);
      if (!image) {
        return;
      }

      const {
        id: key,
        childImageSharp: {
          fluid: {
            src,
            sizes,
            srcSet
          },
          original: {
            width,
            height
          }
        }
      } = image;

      photos.push({ key, src, sizes, srcSet, width, height });

		});
	});

  return (
    <Gallery
      margin={5}
      photos={photos}/>
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
                  original {
                    width,
                    height
                  },
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