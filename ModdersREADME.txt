  ===   ==== ==== ====== ==  ==
||  || |____|____    //   \\// 
||--   |    |       //     ||
||     |____|____ _//___   ||
        
IF YOU'RE NOT A PROGRAMMER, USE newscene.html to create scenes.

Scenes are the main functionality behind this game.
In order to add a Scene, it requires 4 parameters:

    1. Name of the scene (Goes on title of window)
    2. A picture resource URL
    3. Description for the scene
    4. Array of "MenuOption"s

One way to do it is create a new scene:
=> new Scene(name, picture, description, array(MenuOptions))

But the much more human friendly way is to add to the 'scenes.json' file.
To setup a scene JSON object:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
, // <-----  DON'T FORGET COMMAS here if you're *appending*. The scenes.json in itself is a dictionary.

"scene number": {
        
        "id": idNumber,                         // same as scene number
        
        "name": "Human Readable Title", 		// Also goes to the right or the window title like Peezy - [title]
        
        "image": "assets/img/Crystal.jpg",      //URL to an image file
        
        "description": "Description that goes to the right or below image",
        "options": [{
            "text": "text that goes on the button",
            "scene": "link to another scene (id number)",
            "id": 0                     // manually entering the array indexes of the buttons (confusing, but need it for JQuery). Increment by 1.
        }, {
            "text": " another button text ",
            "scene": " another link to a scene ",
            "id": 1 	               // keep incrementing by 1
        }]
    } 							// No comma here if you're at the end of the file

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Go ahead and copy and paste this skeleton and play with it (removing the comments though, JSON doesn't have comments).

~ For more help, look at scene "1" in scenes.json for an example on how to add one
