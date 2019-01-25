import React from 'react';
import { graphql } from 'gatsby';

import SubPage, {LAYOUT_LARGE} from '../components/subpage';

const PrivacyPolicy = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <SubPage 
      html={html} 
      layout={LAYOUT_LARGE} />
  )
};

export const privacyPolicyQuery = graphql`
  query privacyPolicyQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        title
      }
    }
  }
`;

export default PrivacyPolicy;