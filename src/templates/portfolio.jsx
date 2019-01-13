import React from 'react';
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

  scrollToExplore = (event) => {
    event.preventDefault();

    const { current: element } = this.contentRef;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  render() {

    const { content, image } = this.props;

    return (
      <div className={styles.wrapper}>
        <div
          className={styles.teaser}>
          <Img
            className={styles.image}
            fluid={image.childImageSharp.fluid}/>
          <a
            href='#explore'
            className={styles.scroll}
            onClick={this.scrollToExplore}>
            <span
              className={styles.scrollLabel}>
              Explore
            </span>
            <span
              className={styles.scrollIcon}>
              <ArrowIcon
                className={styles.scrollArrow} />
            </span>
          </a>
        </div>
        <div
          id='explore'
          ref={this.contentRef}
          className={styles.explore}>
          <HTML id='explore' content={content} />
          <Photos />
        </div>
      </div>
    );
  }
};

const Portfolio = ({ data }) => {
  const { 
    markdownRemark: {
      html,
      frontmatter: {
        image
      }
    }
  } = data;

  return (
    <Layout>
      <PortfolioTemplate
        image={image}
        content={html} />
    </Layout>
  )
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