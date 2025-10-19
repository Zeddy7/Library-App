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
   const readStatus = document.querySelector("#read");
   const form = document.querySelector("form");
   const title = document.querySelector("#title");
   const author = document.querySelector("#author");
   const pages = document.querySelector("#pages");
   const titleError = document.querySelector("#title-error");
   const authorError = document.querySelector("#author-error");
   const pagesError = document.querySelector("#pages-error");

   title.addEventListener("input", event => {
      if (title.validity.valid) {
         titleError.textContent = "";
         titleError.className = "error";
      } else {
         showErrorTitle();
      }
   });

   author.addEventListener("input", event => {
      if (author.validity.valid) {
         authorError.textContent = "";
         authorError.className = "error";
      } else {
         showErrorAuthor();
      }
   });

   pages.addEventListener("input", event => {
      if (pages.validity.valid) {
         pagesError.textContent = "";
         pagesError.className = "error";
      } else {
         showErrorPages();
      }
   })

   form.addEventListener("submit", event => {
      if (!title.validity.valid) showErrorTitle();
      if (!author.validity.valid) showErrorAuthor();
      if (!pages.validity.valid) showErrorPages();
      if (!title.validity.valid || !author.validity.valid || !pages.validity.valid) {
         event.preventDefault();
      }
   });

   function showErrorTitle() {
      if (title.validity.valueMissing) {
         titleError.textContent = "You need to enter a title.";
      }
      titleError.className = "error active";
   }

   function showErrorAuthor() {
      if (author.validity.valueMissing) {
         authorError.textContent = "You need to enter an author.";
      } 
      authorError.className = "error active";
   }

   function showErrorPages() {
       if (pages.validity.valueMissing) {
          pagesError.textContent = "You need to enter the number of pages.";
       } else if (pages.validity.rangeUnderflow) {
          pagesError.textContent = `Pages should be at least ${pages.min}.`;
       } else if (pages.validity.rangeOverflow) {
          pagesError.textContent = `Pages should not be more than ${pages.max}.`;
       } else {
          pagesError.textContent = "Please enter a valid number of pages.";
       }
       pagesError.className = "error active";
   }

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
         if (!title.value || !author.value || !pages.value) {
            e.preventDefault();
            if (!title.value) showErrorTitle();
            if (!author.value) showErrorAuthor();
            if (!pages.value) showErrorPages();
            return;
         }
         addBookToLibrary(
            title.value,
            author.value,
            Number(pages.value),
            readStatus.checked
         );
      displayBooks();
      form.reset();
      myDialog.close();
   });
})();
