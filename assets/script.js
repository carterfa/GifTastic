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

function getGif(){
    let animalName = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2&q="+animalName+"&limit=10&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        Method: "GET"
    }).then (function (response) {

        console.log(response.data[0].images.downsized.url);



    })
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

});