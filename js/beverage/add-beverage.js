//Pattern Command
class BeverageCommand {
  constructor(beverageData, action) {
    this.beverageData = beverageData;
    this.action = action;
  }

  execute() {
    fetch(`http://127.0.0.1:5000/beverage/`, {
      method: this.action,
      body: JSON.stringify(this.beverageData),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => showNotification());
  }
}

class BeverageInvoker {
  setCommand(command) {
    this.command = command;
  }

  executeCommand() {
    this.command.execute();
  }
}

// Instanciamos el invocador y lo configuramos con el comando
let beverageInvoker = new BeverageInvoker();

let beverageForm = $("#beverage-form");
beverageForm.submit((event) => {
  let beverageData = getBeverageData();
  let action = "POST"; // También podríamos configurar el action según lo que se desea hacer, como PUT o DELETE.

  let beverageCommand = new BeverageCommand(beverageData, action);
  beverageInvoker.setCommand(beverageCommand);
  beverageInvoker.executeCommand();

  event.preventDefault();
  event.currentTarget.reset();
});

function getBeverageData() {
  return {
    name: $("input[name='name']").val(),
    price: $("input[name='price']").val(),
  };
}

function showNotification() {
  let beverageAlert = $("#beverage-alert");
  beverageAlert.toggle();
  setTimeout(() => beverageAlert.toggle(), 5000);
}
