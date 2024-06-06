$(document).ready(function () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
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
