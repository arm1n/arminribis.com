module.exports = {
  	plugins: [
  		`gatsby-plugin-react-helmet`,
  		{
  			resolve: `gatsby-plugin-sass`,
  			options: {
				includePaths: ['src/styles'],
			},
	  	},
	  	{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/pages`,
				name: `pages`,
			},
		},
		`gatsby-transformer-remark`,
		`gatsby-plugin-netlify-cms`,
	],
}