class Library {
  constructor(libraryDiv) {
    this.library = [];
    this.libraryDiv = libraryDiv;
  }

  addBookToLibrary(book) {
    book.index = this.library.length;
    this.library.push(book);
  }

  getLength() {
    return this.library.length;
  }

  removeBookFromLibrary(book) {
    this.library.splice(book.index, 1);
  }

  displayBooks() {
    this.libraryDiv.innerHTML = "";

    for (let i = 0; i < this.library.length; i++) {
      const book = this.library[i];
      book.index = i;

      const bookUI = book.createUI();

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";

      removeButton.addEventListener("click", () => {
        this.removeBookFromLibrary(book);
        this.displayBooks();
      });

      bookUI.appendChild(removeButton);
      this.libraryDiv.appendChild(bookUI);
    }
  }
}

class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }

  set read(value) {
    if (!value) {
      this._read = false;
    } else {
      this._read = true;
    }
  }

  set index(value) {
    this._index = value;
  }

  get index() {
    return this._index;
  }

  createUI() {
    const bookUI = document.createElement("div");
    bookUI.classList.add("book-cover");

    const authorP = document.createElement("p");
    authorP.textContent = this.author;
    const titleP = document.createElement("p");
    titleP.textContent = this.title;
    const readP = document.createElement("p");

    const textElements = [authorP, titleP, readP];
    for (const textElement of textElements) {
      textElement.classList.add("book-text");
    }

    // Add book button UI: remove/read
    const readButton = document.createElement("button");
    this.#setUIRead(readButton, readP);
    readButton.addEventListener("click", () => {
      this._read = !this._read;
      this.#setUIRead(readButton, readP);
    });

    const buttons = [readButton];
    for (const button of buttons) {
      button.classList.add("book-button");
    }

    for (const child of [...textElements, ...buttons]) {
      bookUI.appendChild(child);
    }

    return bookUI;
  }

  #setUIRead(readButton, readP) {
    if (this._read) {
      readButton.textContent = "Unread";
    } else {
      readButton.textContent = "Read";
    }

    readP.textContent = "Read: " + this._read;
  }
}

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book");
const submitButton = document.querySelector(".submit-button");
const libraryDiv = document.querySelector(".library");

const myLibrary = new Library(libraryDiv);

const form = document.getElementById("book-form");

newBookButton.addEventListener("click", () => {
  form.reset();
  dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
  // Grab form data
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const read = document.getElementById("read");

  title.setCustomValidity("");
  author.setCustomValidity("");
  
  const formJson = {
    title: title.value,
    author: author.value,
    read: read.checked,
  };

  console.log(title.validity);
  let validForm = true;
  if (title.validity.valueMissing) {
    title.setCustomValidity("Too short bruh.");
    console.log("title");
    validForm = false;
  }
  if (author.validity.valueMissing) {
    author.setCustomValidity("Give a name bruh.");
    console.log("author");
    validForm = false;
  }

  if (validForm) {
    // Create new book and add to library
    const book = new Book(formJson.title, formJson.author, formJson.read);
    myLibrary.addBookToLibrary(book);
    myLibrary.displayBooks();
    dialog.close();
  }
});

myLibrary.displayBooks();
