$(document).ready(function() {
  let selectedAmenities = [];

  $('input[type="checkbox"]').change(function() {
    let amenityId = $(this).data('id');

    if ($(this).is(':checked')) {
      selectedAmenities.push(amenityId);
    } else {
      let index = selectedAmenities.indexOf(amenityId);
      if (index !== -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    let amenitiesNames = [];
    selectedAmenities.forEach(function(id) {
      let amenityName = $('input[type="checkbox"][data-id="' + id + '"]').data('name');
      amenitiesNames.push(amenityName);
    });

    $('.amenities h4').text(amenitiesNames.join(', '));
  });
});
