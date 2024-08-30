const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const data = [];
  for (const value of formData.values()) {
    data.push(value);
  }

  myLibrary.push(new Book(...data));
  event.target.reset();
  renderLibrary();
  dialog(false);
}

function renderLibrary() {
  const container = document.querySelector(".container");
  container.textContent = "";

  for (const index in myLibrary) {
    const card = document.createElement("div");
    const updateReadStatusButton = document.createElement("button");
    const removeBookButton = document.createElement("button");
    const buttonWrapper = document.createElement("div");

    card.className = "card";
    updateReadStatusButton.textContent = "Read";
    removeBookButton.textContent = "Remove";
    buttonWrapper.className = "button-wrapper";

    updateReadStatusButton.onclick = function () {
      myLibrary.splice(index, 1, { ...myLibrary[index], read: myLibrary[index].read ? false : true });
      renderLibrary();
    };

    removeBookButton.onclick = function () {
      myLibrary.splice(index, 1);

      renderLibrary();
    };

    for (const key of Object.keys(myLibrary[index])) {
      const title = document.createElement("div");
      const value = document.createElement("div");
      const text = document.createElement("div");
      text.className = "text";

      title.textContent = key.charAt(0).toUpperCase() + key.slice(1);

      if (key === "read") {
        value.textContent = myLibrary[index][key] ? "Yes" : "No";
      } else {
        value.textContent = myLibrary[index][key];
      }

      text.appendChild(title);
      text.appendChild(value);
      card.appendChild(text);
    }

    buttonWrapper.appendChild(updateReadStatusButton);
    buttonWrapper.appendChild(removeBookButton);
    card.appendChild(buttonWrapper);

    container.appendChild(card);
  }
}

renderLibrary();

function dialog(isShow) {
  const dialog = document.querySelector("#add-book-dialog");

  if (isShow) {
    dialog.showModal();
  } else {
    dialog.close();
  }
}

const form = document.querySelector("#add-book-form");
form.addEventListener("submit", addBookToLibrary);
