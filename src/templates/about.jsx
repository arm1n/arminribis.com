import React from 'react';
import { graphql } from 'gatsby';

import { HTML, Centered } from '../components/utils';
import { BackButton } from '../components/navigation';

export const AboutTemplate = ({ content }) => {
  return (
    <Centered>
      <HTML content={content} />
      <BackButton />
    </Centered>
  )
};

const About = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <AboutTemplate content={html} />
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