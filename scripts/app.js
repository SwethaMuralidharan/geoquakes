// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint,
    dataType: 'json',
    success: onSuccess

  })

  function onSuccess(obj)
  {
      console.log(obj.features);
       var Customimage = {
      url: "images/earthquake.png",
      scaledSize: new google.maps.Size(20,20)
                   }
      var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: 37.78, lng: -122.44},
              zoom: 6
            });

      $.each(obj.features,function(k,v){
        $('#info').append(`<p> ${obj.features[k].properties.title} /
           ${new Date(obj.features[k].properties.time).getHours()} hours ago. </p>`)


      var lat=obj.features[k].geometry.coordinates[1];
      var long=obj.features[k].geometry.coordinates[0];

      var marker = new google.maps.Marker({
          position: { lat: lat,
                      lng: long
                    },
          map:map,
          title:obj.features[k].properties.title,
          icon:Customimage

      });
        marker.setMap(map);
        attachSecretMessage(marker,obj.features[k].properties.title);

      function attachSecretMessage(marker, secretMessage) {
             var infowindow = new google.maps.InfoWindow({
               content: secretMessage
             });

             marker.addListener('click', function() {
               infowindow.open(marker.get('map'), marker);
             });
           }



})

  };

});
