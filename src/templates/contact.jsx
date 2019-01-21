import React from 'react';
import { graphql } from 'gatsby';

import { HTML, Centered } from '../components/utils';
import { BackButton } from '../components/navigation';

export const ContactTemplate = ({ content }) => {
  return (
    <Centered>
      <HTML content={content} />
      <BackButton />
    </Centered>
  )
};

const Contact = ({ data }) => {
  const { 
    markdownRemark: {
      html
    }
  } = data;

  return (
    <ContactTemplate content={html} />
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