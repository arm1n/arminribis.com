import React from 'react';
import { graphql } from 'gatsby';

import { SubPage } from '../components/layout';

const Contact = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <SubPage html={html} />
  )
};

export const contactQuery = graphql`
  query contactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        title
      }
    }
  }
`;

export default Contact;