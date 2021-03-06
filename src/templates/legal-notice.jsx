import React from 'react';
import { graphql } from 'gatsby';

import SubPage, { LAYOUT_LARGE } from '../components/subpage';

const LegalNotice = ({ data }) => {
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

export const legalNoticeQuery = graphql`
  query legalNoticeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        title
      }
    }
  }
`;

export default LegalNotice;