// Initial array of animals

var topics = ["Dog", "Cat", "rabbit", "hamster", "skunk", "goldfish"];
// displayanimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {
    var topics = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
    }).then(function (response) {
        // Creating a div to hold the animal
        var animalDiv = $("<div class='animal'>");
        // Retrieving the URL for the image
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height.url);
            image.attr("data-still", results[i].images.fixed_height_still.url);
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-state", "still");
            image.addClass("gif");
            animalDiv.append(image);
            $("#animal-view").prepend(animalDiv);
            console.log(topics)
        }
    });
}
// Function for displaying animal data
function renderButtons() {
    // Deleting the animals prior to adding new animals
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of animals
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generating buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of animal-btn to our button
        a.addClass("animal-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();
    // Adding animal from the textbox to our array
    topics.push(animal);
    renderButtons();
});
// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);
// Calling the renderButtons function to display the intial buttons
renderButtons();