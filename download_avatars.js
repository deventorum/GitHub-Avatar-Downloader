const request = require('request');
const fs = require('fs');

//accesing authorization token
const token = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  
	// make an API request passing an authorization data to the header
	var options = {
		url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
		headers: {
			'User-Agent': 'request',
			Authorization: `token ${token.GITHUB_TOKEN}`
		}
	};
  
	request(options, function(err, res, body) {
		cb(err, body);
	});
}

getRepoContributors('jquery', 'jquery', function(err, result) {
	result = JSON.parse(result);
	// Helper function is being called for every contributor to save avatar images
	result.forEach(element => {
		downloadImageByURL(element.avatar_url, `./avatar/${element.login}.jpg`);
	});
});

// Helper function that downloads images based on the provided links
function downloadImageByURL(url, filePath) {
	request.get(url)            
		.on('error', function (err) {                                  
			throw err; 
		})
		.pipe(fs.createWriteStream(filePath));
		
}