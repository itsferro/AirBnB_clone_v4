$(document).ready(function () {
  let amenities = {};

  function search(amenities) {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
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

  search(amenities);

  $('button[type="button"]').click(function() {
    amenities = {"amenities": [$('.amenities h4').text()]};
    console.log("cliked");
    search(amenities);
  });
});
