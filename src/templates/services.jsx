import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { BackButton } from '../components/nav';
import { HTML, Centered } from '../components/utils';

export const ServicesTemplate = ({ title, content }) => {
  return (
    <Centered>
      <h1>{title}</h1>
      <HTML content={content} />
      <BackButton />
    </Centered>
  )
}

const Services = ({ data }) => {
  const { 
    markdownRemark: {
      html,
      frontmatter: {
        title
      }
    }
  } = data;

  return (
    <Layout>
      <ServicesTemplate
        title={title} 
        content={html} />
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