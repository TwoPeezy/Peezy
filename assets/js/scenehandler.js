/*      
 */
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

    /*
    MENU SCENE
        */
    var menuImage = "assets/img/PeezyMain.png";
    var menuDesc = "Guy Peezy, private eye. Once upon a time, I was a cop. I didn't abide by the rules, I got cases closed on my own terms. Broken bones, a mild case of major blood loss. The police commissioner thought I was casting a bad shadow on the team, so he got rid of me. I've been solving easy cases ever since then. Missing pets weren't really my style, but I kept working, waiting for that one case that would put me into the limelight again. That was when Crystal showed up, and my career changed forever.";
    var menuOptions = [new MenuOption("New Game", '1'), new MenuOption("Continue", "" + localStorage.getItem("savedgame")), new MenuOption("About", 'about')];
    // This scene is under 'menu' in the dictionary
    this.scenes["menu"] = new Scene("Noire", menuImage, menuDesc, menuOptions);
    this.scenes["menu"].id = "menu";

    /* This is the current scene the game is on */
    this.currentScene;

    console.log(JSON.stringify(this.scenes));

}