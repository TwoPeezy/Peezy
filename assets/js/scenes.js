/*
                >>> WARNING: SPOILERS <<<
        All of the scenes that make up the game below.
    
         ===   ==== ==== ====== ==  ==
        ||  || |____|____    //   \\// 
        ||--   |    |       //     ||
        ||     |____|____ _//___   ||

        This file is the main functionality behind this game.
        In order to add a Scene, it requires 4 parameters.
            1. Name of the scene (Goes on title of window)
            2. A picture resource URI
            3. Description for the scene
            4. Array of "MenuOption"s
        ==~
        =-  new Scene(name, picture, description, array(MenuOptions))
        ==~
        
        For more help, look at Scene1 for an example on how to add one
    */
function createGameScenes() {
    var scenes = [
    /* 
        SCENE 1
                */
        {

            // Scene ID
            "id": 1,
            // Name of Scene
            "name": "Crystal",
            // Image URL to use
            "image": "assets/img/Crystal.jpg",
            // Description next to image
            "description": "Stuff happens, bro.",
            // Button options to continue
            "options": [{
                // Button text
                "text": "Talk to yourself",
                // Link to another scene
                "scene": "menu",
                /* Button id (just keep incrementing by 1). It's so we can select the button with JQuery */
                "id": 0
    }, {
                "text": "Poop",
                "scene": "scene2",
                "id": 1
    }, {
                "text": "Kill",
                "scene": "prison",
                "id": 2
            }]
    },
    /*
        PRISON SCENE
                */
        {
            "id": 0,
            "name": "Prison",
            "image": "assets/img/Crystal.jpg",
            "description": "Why you being stupid? You're in jail now!",
            "options": [{
                "text": "Die",
                "scene": "menu",
                "id": 0
            }]
    }]

    return scenes;
}