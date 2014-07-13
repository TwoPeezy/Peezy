var sceneController;
$(document).ready(function () {

    init();

    function init() {
        sceneController = new SceneController();
        var menu = sceneController.scenes.menu;
        menu.startScene();
        sceneController.currentScene = menu;
    }
});