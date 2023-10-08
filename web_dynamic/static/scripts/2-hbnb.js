$(document).ready(function () {
    var selectedAmenities = [];

    function updateSelectedAmenities() {
        $('#selected-amenities').text(selectedAmenities.join(', '));
    }

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

	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});
});
