// Variables that accessing modules
const request = require('request');
const fs = require('fs');
const token = require('./secrets.js');

// Variables that tracks user's input
const userInput = process.argv.slice(2);
const ownerName = userInput[0];
const repoName = userInput[1];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  
	if (repoOwner == undefined || repoName == undefined) {
		throw 'Repo owner name and/or repo have been specified incorrectly, please provide valid arguments';
	}
	// creates an avatar folder
	fs.mkdir('./avatar', function(err) {
		console.log('Error :', err);
	});
	// make an API request passing an authorization data to the header
	const options = {
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

getRepoContributors(ownerName, repoName, function(err, result) {
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
		.pipe(fs.createWriteStream(filePath))
	  // UI to notify user about the progress
		.on('finish', function() {
			console.log('Image has been downloaded');
		}); 
}