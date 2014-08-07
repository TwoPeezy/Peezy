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
Replaces the html information with the provided information from a scene
    */
function startScene(scene) {
    $("title").text("Peezy - " + scene.name);
    $("#scene-image").attr("src", scene.image);
    $("#scene-description").html(scene.description);

    // Clear the options, so they don't carry over on a new scene
    $("#scene-options").text("");

    // Setting up the menu option buttons with their ids
    for (var current = 0; current < scene.options.length; current++) {
        $("#scene-options").append("<span class='option' id=" + current + ">" + scene.options[current].text + "</span>");
        scene.options[current].id = current;
    }
}

function MenuOption(text, scene) {
    // Relevant only for use in the engine. Serves as the index of the array.
    this.id;
    // Button text
    this.text = text;
    // Scene link
    this.scene = scene;
}

function Searchable(name, link) {
    // Text that is searchable
    this.name = name;
    // Link to a scene
    this.link = link;
}

function SceneController() {
    // Use this variable to get or set the scenes in this game
    this.scenes;
    // This is the current scene the game is on
    this.currentScene;
    // The menu scenes that shouldn't be manipulated by the controller
    this.menuscenes;
}