import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { BackButton } from '../components/nav';
import { HTML, Centered } from '../components/utils';

export const AboutTemplate = ({ title, content }) => {
  return (
    <Centered>
      <h1>{title}</h1>
      <HTML content={content} />
      <BackButton />
    </Centered>
  )
}

const About = ({ data }) => {
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
      <AboutTemplate
        title={title} 
        content={html} />
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