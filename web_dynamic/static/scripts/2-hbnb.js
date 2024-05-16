$(document).ready(function () {
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  const selectedAmenities = [];

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');

    if ($(this).is(':checked')) {
      selectedAmenities.push(amenityId);
    } else {
      const index = selectedAmenities.indexOf(amenityId);
      if (index !== -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    const amenitiesNames = [];
    selectedAmenities.forEach(function (id) {
      const amenityName = $('input[type="checkbox"][data-id="' + id + '"]').data('name');
      amenitiesNames.push(amenityName);
    });

    $('.amenities h4').text(amenitiesNames.join(', '));
  });
});
