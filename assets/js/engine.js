/*

    Quick and dirty JavaScript tutorial

*/

// This is a variable
var myVariable;

// This is a function
function myFunction() {
    // Do something clever here.
}

// Functions can take parameters of course
function myFunction(x) {

}

//Lets try to send in and manipulate a varable
var x = 10;

function halfOf(x) {
    x /= 2; // Shortcut for x = x/2
    return x;
}
// Calling the function and passing the x-variable in
var halfOfXVariable = halfOf(x);
// Setting the returned value to the halfOfXVariable

// You can also change elements in HTML by id with vanilla JS
function changeHTML() {
    document.getElementById("myBody").innerHTML = "Hacked, muhaha!";
}

// To define a 'class, you make a 'function' act like an object in any other language...
function dog(name, age, breed) {
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.personality = "";
}

// You then call the function as if you were creating a new object...
var dog = new dog("Dilly", 14, "Poodle");
dog.personality = "Yoked";

function alertDogDetails() {
    var details = "Name: " + dog.name + "\nBreed: " + dog.breed + "\nAge: " + dog.age;
    alert(details);
}
/*

    Pretty much all you need to know atm.
    
    The power of JS is how many libraries there are out there, like JQuery, NodeJS, Angular and many more.
    
    
*/