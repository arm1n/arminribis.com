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
import { parseHTML } from '../utils/html';
import Photos from '../components/photos';
import { AnimatedLink } from '../components/utils';

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
            },
            scroll: scrollLabel,
            facebook,
            instagram
          }
        }
      },
      logoLabel
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
            {parseHTML(html)}
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
            {facebook.url && facebook.label && (
                <a 
                  target='_blank'
                  href={facebook.url}
                  className={styles.socialMediaLink}>
                  <span
                    className={styles.socialMediaLabel}>
                    {facebook.label}
                  </span>
                  <FacebookIcon
                    className={styles.socialMediaIcon}/>
              </a>
            )} 
            {instagram.url && instagram.label && (        
              <a 
                target='_blank'
                href={instagram.url} 
                className={styles.socialMediaLink}>
                <span
                  className={styles.socialMediaLabel}>
                  {instagram.label}
                </span>
                <InstagramIcon
                  className={styles.socialMediaIcon}/>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
};

Portfolio.defaultProps = {
  logoLabel: 'Armin Ribis',
};

Portfolio.propTypes = {
  logoLabel: PropTypes.string.isRequired
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
        },
        scroll,
        facebook {
          url,
          label
        },
        instagram {
          url,
          label
        }
      }
    }
  }
`;

export default Portfolio;