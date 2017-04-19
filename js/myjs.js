var taglist = [];
var objlist = [];
var tagsArr = [];

$.getJSON('myjson.json', function (data) {
	"use strict";
	$.each(data, function (key, val) {
		if (key === "tags") {
			taglist = val;
		} else if (key === "objects") {
			objlist = val;
		} else {
			console.log("data retrive error");
		}
	});
}).fail(function () {
	"use strict";
	console.log("json loading error");
}).always(function () {
	"use strict";
	for (var i = 0; i < taglist.length; i++) {
		$('.tag-container').append(
			'<p id=' + taglist[i].tagid + ' class="tags" style="font-size:' + taglist[i].fontsize + '">' + taglist[i].tagName + '</p>'
		);
	}
	console.log(objlist);
	for (var j = 0; j < objlist.length; j++) {
		$('tbody').append(
			'<tr><td>' + objlist[j].ID + '</td><td>' + objlist[j].Content + '</td><td>' + objlist[j].CreationDate + '</td><td>' + objlist[j].LastReviewedDate + '</td><td>' + objlist[j].NextReviewDate + '</td><td>' + objlist[j].ContentAuthor + '</td><td>' + objlist[j].ContentOwner + '</td><td>' + objlist[j].Tags + '</td><td>' + objlist[j].ForUseLater1 + '</td><td>' + objlist[j].ForUseLater2 + '</td></tr>'
		);
	}
});

$(document).ready(function () {
	'use strict';
	$('#theTable tbody').on('click', 'tr', function () {
		console.log($(this));
		$(this).toggleClass('selected');
	});
	$('.tags').click(function(){
		var temp = this;
		$(this).toggleClass('selected');
		$('#selectedTags').text(function(){
			if(tagsArr.indexOf(temp.id) + 1){
				tagsArr.splice(tagsArr.indexOf(temp.id), 1);
			}else{
				tagsArr.push(temp.id);
			}
			return "Selected Tags: " + tagsArr.join(', ');
		});
	});

});