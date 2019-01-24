import React from 'react';
import { graphql } from 'gatsby';

import { SubPage } from '../components/layout';

const About = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <SubPage html={html} />
  )
};

export const aboutQuery = graphql`
  query aboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html,
      frontmatter {
        title
      }
    }
  }
`;

export default About;