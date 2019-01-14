import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import smoothscroll from 'smoothscroll-polyfill';

import Layout from '../components/layout';
import Photos from '../components/photos';
import { HTML } from '../components/utils';

import { ArrowIcon } from '../components/icons';

import styles from './portfolio.module.scss';

// kick off the smooth scroll polyfill
smoothscroll.polyfill();

export class PortfolioTemplate extends React.Component {
  contentRef = React.createRef()

  scrollToRef = (ref = {}) => {
    const {
      current: {
        offsetTop: top = 0
      } = {}
    } = ref;
    const behavior = 'smooth';

    window.scrollTo({ top, behavior });
  }

  scroll = (event) => {
    event.preventDefault();
    this.scrollToRef(this.contentRef);
  }

  render() {

    const {
      content,
      image: {
        childImageSharp: {
          fluid
        }
      },
      logoLabel,
      scrollLabel
    } = this.props;

    return (
      <div className={styles.wrapper}>
        
        <div className={styles.teaser}>
          <Img
            fluid={fluid}
            className={styles.image} />

          <div className={styles.logo}>
            {logoLabel} 
          </div>

          <a
            href='#explore'
            onClick={this.scroll}
            className={styles.scroll}>
            <span className={styles.scrollLabel}>
              {scrollLabel}
            </span>
            <span className={styles.scrollIcon}>
              <ArrowIcon className={styles.scrollArrow} />
            </span>
          </a>
        </div>

        <div
          id='explore'
          ref={this.contentRef}
          className={styles.explore}>
          
          <div className={styles.content}>
            <HTML
              content={content} />
          </div>

          <div className={styles.photos}>
            <Photos />
          </div>
        </div>
      </div>
    );
  }
};

PortfolioTemplate.defaultProps = {
  logoLabel: 'Armin Ribis',
  scrollLabel: 'Explore',
  selectedCategory: null
};

PortfolioTemplate.propTypes = {
  content: PropTypes.node
};

const Portfolio = ({ data, location }) => {

  const {
    markdownRemark: {
      html,
      frontmatter: {
        image
      }
    }
  } = data;

  /*
  const {
    state: {
      category = null
    } = {}
  } = location || {};

  console.log(category);
  */

  return (
    <Layout>
      <PortfolioTemplate
        image={image}
        content={html} />
    </Layout>
  );
};

export const portfolioQuery = graphql`
  query portfolioQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        name,
        image {
          childImageSharp {
            fluid(maxWidth: 2048) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default Portfolio;