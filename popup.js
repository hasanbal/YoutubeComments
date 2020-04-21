var curUrl = "";
var params;
var res="";

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	curUrl= tabs[0].url;
});

function hello() {

	if(curUrl.search("youtube.com") == -1 || curUrl.search("v=") == -1){
		document.getElementById("comments").innerHTML = "yorumlari gorebilmek icin bir youtube videosuna girmelisin.";
		return;
	}

	var videoID = curUrl.substr(curUrl.search("v=")+2, 11);
	var maxResults = 100;
	var APIkey = "";
	
	
	params = {
		"part" : "snippet",
		"videoId" : videoID,
		"maxResults" : maxResults,
		"key" : APIkey
	}

	$.get("https://www.googleapis.com/youtube/v3/commentThreads?", params , function(data){
		for(i in data.items){
			
			res += data.items[i].snippet.topLevelComment.snippet.authorDisplayName + "<br>";
			res += data.items[i].snippet.topLevelComment.snippet.textOriginal + "<hr>";
		}

		nextPageToken = data.nextPageToken;

		document.getElementById("comments").innerHTML = res;
	});
}
function goNextPage(){
	params.pageToken = nextPageToken;
	//var res="";
	$.get("https://www.googleapis.com/youtube/v3/commentThreads?", params , function(data){
		for(i in data.items){
			
			res += data.items[i].snippet.topLevelComment.snippet.authorDisplayName + "<br>";
			res += data.items[i].snippet.topLevelComment.snippet.textOriginal + "<hr>";
		}

		nextPageToken = data.nextPageToken;
		if(nextPageToken != null){
			res += "";
		}

		document.getElementById("comments").innerHTML = res;
	});
}

document.getElementById('clickme').addEventListener('click', hello);
document.getElementById('goNextPage').addEventListener('click', goNextPage);
//document.getElementById('getLyrics').addEventListener('click', getLyrics);
