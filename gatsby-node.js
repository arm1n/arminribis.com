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
            menu,
            seo: {
              title
            }
          }
        }
      } = edge;

      let component = `src/templates/${template}.jsx`;
      component = path.resolve(component);

      console.log(title, menu);

      createPage({
        path: slug,
        component,
        context: {
          id,
          menu,
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
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            },
            frontmatter {
              template,
              seo {
                title
              },
              menu
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
  
  // add `slug` field to node
  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const value = createFilePath({ node, getNode });
      createNodeField({ name: `slug`, node, value });
      break;
    }

    default:
  }

  // make relative image paths
  fmImagesToRelative(node);
};