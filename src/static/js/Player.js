var num = 0;
var hiddenPlayer = $('#hidden-player');
var player = $('#player');
var title = $('.title');
var artist = $('.artist');
var cover = $('.coverr');

function secondsTimeSpanToHMS(s) {
	var h = Math.floor(s / 3600); //Get whole hours
	s -= h * 3600;
	var m = Math.floor(s / 60); //Get remaining minutes
	s -= m * 60;
	return h + ":" + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s); //zero padding on minutes and seconds
};

var songs = [{
		src: "https://sound-ks1.cdn.missevan.com/aod/202202/25/4d34e2ba461254fcd98601030a628617_m220225a2hbfxhbt4bvkm1kwqzekr26e.m4a",
		title: "test1",
		artist: "Oddisee",
		coverart: "https://static.missevan.com/coversmini/202202/25/cf7a067b1fa9fa1e637f142961d34634183055.jpg"
	},

	{
		src: "https://s3-us-west-2.amazonaws.com/live.swipesapp.com/uploads/ONY8E94FL/1514889217-UZTYMBVGO/andy-mineo-superhuman-remix-by-kristjan-vool.mp3",
		title: "test2",
		artist: "Andy Mineo",
		coverart: "https://static.missevan.com/coversmini/202202/25/cf7a067b1fa9fa1e637f142961d34634183055.jpg"
	},

	{
		src: "http://k003.kiwi6.com/hotlink/gqfxjp1jdw/Wild_Things_remix.mp3",
		title: "Wild Things",
		artist: "Andy Mineo",
		coverart: "http://static.djbooth.net/pics-artist/andy-mineo.jpg"
	},

	{
		src: "https://s3-us-west-2.amazonaws.com/live.swipesapp.com/uploads/ONY8E94FL/1514889231-UZTYMBVGO/j-cole-work-out-remix-ver-1.mp3",
		title: "Work Out",
		artist: "J. Cole",
		coverart: "https://s3.amazonaws.com/hiphopdx-production/2014/12/J.-Cole-%E2%80%93-Apparently-e1418166093622-300x300.jpg"
	},

	{
		src: "https://s3-us-west-2.amazonaws.com/live.swipesapp.com/uploads/ONY8E94FL/1514889265-UZTYMBVGO/wild-things-remix.mp3",
		title: "Cocky",
		artist: "Andy Mineo",
		coverart: "http://static.djbooth.net/pics-artist/andy-mineo.jpg"
	}
];

var initSongSrc = songs[0].src;
var initSongTitle = songs[0].title;
var initSongArtist = songs[0].artist;
var initSongCover = songs[0].coverart;

hiddenPlayer.attr("src", initSongSrc);
title.html(initSongTitle);
artist.html(initSongArtist);
cover.attr('src', initSongCover);

hiddenPlayer.attr('order', '0');

 hiddenPlayer[0].onloadedmetadata = function() {
	var dur = hiddenPlayer[0].duration;
	var songLength = secondsTimeSpanToHMS(dur)
	var songLengthParse = songLength.split(".")[0];
	$('.time-finish').html(songLengthParse);
};

var items = songs.length - 1;

$('.next').on('click', function() {
	var songOrder = hiddenPlayer.attr('order');

	if (items == songOrder) {
		num = 0;
		var songSrc = songs[0].src;
		var songTitle = songs[0].title;
		var songArtist = songs[0].artist;
		var songCover = songs[0].coverart;
		hiddenPlayer.attr('order', '0');
		hiddenPlayer.attr('src', songSrc).trigger('play');
		title.html(songTitle);
		artist.html(songArtist);
		cover.attr('src', songCover);
	} else {
		console.log(songOrder);
		num += 1;
		var songSrc = songs[num].src;
		var songTitle = songs[num].title;
		var songArtist = songs[num].artist;
		var songCover = songs[num].coverart;
		hiddenPlayer.attr('src', songSrc).trigger('play');
		title.html(songTitle);
		artist.html(songArtist);
		cover.attr('src', songCover);
		hiddenPlayer.attr('order', num);
	}
});

$('.prev').on('click', function() {
	var songOrder = hiddenPlayer.attr('order');

	if (songOrder == 0) {
		num = items;
		var songSrc = songs[items].src;
		var songTitle = songs[items].title;
		var songArtist = songs[items].artist;
		hiddenPlayer.attr('order', items);
		hiddenPlayer.attr('src', songSrc).trigger('play');
		title.html(songTitle);
		artist.html(songArtist);
	} else {
		num -= 1;
		var songSrc = songs[num].src;
		var songTitle = songs[num].title;
		var songArtist = songs[num].artist;
		hiddenPlayer.attr('src', songSrc).trigger('play');
		title.html(songTitle);
		artist.html(songArtist);
		hiddenPlayer.attr('order', num);
	}
});

$(".play-button").click(function() {
	$(this).toggleClass("paused");
	if ($(this).hasClass("paused")) {
		hiddenPlayer[0].pause();
	} else {
		hiddenPlayer[0].play();
	}
});

hiddenPlayer.on('timeupdate', function() {
	var songLength = secondsTimeSpanToHMS(this.duration)
	var songLengthParse = songLength.split(".")[0];
	$('.time-finish').html(songLengthParse);

	var songCurrent = secondsTimeSpanToHMS(this.currentTime)
	var songCurrentParse = songCurrent.split(".")[0];
	$('.time-now').html(songCurrentParse);
	$('progress').attr("value", this.currentTime / this.duration);

	if (!hiddenPlayer[0].paused) {
		$(".play-button").removeClass('paused');
		$('progress').css('cursor', 'pointer');
		
		
		$('progress').on('click', function(e) {
			var parentOffset = $(this).parent().offset(); 
			var relX = e.pageX - parentOffset.left;
			var percPos = relX * 100 / 355;
			var second = hiddenPlayer[0].duration * parseInt(percPos) / 100;
			console.log(second);
			hiddenPlayer[0].currentTime = second;
		})
	}
	
	if (this.currentTime == this.duration) {
		$('.next').trigger('click');
	}
});