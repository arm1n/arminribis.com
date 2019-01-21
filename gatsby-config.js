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
				path: `${__dirname}/static/images`,
				name: `images`,
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
				path: `${__dirname}/src/data/photos`,
				name: `photos`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/data/categories`,
				name: `categories`,
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-relative-images',
						options: {
							name: 'images',
						},
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 2048
						},
					},
				],
			},
		},
		`gatsby-plugin-netlify-cms`,
	],
};