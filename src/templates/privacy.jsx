import React from 'react';
import { graphql } from 'gatsby';

import { SubPage } from '../components/layout';

const Privacy = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <SubPage html={html} />
  )
};

export const privacyQuery = graphql`
  query privacyQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        title
      }
    }
  }
`;

export default Privacy;