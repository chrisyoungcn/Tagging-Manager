var taglist = [];
var objlist = [];
var tagsArr = [];

getDataFromJSON();
//I used AJAX to retrieve data from JSON file, you may want to edit this part to retrieve data from back end database
function getDataFromJSON() {
	'use strict';
	$.getJSON('myjson.json', function (data) {
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
		console.log("json loading error");
	}).always(function () {
		visualizeTags();
		visualizeItems();
	});
}

function visualizeTags() {
	'use strict';
	for (var i = 0; i < taglist.length; i++) {
		$('.tag-container').append(
			'<p id=' + taglist[i].tagid + ' class="tags" style="font-size:' + taglist[i].fontsize + '">' + taglist[i].tagName + '</p>'
		);
	}
}

function visualizeItems() {
	'use strict';
	for (var j = 0; j < objlist.length; j++) {
		$('tbody').append(
			'<tr><td>' + objlist[j].ID + '</td><td>' + objlist[j].Content + '</td><td>' + objlist[j].CreationDate + '</td><td>' + objlist[j].LastReviewedDate + '</td><td>' + objlist[j].NextReviewDate + '</td><td>' + objlist[j].ContentAuthor + '</td><td>' + objlist[j].ContentOwner + '</td><td>' + objlist[j].Tags + '</td><td>' + objlist[j].ForUseLater1 + '</td><td>' + objlist[j].ForUseLater2 + '</td></tr>'
		);
	}
}

function clearTable(){
	'use strict';
	$('tbody').empty();
}


$(document).ready(function () {
	'use strict';
	

	$('#theTable tbody').on('click', 'tr', function () {
		$(this).toggleClass('selectedItems');
	});
	
	$('.tags').click(function () {
		var temp = this;
		$(this).toggleClass('selectedTags');
		$('#selectedTags').text(function () {
			if (tagsArr.indexOf(temp.id) + 1) {
				tagsArr.splice(tagsArr.indexOf(temp.id), 1);
			} else {
				tagsArr.push(temp.id);
			}
			return "Selected Tags: " + tagsArr.join(', ');
		});
	});

	$('#addcolume').click(function () {
		clearTable();
		console.log(typeof $('.selectedTags'));
		objlist.push({"ID": objlist.length,
			"Content": $('#cinput').val(),
			"CreationDate": "Saturday, November 26, 2016 18:00:00",
			"LastReviewedDate": "Tuesday, March 15, 2017 18:00:00",
			"NextReviewDate": "Friday, May 10, 2017 18:00:00",
			"ContentAuthor":"CY",
			"ContentOwner":"CT",
			"Tags": $('.selectedTags').text(),
			"ForUseLater1":"",
			"ForUseLater2":""});
		visualizeItems();
	});
});
