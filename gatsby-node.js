const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

//
// Creates pages from markdown data persisted by netlify cms:
// https://www.gatsbyjs.org/docs/programmatically-create-pages-from-data/
//
exports.createPages = ({ actions: { createPage }, graphql }) => {

  //
  // Create pages with hidden `template` field based
  // on prepared templates in `src/templates` folder
  //
  const handleQueryData = (data) => {
    const { allMarkdownRemark: { edges } } = data;

    edges.forEach(edge => {
      const {
        node: {
          id,
          fields: {
            slug // @see: `onCreateNode()` at EOF
          },
          frontmatter: { // @see: `static/admin/config.yml`
            template,
            title,
            order
          }
        }
      } = edge;

      let component = `src/templates/${template}.jsx`;
      component = path.resolve(component);

      createPage({
        path: slug,
        component,
        context: {
          id,
          order,
          title
        }
      })
    });
  };

  //
  // Error handling or proxy to `handleQueryData`
  //
  const handleQueryResult = ({ data, errors }) => {
    if (errors !== undefined) {
      return Promise.reject(errors)
    }

    handleQueryData(data);
  };

  //
  // Fetch all remarked pages from `src/pages/`
  //
  graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            template: {
              ne: null
            }
          }
        }) {
        edges {
          node {
            id
            fields {
              slug
            },
            frontmatter {
              template,
              title,
              order
            }
          }
        }
      }
    }
  `).then(handleQueryResult);
};

//
// Creates `slug` field for pages dynamically based on file name:
// https://www.gatsbyjs.org/docs/creating-slugs-for-pages/
//
// Converts `frontmatter` images to relative paths (netlify-cms):
// https://github.com/danielmahon/gatsby-remark-relative-images
//
exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  // make relative image paths
  fmImagesToRelative(node);

  const {
    frontmatter: {
      type = undefined,
      index = false
    } = {}
  } = node;



  switch (type) {
    case 'page': {
      const value = !index
        ? createFilePath({ node, getNode })
        : '/';

      createNodeField({ name: `slug`, node, value });
      break;
    }

    default: {
      // noop
    }
  }
};

//
// Create dummy field for `category` to avoid GraphQL errors on empty lists!
// This is a TEMPORARY workaround until the following epic gets implemented:
// @see: https://www.gatsbyjs.org/docs/node-apis/#setFieldsOnGraphQLNodeType
// @see: https://github.com/gatsbyjs/gatsby/issues/4261
//
exports.setFieldsOnGraphQLNodeType = ({ type, actions: { createNodeField }, getNodes }) => {

  const addFields = (node) => {
    const {
      frontmatter: {
        category = '___DUMMY___',
      } = {}
    } = node;

    // note: use `createNodeField` to make the
    // field usable for `filter`, `group` etc.
    createNodeField({
      node,
      name: 'category',
      value: category
    });
  };

  switch (type.name) {
    case 'MarkdownRemark': {
      const nodes = getNodes();
      nodes.forEach(addFields);
      break;
    }

    default: {
      // noop
    }
  }

  return {
    /* no "default" fields */
  };
};