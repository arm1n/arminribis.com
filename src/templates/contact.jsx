import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'

export const ContactTemplate = ({ title, content }) => {
  return (
    <h2>
      {title}
    </h2>
    {content}
  )
}

const Contact = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ContactTemplate/>
    </Layout>
  )
}

export default Contact

export const contactQuery = graphql`
  query Contact($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`