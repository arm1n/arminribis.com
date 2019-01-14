import React from 'react';
// import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link, StaticQuery, graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';

import styles from './photos.module.scss';

const Photos = () => (
	<StaticQuery
		query={photosQuery}
    render={photosRender} />
);

const Photo = ({ photo }) => (
  <Img 
    fluid={photo.fluid}
    style={
      {
        width: photo.width,
        height: photo.height
      }
    }
    className={styles.photo} />
);

const photosRender = (data) => {
	const {
    group: groups = []
  } = data.allMarkdownRemark || { /* null */};

  let photos = [];  
  const navItems = [];
  const collection = {};

  const mapImagesToPhotos = (images) => {
    return images.map((image) => {
      const {
        node: {
          frontmatter: {
            image: {
              id: key,
              childImageSharp: {
                fluid,
                fluid: {
                  src
                },
                original: {
                  width,
                  height
                }
              }
            },
            name
          } 
        }
      } = image;

      let x = {
        key,
        src,
        name,
        fluid,
        width,
        height
      };

      console.log(x);

      return x;
    });
  };

  const addCategoryToNavItems = (category) => {

    const key = category;
    const state = {
      category
    };

    navItems.push(
      <Link
        key={key}
        state={state}
        className={styles.navItem}
        to={`?category=${category}`}>
        {category}
      </Link>
    );
  };

	groups.forEach((group) => {
		const {
      fieldValue,
      edges: images = [],
      
    } = group;

    let category = fieldValue;

    addCategoryToNavItems(category);
    collection[category] = mapImagesToPhotos(images);
	});

  photos = collection['Landscape']; 

  return (
    <div className={styles.wrapper}>

      <div className={styles.filter}>
        <nav className={styles.nav}>
          {navItems}
        </nav>
      </div>

      <div className={styles.photos}>
        <Gallery
          photos={photos}
          ImageComponent={Photo} />
      </div>
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