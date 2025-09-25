const myLibrary = [];

function Book(title, author, pages, read) {
   this.id = crypto.randomUUID();
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;
}

Book.prototype.toggleRead = function () {
   this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
   let book = new Book(title, author, pages, read);
   myLibrary.push(book);
   displayBooks();
}

const libraryContainer = document.getElementById("library");

function displayBooks() {
   libraryContainer.innerHTML = "";
   myLibrary.forEach(book => {
      const card = document.createElement("div");
      card.classList.add("book-card");
      card.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? "Read" : "Not Read"}</p>
      <button class="read-status"><strong>Toggle Read</strong></button>
      <button class="remove"><strong>Remove</strong></button>`;

      const readStatusButton = card.querySelector(".read-status");
      const removeButton = card.querySelector(".remove");

      readStatusButton.addEventListener("click", () => {
         book.toggleRead();
         displayBooks();
      });
      removeButton.addEventListener("click", () => {
         const index = myLibrary.indexOf(book);
         //  if (index !== -1) {
         myLibrary.splice(index, 1);
         displayBooks();
         //  }
      });

      libraryContainer.appendChild(card);
   });
}

const myDialog = document.getElementById("myDialog");
const openButton = document.getElementById("openDialog");
const closeButton = document.getElementById("closeDialog");

openButton.addEventListener("click", () => {
   myDialog.showModal();
});

closeButton.addEventListener("click", () => {
   myDialog.close();
});

const addBookButton = document.querySelector(".addBook");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#read");

addBookButton.addEventListener("click", e => {
   e.preventDefault();
   addBookToLibrary(title.value, author.value, pages.value, readStatus.checked);
   displayBooks();
   title.value = "";
   author.value = "";
   pages.value = "";
   readStatus.checked = false;
   myDialog.close();
});
