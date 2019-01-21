import React, { Component } from 'react';
import { StaticQuery, graphql, Link, navigate} from 'gatsby';
import Gallery from 'react-photo-gallery';
import Img from 'gatsby-image';

import LightBox from './lightbox';
import { AnimatedLink } from './utils';
import slugify from '../utils/slugify';
import { queryString, buildQuery } from '../utils/url';

import styles from './photos.module.scss';

const PARAM_PHOTO = 'p';
const PARAM_CATEGORY = 'f';

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
          description: caption,
          name
        } 
      }
    } = image;

    image = {
      key,
      src,
      name,
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
        this.images[image.key] = image;

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

    const query = buildQuery(
      PARAM_PHOTO,
      prev.key
    );

    navigate(query);
  }

  onNext = (event) => {
    event.stopPropagation();

    const next = this.getNext();
    if (next === null) {
      return;
    }

    const query = buildQuery(
      PARAM_PHOTO,
      next.key
    );

    navigate(query);
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

            return (
              <div className={styles.wrapper}>
                <Categories
                  data={this.mapped} 
                  current={category} />

                <div className={styles.photos}>
                  <Gallery
                    photos={photos}
                    ImageComponent={Photo} />
                </div>

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
// GALLERY PHOTO
//
const Photo = ({ photo, index, onClick }) => {
  const path = buildQuery(PARAM_PHOTO, photo.key);
  const { width, height } = photo;
  const style = { width, height };

  return (
    <Link to={path}>
      <Img 
        style={style}
        fluid={photo.fluid}
        className={styles.photo} />
    </Link>
  );
}

//
// CATEGORIES NAV
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
  	              fluid(quality: 80, maxWidth: 1200) {
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