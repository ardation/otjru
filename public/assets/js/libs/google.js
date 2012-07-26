define(
	[ "async!http://maps.google.com/maps/api/js?libraries=places&sensor=true!callback" ],
	function() {
		return {
			map: false,
			home: false,
			marker: false,
			addMapToCanvas: function( mapCanvas, myOptions, Lat, Lng ) {
            	myOptions.center = new google.maps.LatLng(Lat, Lng);
            	home = myOptions.center;
            	myOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
				map = new google.maps.Map( mapCanvas, myOptions );
			},
			goHome: function () {
				map.setCenter(home);
				map.setZoom(10);
				marker = new google.maps.Marker({
					position: home,
					map: map
				});
				marker.setAnimation(google.maps.Animation.DROP);
			},
			autocomplete: function (input) {
				var autocomplete = new google.maps.places.Autocomplete( input );

				autocomplete.bindTo('bounds', map);

				marker = new google.maps.Marker({
		          map: map
		        });

				google.maps.event.addListener(autocomplete, 'place_changed', function() {

					var place = autocomplete.getPlace();
					if (place.geometry.viewport != undefined) {
						map.fitBounds(place.geometry.viewport);
					} else {
						map.setCenter(place.geometry.location);
						map.setZoom(17);
					}
					marker.setPosition(place.geometry.location);

					marker.setAnimation(google.maps.Animation.DROP);
				});
			},
			refresh: function() {
				google.maps.event.trigger(map, 'resize');
				marker.setVisible(false);
				this.goHome();
			}
		} 
	}
);