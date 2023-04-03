//Pattern Factory
class Beverage {
  constructor(_id, name, price) {
    this._id = _id;
    this.name = name;
    this.price = price;
  }
}

class BeverageFactory {
  createBeverage(beverageData) {
    const { _id, name, price } = beverageData;
    return new Beverage(_id, name, price);
  }
}

const beverageFactory = new BeverageFactory();

function fetchBeverage(_id) {
  fetch(`http://127.0.0.1:5000/beverage/id/${_id}`)
    .then((response) => response.json())
    .then((beverageData) => {
      const beverage = beverageFactory.createBeverage(beverageData);
      $("#_id").val(beverage._id);
      $("#name").val(beverage.name);
      $("#price").val(beverage.price);
    });
}

function putBeverage(beverage) {
  fetch("http://127.0.0.1:5000/beverage/", {
    method: "PUT",
    body: JSON.stringify(beverage),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((res) => showNotification());
}

let beverageForm = $("#beverage-form");
beverageForm.submit((event) => {
  const beverageData = getBeverageData();
  const beverage = beverageFactory.createBeverage(beverageData);
  putBeverage(beverage);
  event.preventDefault();
  event.currentTarget.reset();
  window.location.href = "/app/beverage/beverages.html";
});

function getBeverageData() {
  return {
    _id: $("input[id='_id']").val(),
    name: $("input[id='name']").val(),
    price: $("input[id='price']").val(),
  };
}

function showNotification() {
  let beverageAlert = $("#beverage-alert");
  beverageAlert.toggle();
  setTimeout(() => beverageAlert.toggle(), 5000);
}

window.onload = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let _id = urlParams.get("_id");
  fetchBeverage(_id);
};
