var sceneController;
$(document).ready(function () {

    init();
    //    localStorage.clear();

    function init() {
        sceneController = new SceneController();
        var menu = sceneController.scenes.menu;
        menu.startScene();
        sceneController.currentScene = menu;
    }
    $("#scene-options").on('click', '.option', function () {
        try {
            var nextScene = sceneController.scenes[sceneController.currentScene.options[this.id].scene];
            nextScene.startScene();
            sceneController.currentScene = nextScene;

            // Saving the current scene so that the player can come back to it later.
            if (typeof sceneController.currentScene.id == "number") {
                try {
                    localStorage.setItem("savedgame", sceneController.currentScene.id);
                } catch (e) {
                    alert(e.message);
                }
            }
        } catch (e) {
            alert("Sorry! Can't do that.");
        }
    });
});