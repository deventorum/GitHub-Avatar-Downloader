const request = require('request');

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
	console.log('Errors:', err);
	console.log('Result:', result);
});