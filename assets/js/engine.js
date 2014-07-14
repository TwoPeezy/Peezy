var sceneController;
$(document).ready(function () {

    init();

    function init() {
        sceneController = new SceneController();
        var menu = sceneController.scenes.menu;
        menu.startScene();
        sceneController.currentScene = menu;
    }
    $("#scene-options").on('click', '.option', function () {
        var nextScene = sceneController.scenes[sceneController.currentScene.options[this.id].scene];
        nextScene.startScene();
        sceneController.currentScene = nextScene;
    });
});