var map;

function initializeMap() {
	var locations = ["Toronto, ON", "Mississaugua, ON", "Grand Valley, ON", "Britt, ON", "Ayr, Scotland"];

	var mapOptions = {
		disableDefaultUI: true
	};

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	

	function createMapMarker(placeData) {
		var lat = placeData.geometry.location.lat();
		var lon = placeData.geometry.location.lng();
		var name = placeData.formatted_address;
		var bounds = window.mapBounds;

		console.log(bounds);

		var marker = new google.maps.Marker({
			map: map,
			position: placeData.geometry.location,
			title: name,
			animation: google.maps.Animation.DROP
		});


		var infoWindow = new google.maps.InfoWindow ({
			content: "<p>" + name + "</p>" + "<br>"
		});

		google.maps.event.addListener(marker, 'click', function() {
			console.log("Map clicked");
			infoWindow.open(map, marker);
		});

		bounds.extend(new google.maps.LatLng(lat, lon));
		map.fitBounds(bounds);
		map.setCenter(bounds.getCenter());
	}



	function callBack(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMapMarker(results[0]);
		}
	}


	function pinPoster(locations) {
		var service = new google.maps.places.PlacesService(map);

		for (var place in locations) {
			var request = {
				query: locations[place]
			};

			service.textSearch(request, callBack);
		}
		
	}

	window.mapBounds = new google.maps.LatLngBounds();
	pinPoster(locations);


}


window.addEventListener('load', initializeMap);
window.addEventListener('resize', function(e) {
	map.fitBounds(mapBounds);
});
