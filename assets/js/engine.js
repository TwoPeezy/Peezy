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
        console.log(nextScene);

        if (sceneController.currentScene.options[this.id].scene == "scene-textfield") {
            $("#scene-textfield").toggle();
        } else {
            // Start the next scene
            startScene(nextScene.name, nextScene.image, nextScene.description, nextScene.options);
            sceneController.currentScene = nextScene;

            // Saving the current scene so that the player can come back to it later.
            // Also making sure it doesn't save state as a menu
            if ((nextScene.id != "menu") && (nextScene.id != "prison") && (nextScene.id != "about")) {
                try {
                    localStorage.setItem("savedgame", nextScene.id);
                } catch (e) {
                    console.log("Can't save progress" + e.message);
                }
            }
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
                var text = $("#search").val();
                if (sceneController.currentScene.searchables["" + text] != null) {

                    var nextScene = sceneController.scenes[sceneController.currentScene.searchables["" + text]];
                    startScene(nextScene.name, nextScene.image, nextScene.description, nextScene.options);
                    sceneController.currentScene = nextScene;
                    $("#scene-textfield").toggle();
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
});