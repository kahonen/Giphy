// Initial array of animals
var topics = ["Pug", "Gerbil", "Ocelot", "Cat"];

      // displayAnimal Info function re-renders the HTML to display the appropriate content
      function displayAnimalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=z3IYXmfH8xVYKSADBYTbw6Yt7VbwWLZJ&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function (response) {

        $("#animal-view").empty();

          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            // Creating a div to hold the movie
            var animalDiv = $("<div class = align>");
            var stillImg = results[i].images.fixed_height_still.url;
            var image = $("<img>");
            image.attr("src", stillImg);
            image.attr('data-still', stillImg);
            image.attr('data-animated', results[i].images.fixed_height.url);
            image.attr('state', 'still');
            image.addClass('giphy');

            // Appending the image
            animalDiv.append(image);

            // Storing the rating data
            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            animalDiv.append(pOne);

            // Retrieving the URL for the image
            

            $("#animal-view").prepend(animalDiv);

          }
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();


        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").prepend(a);
        }
      }
      function clickAnimate() {
        var state = $(this).attr('state');
        if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animated'));
          $(this).attr('state', 'animated');
        }
        else {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('state', 'still');
        }
      }
      // This function handles events where a movie button is clicked
      $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".animal", displayAnimalInfo);
      $(document).on("click", ".giphy", clickAnimate);


      // Calling the renderButtons function to display the intial buttons
      renderButtons();