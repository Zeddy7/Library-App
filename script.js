const libraryModule = (function () {
   const myLibrary = [];

   class Library {
      constructor(title, author, pages, read) {
         this.id = crypto.randomUUID();
         this.title = title;
         this.author = author;
         this.pages = pages;
         this.read = read;
      }
      
      toggleRead() {
         this.read = !this.read;
      }
   }

   function addBookToLibrary(title, author, pages, read) {
      const newBook = new Library(title, author, pages, read);
      myLibrary.push(newBook);
      displayBooks();
   }

   const libraryContainer = document.getElementById("library");
   const myDialog = document.getElementById("myDialog");
   const openButton = document.getElementById("openDialog");
   const closeButton = document.getElementById("closeDialog");
   const addBookButton = document.querySelector(".addBook");
   const title = document.querySelector("#title");
   const author = document.querySelector("#author");
   const pages = document.querySelector("#pages");
   const readStatus = document.querySelector("#read");
   const form = document.querySelector("form");

   function displayBooks() {
      libraryContainer.innerHTML = "";
      myLibrary.forEach(book => {
         const card = document.createElement("div");
         card.classList.add("book-card");
         card.innerHTML = `
         <h1>${book.title}</h1>
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
            myLibrary.splice(index, 1);
            displayBooks();
         });
         libraryContainer.appendChild(card);
      });
   }
   openButton.addEventListener("click", () => {
      myDialog.showModal();
   });
   closeButton.addEventListener("click", () => {
      myDialog.close();
   });
   addBookButton.addEventListener("click", e => {
      if ((!title.value, !author.value, !pages.value))
         return e.preventDefault();
      addBookToLibrary(
         title.value,
         author.value,
         pages.value,
         readStatus.checked
      );
      displayBooks();
      form.reset();
      myDialog.close();
   });
})();
