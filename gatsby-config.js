module.exports = {
  	plugins: [
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
	  	{
	  		resolve: `gatsby-plugin-netlify-cms`,
	  	},
	  	{
	  		resolve: `gatsby-plugin-react-helmet`
	  	}
	],
}