async function fetchBooks() {
  const res = await fetch("/api/books");
  const { data: books } = await res.json();
  const tbody = document.querySelector("#books-table tbody");
  tbody.innerHTML = "";
  books.forEach((book) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.year}</td>
    <td>${book.genre}</td>
    <td>${book.pages}</td>
    <td><button class="delete-btn" data-id="${book.id}">Delete</button></td>
  `;
    tbody.appendChild(tr);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  document.getElementById("book-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      title: form.title.value,
      author: form.author.value,
      year: Number(form.year.value),
      genre: form.genre.value,
      pages: Number(form.pages.value),
    };
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    form.reset();
    fetchBooks();
  });

  document
    .querySelector("#books-table tbody")
    .addEventListener("click", async (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.getAttribute("data-id");
        await fetch(`/api/books/${id}`, { method: "DELETE" });
        fetchBooks();
      }
    });
});
