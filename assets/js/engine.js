var sceneController;
$(document).ready(function () {

    init();
    //    localStorage.clear();

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
        // Start the next scene
        startScene(nextScene.name, nextScene.image, nextScene.description, nextScene.options);
        sceneController.currentScene = nextScene;

        // Saving the current scene so that the player can come back to it later.
        if (typeof sceneController.currentScene.id == "number") {
            try {
                localStorage.setItem("savedgame", sceneController.currentScene.id);
            } catch (e) {
                console.log("Can't save progress" + e.message);
            }
        }
        window.scrollTo(0, 0);

    });
});