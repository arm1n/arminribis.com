import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// import { CloseIcon } from './icons';
import styles from './navigation.module.scss';

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

			// images[category.fieldValue].push(<Img fluid={fluid}/>)

			images.push(<Img key={id} fluid={fluid}/>)

		})
	});

	console.log(images);

  	return (<div id='images'>{images}</div>);
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
              title,
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