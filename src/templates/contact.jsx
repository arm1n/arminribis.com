import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { BackButton } from '../components/nav';
import { HTML, Centered } from '../components/utils';

export const ContactTemplate = ({ title, content }) => {
  return (
    <Centered>
      <h1>{title}</h1>
      <HTML content={content} />
      <BackButton />
    </Centered>
  )
}

const Contact = ({ data }) => {
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
      <ContactTemplate
        title={title} 
        content={html} />
    </Layout>
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