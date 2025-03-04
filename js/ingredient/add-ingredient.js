//Observer Design Pattern
// Define a custom event to notify the UI
const ingredientAddedEvent = new CustomEvent('ingredientAdded');

// Send a POST request to the server and trigger the event when done
function postIngredient(ingredient) {
    fetch('http://127.0.0.1:5000/ingredient/', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then(res => res.json())
        .then(res => document.dispatchEvent(ingredientAddedEvent));
}

// Subscribe to the custom event and show a notification when it's triggered
document.addEventListener('ingredientAdded', () => {
    let ingredientAlert = $("#ingredient-alert");
    ingredientAlert.toggle();
    setTimeout(() => ingredientAlert.toggle(), 5000);
});

// Get the form and submit it with fetch API
let ingredientForm = $("#ingredient-form");
ingredientForm.submit(event => {
    let ingredient = getIngredientData();
    postIngredient(ingredient);
    event.preventDefault();
    event.currentTarget.reset();
});

// Get the ingredient data with JQuery
function getIngredientData() {
    return {
        name: $("input[name='name']").val(),
        price: $("input[name='price']").val(),
    };
}
