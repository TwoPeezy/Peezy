/*      
 */

var sceneID = 0;

function Scene(name, image, description, options) {
    // Keeping track of scene ID for saving
    this.id = sceneID;
    // Name of scene
    this.name = name;
    // Image floated left
    this.image = image;
    // Scene description next to the image
    this.description = description;
    // Array of menu options
    this.options = options;
    // One a Scene is created, all you have to do is call startScene and the scene will replace the HTML elements with the scene
    this.startScene = function () {
        $("title").text("Peezy - " + this.name);
        $("#scene-image").attr("src", this.image);
        $("#scene-description").html(this.description);

        // Clear the options, so they don't carry over on a new scene
        $("#scene-options").text("");

        // Setting up the menu option buttons with their ids
        for (var current = 0; current < this.options.length; current++) {
            $("#scene-options").append("<span class='option' id=" + current + ">" + this.options[current].text + "</span>");
            this.options[current].id = current;
        }
    }
}

function MenuOption(text, scene) {
    this.id;
    this.text = text;
    this.scene = scene;
}

function SceneController() {

    /* Use this variable to get or set the scenes in this game */
    this.scenes = [];
    /* This is the current scene the game is on */
    this.currentScene;
    /*
    
            >>> WARNING: SPOILERS <<<
    All of the scenes that make up the game below.
    
    */

    /*
    MENU SCENE
        */
    var menuImage = "assets/img/PeezyMain.png";
    var menuDesc = "Guy Peezy, private eye. Once upon a time, I was a cop. I didn't abide by the rules, I got cases closed on my own terms. Broken bones, a mild case of major blood loss. The police commissioner thought I was casting a bad shadow on the team, so he got rid of me. I've been solving easy cases ever since then. Missing pets weren't really my style, but I kept working, waiting for that one case that would put me into the limelight again. That was when Crystal showed up, and my career changed forever.";
    var menuOptions = [new MenuOption("New Game", 'scene1'), new MenuOption("Continue", 'scene' + localStorage.getItem("savedgame")), new MenuOption("About", 'about')];
    // This scene is under 'menu' in the dictionary
    this.scenes['menu'] = new Scene("menu", menuImage, menuDesc, menuOptions);

    /*
    PRISON SCENE
        */
    this.scenes['prison'] = new Scene("prison", "assets/img/PeezyMain.png", "You are in prison, stupid", [new MenuOption("Die", 'menu')]);
    sceneID++;

    /*
    SCENE 1
        */

    /* The image url */
    var imageURL = "assets/img/Crystal.jpg";

    /* The description */
    var description = "Stuff happens, bro.";

    /* Menu options that lead to new scenes */
    var buttonOptions = [new MenuOption("Talk to yourself", 'menu'), new MenuOption("Poop", 'scene2'), new MenuOption("Kill", 'prison')];

    /* This scene is under 'scene1' in the dictionary */
    this.scenes['scene' + sceneID] = new Scene("Crystal", imageURL, description, buttonOptions);

    /* Increment the ID so that scenes are in order scene1, scene2, scene3 */
    sceneID++;

}