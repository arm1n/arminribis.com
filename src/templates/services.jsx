import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { HTML, Centered } from '../components/utils';
import { BackButton } from '../components/navigation';

export const ServicesTemplate = ({ content }) => {
  return (
    <Centered>
      <HTML content={content} />
      <BackButton />
    </Centered>
  )
};

const Services = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <Layout>
      <ServicesTemplate content={html} />
    </Layout>
  )
};

export const servicesQuery = graphql`
  query servicesQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        title
      }
    }
  }
`;

export default Services;