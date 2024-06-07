$(document).ready(function () {
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

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

  let amenities = {};

  function search(amenities) {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(amenities),
      success: function (data) {
        $.each(data, function (index, place) {
          const article = $('<article></article>');
          const titleBox = $('<div class="title_box"></div>');
          const name = $('<h2>' + place.name + '</h2>');
          const priceByNight = $('<div class="price_by_night">$' + place.price_by_night + '</div>');

          titleBox.append(name);
          titleBox.append(priceByNight);

          const information = $('<div class="information"></div>');
          const maxGuest = $('<div class="max_guest">' + place.max_guest + ' Guests</div>');
          const numberRooms = $('<div class="number_rooms">' + place.number_rooms + ' Rooms</div>');
          const numberBathrooms = $('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div>');

          information.append(maxGuest);
          information.append(numberRooms);
          information.append(numberBathrooms);

          const description = $('<div class="description">' + place.description + '</div>');

          article.append(titleBox);
          article.append(information);
          article.append(description);

          $('.places').append(article);
        });
      }
    });
  };

  search('');

  $('button[type="button"]').click(function() {
    if (selectedAmenities != '') {
      amenities = {"amenities": selectedAmenities};
    } else {
      amenities = {selectedAmenities};
    }
    console.log(amenities);
    $('.places').empty();
    search(amenities);
  });
});
