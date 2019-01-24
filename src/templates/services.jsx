import React from 'react';
import { graphql } from 'gatsby';

import { SubPage } from '../components/layout';

const Services = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <SubPage html={html} />
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