$(document).ready(function () {

    init();

    function init() {
        var image = "http://patrickeddy.com/assets/img/orange.jpeg";
        var desc = "Guy Peezy, private eye. Once upon a time, I was a cop. I didn't abide by the rules, I got cases closed on my own terms. Broken bones, a mild case of major blood loss. The police commissioner thought I was casting a bad shadow on the team, so he got rid of me. I've been solving easy cases ever since then. Missing pets weren't really my style, but I kept working, waiting for that one case that would put me into the limelight again. That was when Crystal showed up, and my career changed forever.";
        var options = ["New Game", "Load Game", "About"];
        var menu = new Scene(image, desc, options);
        menu.startScene();
    }

    function Scene(image, description, options) {
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
            for (var current in this.options) {
                $("#scene-options").append("<span class='option'>" + this.options[current] + "</span>");
            }
        }
    }

});