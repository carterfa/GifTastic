let animals = ["dog", "rabbit", "black cat"];

function renderbuttons(){
    $("#buttonBar").empty();
    for (let i =0; i < animals.length; i++){
        let animalBtn = $("<BUTTON>").text(animals[i]);
        $("#buttonBar").append(animalBtn);
    }
}

function add (newAnimal) {

    animals.push(newAnimal);

    renderbuttons();


}

$(document).ready(function (){
    renderbuttons();

    $("#addAnimal").on("click", function () {
        
        event.preventDefault();

        let newAnimal = $("#animalInput").val().trim();

        add(newAnimal);

    })

});