import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
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
    <Layout>
      <AboutTemplate content={html} />
    </Layout>
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