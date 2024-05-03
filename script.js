const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book");
const submitButton = document.querySelector(".submit-button");
const library = document.querySelector(".library");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", () => {
  event.preventDefault();
  const formData = new FormData(document.getElementById("book-form"));
  const formJson = {};
  for (const entry of formData.entries()) {
    const [name, value] = entry;
    formJson[name] = value;
  }
  console.log(JSON.stringify(formJson));
  addBookToLibrary(formJson.title, formJson.author, formJson.read);
  dialog.close();
});

const myLibrary = [];

function Book(title, author, read, index) {
  this.author = author;
  this.title = title;
  this.read = read;
  this.index = index;
}

Book.prototype.setRead = function () {
  this.read = !this.read;
  displayBooks(myLibrary);
};

function addBookToLibrary(title, author, read) {
  const index = myLibrary.length;
  if (!read) {
    read = false;
  } else {
    read = true;
  }
  const newBook = new Book(title, author, read, index);
  myLibrary.push(newBook);
  displayBooks(myLibrary);
}

function displayBooks(books) {
  library.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    const bookCover = document.createElement("div");
    bookCover.classList.add("book-cover");

    const author = document.createElement("p");
    author.textContent = book.author;
    const title = document.createElement("p");
    title.textContent = book.title;
    const read = document.createElement("p");
    read.textContent = "Read: " + book.read;

    const textElements = [author, title, read];
    for (const textElement of textElements) {
      textElement.classList.add("book-text");
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    const readButton = document.createElement("button");
    if (book.read) {
      readButton.textContent = "Unread";
    } else {
      readButton.textContent = "Read";
    }
    const buttons = [removeButton, readButton];
    for (const textElement of textElements) {
      textElement.classList.add("book-button");
    }

    bookCover.appendChild(title);
    bookCover.appendChild(author);
    bookCover.appendChild(read);
    bookCover.appendChild(removeButton);
    bookCover.appendChild(readButton);

    book.index = i;

    removeButton.addEventListener("click", () => {
      books.splice(book.index, 1);
      displayBooks(books);
    });

    readButton.addEventListener("click", () => {
      book.setRead();
    });

    library.appendChild(bookCover);
  }
}

displayBooks(myLibrary);
