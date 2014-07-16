function Scene(name, image, description, options) {
    // Keeping track of scene ID for saving
    this.id;
    // Name of scene
    this.name = name;
    // Image floated left
    this.image = image;
    // Scene description next to the image
    this.description = description;
    // Array of menu options
    this.options = options;
    // Searchable items for a scene
    this.searchables;
    // Journal note
    this.note;
}
/*
Once a Scene is created, all you have to do is call startScene and the scene will replace the HTML elements with the scene
    */
function startScene(name, image, description, options) {
    $("title").text("Peezy - " + name);
    $("#scene-image").attr("src", image);
    $("#scene-description").html(description);

    // Clear the options, so they don't carry over on a new scene
    $("#scene-options").text("");

    // Setting up the menu option buttons with their ids
    for (var current = 0; current < options.length; current++) {
        $("#scene-options").append("<span class='option' id=" + current + ">" + options[current].text + "</span>");
        options[current].id = current;
    }
}

function MenuOption(text, scene) {
    this.id;
    this.text = text;
    this.scene = scene;
}

function Searchable(name, link) {
    this.name = name;
    this.link = link;
}

function SceneController() {

    /* Use this variable to get or set the scenes in this game */
    this.scenes;
    var scenedata = {};
    $.ajax({
        url: "scenes.json",
        dataType: 'json',
        success: function (data) {
            scenedata = data;
        },
        async: false
    });
    //    console.log(scenedata['1']);
    this.scenes = scenedata;

    /* This is the current scene the game is on */
    this.currentScene;
    /* The menu scenes that shouldn't be manipulated by the controller */
    this.menuscenes;
}