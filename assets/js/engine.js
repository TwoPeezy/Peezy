var sceneController;
var isMobile;
$(document).ready(function () {

    init();
    checkScreenSize();
    //    localStorage.clear();


    /*  
    GAME INIT
        */
    function init() {
        // New Scene controller
        sceneController = new SceneController();
        /*
    MENU SCENE - Need to create here, because of Continue functionality
        */
        var menuImage = "assets/img/0-Menus/PeezyMain.png";
        var menuDesc = "<p>The name's Guy Peezy, private eye. Once upon a time, I was a cop. I didn't abide by the rules, I got cases closed on my own terms. Broken bones, a mild case of major blood loss. The police commissioner thought I was casting a bad shadow on the team, so he got rid of me.</p><p> I've been solving easy cases ever since then. Missing pets weren't really my style, but I kept working, waiting for that one case that would put me into the limelight again. That was when Crystal showed up, and my career changed forever.</p>";
        var menuOptions = [new MenuOption("New Game", '1.0.0'), new MenuOption("Continue", localStorage.getItem("savedgame")), new MenuOption("About", 'about')];
        // This scene is under 'menu' in the dictionary
        sceneController.scenes["menu"] = new Scene("Noire", menuImage, menuDesc, menuOptions);
        sceneController.scenes["menu"].id = "menu";
        sceneController.scenes["menu"].note = "Yay! Past the main menu. I've got the hang of this.";

        // Define the menu scenes
        sceneController.menuScenes = ["menu", "prison", "about"];

        // Get the menu from the current scenes
        var menu = sceneController.scenes.menu;
        // Start the menu
        startScene(menu.name, menu.image, menu.description, menu.options);
        sceneController.currentScene = menu;

        // Change the css of the continue button if there's no saved game
        if (localStorage.getItem("savedgame") == null) {
            $("#1").css("display", "none");
        }
    }

    /*
    Click Handler
        */
    $("#scene-options").on('click', '.option', function () {

        // Getting the scene that the button has
        var nextScene = sceneController.scenes[sceneController.currentScene.options[this.id].scene];
        if (sceneController.currentScene.options[this.id].scene == "scene-textfield") {
            // Toggle the textfield because they selected it
            $("#scene-textfield").toggle();
        } else if (sceneController.currentScene.options[this.id].scene == "menu") {
            // Reloading because I want those menu options back
            location.reload();
        } else {
            // Make sure that the search box isn't open
            $("#scene-textfield").hide();
            // Saving the current scene so that the player can come back to it later.
            // Also making sure it doesn't save state as a menu
            if (sceneController.menuScenes.indexOf(nextScene.id) == -1) {

                // If the next scene has a lower ID value than the current scene, the player must be going backwards.
                console.log((nextScene.id.split(".")[1]));
                console.log((sceneController.currentScene.id.split(".")[1]));
                var nextSetting = nextScene.id.split(".");
                var thisSetting = sceneController.currentScene.id.split(".");
                console.log(nextSetting[1]);
                console.log(thisSetting[1]);
                console.log(nextSetting[2]);
                console.log(thisSetting[2]);

                if ((nextSetting[1] > thisSetting[1] && nextSetting[2] > thisSetting[2]) || nextSetting[0] > thisSetting[0]) {

                    try {
                        // Try to save the game
                        localStorage.setItem("savedgame", nextScene.id);
                    } catch (e) {
                        console.log("Can't save progress\n" + e.message);
                    }
                } // We're going background, so lets remove the option we've traversed 
                else {
                    console.log("The current scene is either higher than nextScene or it's a menu.");
                    // Remove the option for the current scene just went through
                    //Before
                    if (sceneController.menuScenes.indexOf(sceneController.currentScene.id) == -1) {
                        console.log(JSON.stringify(sceneController.scenes['' + sceneController.currentScene.id].options));
                        sceneController.scenes['' + sceneController.currentScene.id].options.remove(this.id - 0, this.id - 0);
                        //After remove
                        console.log(JSON.stringify(sceneController.scenes['' + sceneController.currentScene.id].options));

                    }
                }
                try {
                    // Try to save the note from the scene
                    var journalNotes = JSON.parse(localStorage.getItem("notes"));
                    // Get current note
                    var note = sceneController.currentScene.note;
                    // Create a new array if it's null
                    if (journalNotes == null)
                        journalNotes = [];
                    if ((journalNotes.indexOf(note) == -1) && (note != null)) {
                        journalNotes.push(note);
                        localStorage.setItem("notes", JSON.stringify(journalNotes));
                    }
                } catch (e) {
                    console.log("Can't save note\n" + e.message);
                }
                console.log(localStorage.getItem("notes"));
            }
            // Start the next scene
            startScene(nextScene.name, nextScene.image, nextScene.description, nextScene.options);

            // Set the next scene
            sceneController.currentScene = nextScene;
            // Scroll to the top of the window after option is clicked
            window.scrollTo(0, 0);
        }
    });

    /* END OF CLICK LISTENER */

    /*
    Textfield handler
        */
    $(".textfield").keydown(function (event) {
        // If enter key is hit
        if (event.keyCode == 13) {
            if (sceneController.currentScene.searchables != null) {
                var text = $("#search").val().toLowerCase();
                console.log("Entered text: " + text);
                console.log("Searchables:" + JSON.stringify(sceneController.currentScene.searchables));
                if (sceneController.currentScene.searchables["" + text] != null) {
                    $("#search-message").css("display", "none");
                    var nextScene = sceneController.scenes[sceneController.currentScene.searchables["" + text]];
                    startScene(nextScene.name, nextScene.image, nextScene.description, nextScene.options);
                    sceneController.currentScene = nextScene;
                    $("#scene-textfield").toggle();
                } else {
                    $("#search-message").css("display", "inline");
                }
            }
        }
    });

    /*
    Mobile support - Screen resizing
        */
    function checkScreenSize() {
        if ((window.innerWidth / window.innerHeight) < 4 / 3) {
            $("#scene-image").css("float", "none");
        }
    }
    /*
    If they can resize, they're not on mobile
        */
    $(window).resize(function () {
        $("#scene-image").css("float", "left");
        checkScreenSize();
    });
    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
});