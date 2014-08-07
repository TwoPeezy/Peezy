var sceneController;
var isMobile;
$(document).ready(function () {
    init();
    checkScreenSize();

    /*  
    GAME INIT
        */
    function init() {
        // New Scene controller
        sceneController = new SceneController();
        // Getting the scenes from scenes.json
        $.ajax({
            url: "scenes.json",
            dataType: 'json',
            success: function (data) {
                sceneController.scenes = data;
            },
            async: false
        });
        /*
        MENU SCENE - Need to create here, because of Continue functionality
            */
        var menuImage = "assets/img/Menus/PeezyMain.png";
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

        /*
        START THE MENU SCENE
            */
        startScene(menu);
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

        // Getting scene from clicked button
        var nextScene = sceneController.scenes[sceneController.currentScene.options[this.id].scene];

        /* 
        Clicked option conditons
            */

        //TEXTFIELD
        if (sceneController.currentScene.options[this.id].scene == "scene-textfield") {
            // Toggle the textfield because they selected it
            $("#scene-textfield").toggle();
        }
        // MENU
        else if (sceneController.currentScene.options[this.id].scene == "menu") {
            // Reloading because I want those menu options back
            location.reload();
        }
        // SCENE
        else {
            // Make sure that the search box isn't open
            $("#scene-textfield").hide();

            // Saving the current scene so that the player can come back to it later. Also making sure it doesn't save state as a menu.
            if (sceneController.menuScenes.indexOf(nextScene.id) == -1) {

                // If the next scene has a lower ID value than the current scene, the player must be going backwards.
                var nextSetting = nextScene.id.split(".");
                var thisSetting = sceneController.currentScene.id.split(".");

                // Checking first value of ID (setting), second value (scene), and third value (scene fork)
                // If the player is moving FORWARDS, save the game automatically
                if ((nextSetting[1] > thisSetting[1] && nextSetting[2] > thisSetting[2]) || nextSetting[0] > thisSetting[0]) {

                    try {
                        // Try to save the game
                        localStorage.setItem("savedgame", nextScene.id);
                    } catch (e) {
                        console.log("Can't save progress\n" + e.message);
                    }
                }
                // We're going BACKWARD, so lets remove the option we've traversed from view
                else {
                    // If the current scene is not a menu scene...
                    if (sceneController.menuScenes.indexOf(sceneController.currentScene.id) == -1) {
                        // Remove from the scenes array
                        sceneController.scenes['' + sceneController.currentScene.id].options.remove(this.id - 0, this.id - 0);
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
                    // Make sure the note is not already in the array, and it's not null
                    if ((journalNotes.indexOf(note) == -1) && (note != null)) {
                        // Push the note onto the array
                        journalNotes.push(note);
                        // Save the notes to local storage
                        localStorage.setItem("notes", JSON.stringify(journalNotes));
                    }
                } catch (e) {
                    console.log("Can't save note\n" + e.message);
                }
                // Log the notes to the console
                console.log(localStorage.getItem("notes"));
            }
            // Start the next scene
            startScene(nextScene);
            // Set the next scene
            sceneController.currentScene = nextScene;
            // Scroll to the top of the window after option is clicked
            window.scrollTo(0, 0);
        }
    });

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
                    startScene(nextScene);
                    sceneController.currentScene = nextScene;
                    $("#scene-textfield").toggle();
                } else {
                    $("#search-message").css("display", "block");
                }
            }
        }
    });

    /*------- NEEDS TO BE REFACTORED, BADLY ------ */

    /*
    Mobile support - Screen resizing
        */
    function checkScreenSize() {
        if ((window.innerWidth / window.innerHeight) < 4 / 3) {
            $("#scene-image").css("float", "none");
            $("#image-div").css("text-align", "center");
        }
    }
    /*
    If they can resize, they're not on mobile
        */
    $(window).resize(function () {
        $("#scene-image").css("float", "left");
        $("#image-div").css("text-align", "left");
        checkScreenSize();
    });

    /* -------------------------------------------- */

    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
});