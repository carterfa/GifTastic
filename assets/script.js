//array of animals
let animals = ["dog", "rabbit", "black cat"];

//adds buttons to page
function renderbuttons() {
    //clears header of buttons
    $("#buttonBar").empty();
    //adds buttons for all animals in array
    for (let i = 0; i < animals.length; i++) {
        //creates new button
        let animalBtn = $("<BUTTON>").text(animals[i].toUpperCase());
        //adds button to section
        $("#buttonBar").append(animalBtn);
        //gives button class and unique attribute
        animalBtn.attr("class", "animalBtn");
        animalBtn.attr("data-name", animals[i])
    }
}

//adds new animal button to page
function add(newAnimal) {
    //adds new animal to array
    animals.push(newAnimal);
    //rerenders buttons
    renderbuttons();


}

function getGif() {
    //takes animal name from input entered
    let animalName = $(this).attr("data-name");

    //object containing parameters 
    const queryParams = {
        "api_key": "CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2",
        q: animalName,
        "limit": 10,
        "offset": 0,
        "rating": "G",
        "lang": "en"
    };
    //call parameters from object
    let paramString = $.param(queryParams);
    let queryURL = "https://api.giphy.com/v1/gifs/search?" + paramString;
    //queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2&q=" + animalName + "&limit=10&offset=0&rating=G&lang=en"

    $.ajax({
        //calls giphy search
        url: queryURL,
        Method: "GET"
    }).then(function (response) {
        console.log(response);
        //creates image div for each item in response
        for (let i = 0; i < response.data.length; i++) {
            const gifContent = `<div class="col-2.4">
            ${"<img src=" + response.data[i].images.fixed_width_still.url + "/>"}</div>`
            $("#gifRow").prepend(gifContent);

        }


    })
}

function stopStartGif() {
    //grabs image source attribute
    let imageURL = $(this).attr("src");
    //amends image url to either still or active version
    if (imageURL.includes("200w_s")) {
        imageURL = imageURL.replace("200w_s", "200w");
    }
    else {
        imageURL = imageURL.replace("200w", "200w_s")
    }
    //changes attribute in the DOM
    $(this).attr("src", imageURL)


}
//waits for page to load before running function
$(document).ready(function () {
    //renders inital set of animals
    renderbuttons();

    //takes user submission and adds button
    $("#addAnimal").on("click", function () {

        //prevents page from refreshing
        event.preventDefault();

        //takes info from text box
        let newAnimal = $("#animalInput").val().trim();

        //prevents user from adding blank button
        if (newAnimal) {
            add(newAnimal);
        }


    })

    //searches for gifs on user click
    $(document).on("click", ".animalBtn", getGif);

    //runs stops and starts gif on user click
    $(document).on("click", "img", stopStartGif)

});