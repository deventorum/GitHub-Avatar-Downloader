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
	let contibutorList = [];
	result = JSON.parse(result);
  
	// It creates an array with URL links for avatars
	result.forEach(element => {
		contibutorList.push(element.avatar_url);
	});
	console.log(contibutorList);
});

// Helper function that downloads images based on the provided links
function downloadImageByURL(url, filePath) {
	request.get(url)            
		.on('error', function (err) {                                  
			throw err; 
		})
		.on('response', function (response) {                           
			console.log('Response Status Code: ', response.statusMessage);
			console.log('Content Type: ', response.headers['content-type']);
			console.log('Downloading image...');
		})
		.pipe(fs.createWriteStream(filePath))
		.on('finish', function() {
			console.log('Download is completed');
		}); 
}
downloadImageByURL('https://avatars1.githubusercontent.com/u/43004?v=4', 'avatar/1.jpg');