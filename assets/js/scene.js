/*
Resource used by Peezy for each page.

Scene Composition
- title name        Goes beside the title on the window like Peezy - 'Title name'
- image             Image that gives the scene presence
- description       A gripping narrative that compells the player to tears
- button options    Different options to continue the adventure
- *searchables      Searchable items with the scene-textfield
- *note             Optional note that the player can read in the journal
    
*Asterisk = OPTIONAL. Not essential for every scene.

*/
function Scene(name, image, description, options) {
    // DON'T TOUCH. Keeping track of scene ID for saving and MenuOption links.
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
/*
Button options that show up at the bottom of the scene
    */
function MenuOption(text, scene) {
    // Relevant only for use in the engine. Serves as the index of the array.
    this.id;
    // Button text
    this.text = text;
    // Scene link
    this.scene = scene;
}
/*
Items that the player can search for in with the search textfield.
    Note: a MenuOption has to have a link to 'scene-textfield'
    */
function Searchable(name, link) {
    // Text that is searchable
    this.name = name;
    // Link to a scene
    this.link = link;
}
/*
The primary controller to scene manipulation used by the engine
    */
function SceneController() {
    // Use this variable to get or set the scenes in this game
    this.scenes;
    // This is the current scene the game is on
    this.currentScene;
    // The menu scenes that shouldn't be manipulated by the engine
    this.menuscenes;
}