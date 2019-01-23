import React, { Component } from 'react';
import { StaticQuery, graphql, Link, navigate} from 'gatsby';
// import Gallery from 'react-photo-gallery';
import Img from 'gatsby-image';

import Gallery from './gallery';
import LightBox from './lightbox';
import { AnimatedLink } from './utils';
import slugify from '../utils/slugify';

import { queryString, buildQuery } from '../utils/url';

import styles from './photos.module.scss';

const PARAM_CATEGORY = 'f';
const PARAM_PHOTO = 'p';

//
// PHOTOS
//
export class Photos extends Component {
  images = {}
  mapped = {}

  getCategory = () => {
    // a) try to get from query param
    const key = queryString(PARAM_CATEGORY);
    if (key in this.mapped) {
      return this.mapped[key];
    }

    // b) use only the first category
    for (let key in this.mapped) {
      return this.mapped[key];
    }

    // c) no categories
    return {};
  }

  getPhoto = () => {
    // a) try to get from query param
    const key = queryString(PARAM_PHOTO);
    if (key in this.images) {
      return this.images[key];
    }

    // b) no photo
    return null;
  }

  getNext = () => {
    const { items = [] } = this.getCategory();
    const photo = this.getPhoto();
    if (photo === null) {
      return null;
    }

    return items[photo.index + 1] || null;
  }

  getPrev = () => {
    const { items = [] } = this.getCategory();
    const photo = this.getPhoto();
    if (photo === null) {
      return null;
    }

    return items[photo.index - 1] || null;
  }

  mapImage = ({ image }) => {

    const {
      node: {
        frontmatter: {
          image: {
            id,
            childImageSharp: {
              fluid,
              original: {
                width,
                height
              }
            }
          },
          description: caption
        } 
      }
    } = image;

    image = {
      id,
      width,
      fluid,
      height,
      caption
    };

    return image;
  }

  mapData = ({ data }) => {
    const {
      group: categories = []
    } = data.allMarkdownRemark || { /* null */};

    const mapImages = (images) => {
      return images.map((image, index) => {
        image = this.mapImage({ image });
        this.images[image.id] = image;
        image.index = index;
        
        return image;
      });
    };

    const initFlag = '__initialized';
    if (initFlag in this.images) {
      return;
    }

    categories.forEach((group) => {
      const {
        edges: images = [],
        fieldValue: label
      } = group;

      const slug = slugify(label);
      const items = mapImages(images);
      this.mapped[slug] = { slug, label, items };
    });

    this.images[initFlag] = true;
  }

  onPrev = (event) => {
    event.stopPropagation();

    const prev = this.getPrev();
    if (prev === null) {
      return;
    }

    navigate(buildQuery(
      PARAM_PHOTO,
      prev.id
    ));
  }

  onNext = (event) => {
    event.stopPropagation();

    const next = this.getNext();
    if (next === null) {
      return;
    }

    navigate(buildQuery(
      PARAM_PHOTO,
      next.id
    ));
  }

  onClose = (event) => {
    event.stopPropagation();
    
    const query = buildQuery(
      PARAM_PHOTO,
      null
    );

    navigate(query);
  }

  render() {
    return (
    	<StaticQuery
    		query={photosQuery}
        render={
          (data) => {
            this.mapData({ data });

            const {
              slug: category,
              items: photos = []
            } = this.getCategory();

            const getPath = ({ id }) => 
              buildQuery(PARAM_PHOTO, id);

            return (
              <div 
                className={styles.wrapper}>
                
                <Categories
                  data={this.mapped} 
                  current={category} />

                <Gallery
                  photos={photos}
                  getPath={getPath} />

                <LightBox
                    onNext={this.onNext}
                    onPrev={this.onPrev}
                    onClose={this.onClose} 
                    photo={this.getPhoto()}
                    hasNext={!!this.getNext()}
                    hasPrev={!!this.getPrev()} />
              </div>
            );
          }
        }
      />
    );
  }
};

//
// CATEGORIES
//
const Categories = ({ data, current }) => {

  const items = [];
  
  for (let slug in data) {
    const { label } = data[slug];
    const active = slug === current;
    const path = buildQuery(PARAM_CATEGORY, slug);

    items.push(
      <AnimatedLink
        key={slug}
        path={path}
        label={label}
        active={active} />
    );
  }

  return (
    <nav 
      className={styles.categories}>
      {items}
    </nav>
  );
};

//
// PHOTO QUERY (STATIC)
//
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
              description,
              image {
              	id,
              	childImageSharp {
                  original {
                    width,
                    height
                  },
  	              fluid(quality: 100, maxWidth: 1500) {
  	                ...GatsbyImageSharpFluid_withWebp,
                    presentationHeight,
                    presentationWidth
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