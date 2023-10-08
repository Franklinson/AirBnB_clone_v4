$(document).ready(function () {
    function updateSelectedAmenities() {
        $('#selected-amenities').text(selectedAmenities.join(', '));
    }

    function checkAPIStatus() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    }

    function fetchAndDisplayPlaces() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (data) {
                $('#places').empty();

                for (var i = 0; i < data.length; i++) {
                    var place = data[i];
                    var article = $('<article>');
                    article.html('<h2>' + place.name + '</h2>' +
                                 '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                                 '<div class="information">' +
                                 '  <div class="max_guest">' + place.max_guest + ' Guests</div>' +
                                 '  <div class="number_rooms">' + place.number_rooms + ' Rooms</div>' +
                                 '  <div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div>' +
                                 '</div>' +
                                 '<div class="description">' + place.description + '</div>');
                    $('#places').append(article);
                }
            }
        });
    }

    var selectedAmenities = [];

    $('input[type="checkbox"]').change(function () {
        var amenityID = $(this).data('id');
        var amenityName = $(this).data('name');

        if (this.checked) {
            selectedAmenities.push(amenityName);
        } else {
            var index = selectedAmenities.indexOf(amenityName);
            if (index !== -1) {
                selectedAmenities.splice(index, 1);
            }
        }

        updateSelectedAmenities();
    });

    checkAPIStatus();

    setInterval(checkAPIStatus, 10000);

    fetchAndDisplayPlaces();

	$(".filters button").bind("click", searchPlace);
	searchPlace();
});
