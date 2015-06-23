var socket = io(' http://13eacc9b.ngrok.io');
var videos = [];
var i;

function getVideos(location) {
  return $.ajax({
    url: 'https://api.instagram.com/v1/tags/' + location + '/media/recent?client_id=fee1f7a9b22c41149f86e7a44f199935',
    dataType: 'jsonp'
  }).done(function (response) {
    console.log(response);
    for (i = 0; i < 20; i++) {
      if (response.data[i].type === "video" && videos.indexOf(response.data[i].id) === -1) {
        if (videos.length >= 5) {
          return;
        } else {
          $('#video-container').prepend('<li><video src="' + response.data[i].videos.low_resolution.url + '" controls></video></li>');
          videos.push(response.data[i].id);
        }
      }
    }
  });
}

socket.on('connect', function () {
  console.log('Connected!');
});

socket.on('instagram', function () {
  getVideos();
});
