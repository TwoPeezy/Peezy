/*==        Scene skeletal      ==*/
function Scene(name, image, description, options) {
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
        $("#scene-image").attr("src", this.image);
        $("#scene-description").html(this.description);
        // Clear the options, so they don't carry over on a new scene
        $("#scene-options").text("");
        for (var current = 0; current < this.options.length; current++) {
            $("#scene-options").append("<span class='option' id=" + current + ">" + this.options[current].text + "</span>");
            this.options[current].id = current;
        }
    }
}
/*==        MenuOption object       ==*/
function MenuOption(text, scene) {
    this.id;
    this.text = text;
    this.scene = scene;
}

/*==    Use this object to setup Scenes ==*/
function SceneController() {
    // Scene dictionary
    this.scenes = [];
    this.currentScene;

    /*
    
            MENU SCENE
            
    */
    var menuImage = "assets/img/PeezyMain.png";
    var menuDesc = "Guy Peezy, private eye. Once upon a time, I was a cop. I didn't abide by the rules, I got cases closed on my own terms. Broken bones, a mild case of major blood loss. The police commissioner thought I was casting a bad shadow on the team, so he got rid of me. I've been solving easy cases ever since then. Missing pets weren't really my style, but I kept working, waiting for that one case that would put me into the limelight again. That was when Crystal showed up, and my career changed forever.";
    var menuOptions = [new MenuOption("New Game", 'scene1'), new MenuOption("Load Game", localStorage.getItem("savedscene")), new MenuOption("About", 'about')];
    // This scene is under 'menu' in the dictionary
    this.scenes['menu'] = new Scene("menu", menuImage, menuDesc, menuOptions);

    /*

            PRISON SCENE

    */

    var prisonImage = "assets/img/PeezyMain.png";
    var prisonDesc = "You are in prison, stupid";
    var prisonOptions = [new MenuOption("Die", 'menu')];
    this.scenes['prison'] = new Scene("prison", prisonImage, prisonDesc, prisonOptions);



    /*
    
            SCENE 1
    
    */

    var scene1Image = "assets/img/Crystal.jpg";
    var scene1Desc = "Stuff happens, bro.";
    var scene1Options = [new MenuOption("Talk to yourself", 'menu'), new MenuOption("Poop", 'poop'), new MenuOption("Kill", 'prison')];
    // This scene is under 'menu' in the dictionary
    this.scenes['scene1'] = new Scene("scene1", scene1Image, scene1Desc, scene1Options);


}