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
});
