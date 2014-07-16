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
        sceneController = new SceneController();
        var menu = sceneController.scenes.menu;
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
            $("#scene-textfield").toggle();
        } else {
            // Saving the current scene so that the player can come back to it later.
            // Also making sure it doesn't save state as a menu
            if ((nextScene.id != "menu") && (nextScene.id != "prison") && (nextScene.id != "about")) {

                // If the next scene has a lower ID value than the current scene, the player must be going backwards.
                console.log((nextScene.id.split(".")[1]));
                console.log((sceneController.currentScene.id.split(".")[1]));
                var nextSetting = nextScene.id.split(".");
                var thisSetting = sceneController.currentScene.id.split(".");
                if ((nextSetting[1] > thisSetting[1] && nextSetting[2] > thisSetting[2]) || nextSetting[0] > thisSetting[0]) {

                    try {
                        // Try to save the game
                        localStorage.setItem("savedgame", nextScene.id);
                    } catch (e) {
                        console.log("Can't save progress\n" + e.message);
                    }


                    try {
                        // Try to save the note from the scene
                        var journalNotes = JSON.parse(localStorage.getItem("notes"));
                        // Get current note
                        var note = sceneController.currentScene.note;
                        // Create a new array if it's null
                        if (journalNotes == null)
                            journalNotes = [];
                        if (journalNotes.indexOf(note) == -1 && note != null) {
                            journalNotes.push(note);
                            localStorage.setItem("notes", JSON.stringify(journalNotes));
                        }
                    } catch (e) {
                        console.log("Can't save note\n" + e.message);
                    }
                } // We're going background, so lets remove the option we've traversed 
                else {
                    // Remove the option for the current scene just went through
                    //Before
                    if ((sceneController.currentScene.id != "menu") && (sceneController.currentScene.id != "prison") && (sceneController.currentScene.id != "about")) {
                        console.log(JSON.stringify(sceneController.scenes['' + sceneController.currentScene.id].options));
                        sceneController.scenes['' + sceneController.currentScene.id].options.remove(this.id);
                        //After remove
                        console.log(JSON.stringify(sceneController.scenes['' + sceneController.currentScene.id].options));

                    }
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