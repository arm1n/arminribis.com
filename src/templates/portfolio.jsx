import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import {
  HikeIcon,
  ArrowIcon,
  TravelIcon,
  ExploreIcon,
  FacebookIcon,
  InstagramIcon
} from '../components/icons';
import Photos from '../components/photos';
import { AnimatedLink, HTML } from '../components/utils';

import styles from './portfolio.module.scss';

export class Portfolio extends Component {
  contentRef = createRef()

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
      data: {
        markdownRemark: {
          html,
          frontmatter: {
            image: {
              childImageSharp: {
                fluid
              }
            }
          }
        }
      },
      logoLabel,
      scrollLabel
    } = this.props;

    return (
      <div className={styles.wrapper}>
        
        { /* TEASER */ }
        <div className={styles.teaser}>
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

        </div>

        { /* CONTENT */ }
        <div
          id='explore'
          ref={this.contentRef}
          className={styles.content}>
          
          { /* Html */ }
          <div className={styles.html}>
            <HTML content={html} />
          </div>

          { /* Photos */ }
          <div className={styles.photos}>
            <Photos />
          </div>

          { /* Icons */ }
          <div className={styles.icons}>
            <HikeIcon 
              className={styles.icon} />
            <ExploreIcon 
              className={styles.icon} />
            <TravelIcon 
              className={styles.icon} />
          </div>

          { /* Social media */ }
          <div
            className={styles.socialMedia}>
            <a href='#' className={styles.socialMediaLink}>
              <span
                className={styles.socialMediaLabel}>
                Facebook
              </span>
              <FacebookIcon
                className={styles.socialMediaIcon}/>
            </a>            
            <a href='#' className={styles.socialMediaLink}>
              <span
                className={styles.socialMediaLabel}>
                Instagram
              </span>
              <InstagramIcon
                className={styles.socialMediaIcon}/>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

Portfolio.defaultProps = {
  logoLabel: 'Armin Ribis',
  scrollLabel: 'Explore'
};

Portfolio.propTypes = {
  content: PropTypes.node
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