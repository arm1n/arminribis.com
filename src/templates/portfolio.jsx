import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import smoothscroll from 'smoothscroll-polyfill';

import Photos from '../components/photos';
import { ArrowIcon } from '../components/icons';
import { AnimatedLink, HTML } from '../components/utils';

import styles from './portfolio.module.scss';

// kick off the smooth scroll polyfill
smoothscroll.polyfill();

export class PortfolioTemplate extends Component {
  contentRef = React.createRef()

  scroll = (event) => {
    event.preventDefault();

    const {
      current: {
        offsetTop: top = 0
      }
    } = this.contentRef;

    const behavior = 'smooth';

    window.scrollTo({ top, behavior });
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
        
        {false && <div className={styles.teaser}>
          <Img
            fluid={fluid}
            className={styles.image} />

          <div className={styles.logo}>
            {logoLabel} 
          </div>

          <div className={styles.scroll}>
            <AnimatedLink
              path='#explore'
              internal={false}
              label={scrollLabel}
              onClick={this.scroll}>
              <span className={styles.scrollLabel}>
                {scrollLabel}
              </span>
              <span className={styles.scrollIcon}>
                <ArrowIcon className={styles.scrollArrow} />
              </span>
            </AnimatedLink>
          </div>

        </div>}

        <div
          id='explore'
          ref={this.contentRef}
          className={styles.content}>
          
          <div className={styles.html}>
            <HTML content={content} />
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

const Portfolio = ({ data }) => {
  const {
    markdownRemark: {
      html: content,
      frontmatter: {
        image
      }
    }
  } = data;

  return (
      <PortfolioTemplate
        image={image}
        content={content} />
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