import React from 'react';
import { graphql } from 'gatsby';

import { SubPage } from '../components/layout';

const Imprint = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <SubPage content={html} />
  )
};

export const imprintQuery = graphql`
  query imprintQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        title
      }
    }
  }
`;

export default Imprint;