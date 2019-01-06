import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { HTML, Centered } from '../components/utils';

export const PortfolioTemplate = ({ content }) => {
  return (
    <Centered>
      <HTML content={content} />
    </Centered>
  )
};

const Portfolio = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <Layout>
      <PortfolioTemplate content={html} />
    </Layout>
  )
};

export const portfolioQuery = graphql`
  query portfolioQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        title
      }
    }
  }
`;

export default Portfolio;