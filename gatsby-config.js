module.exports = {
  	plugins: [
  		`gatsby-plugin-svg-sprite`,
  		`gatsby-plugin-react-helmet`,
  		{
  			resolve: `gatsby-plugin-sass`,
  			options: {
				includePaths: [
					'src/styles',
					'src/images',
				],
			},
	  	},
	  	{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/pages`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/static/images`,
				name: `images`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-relative-images`,
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 650,
						},
					},
				]
			}
		},
		`gatsby-plugin-netlify-cms`,
	],
};