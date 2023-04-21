const axios = require("axios");
const mongoose = require("mongoose");
const fs = require("fs");

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publisher: String,
  publication_date: Date,
  isbn: String,
  description: String,
  price: Number,
  image_path: String,
  category: String,
});

const Book = mongoose.model("Book", bookSchema);

const BOOKS_PER_PAGE = 30;
const QUERY = "programming";
const LANG = "ko";
const MAX_RESULTS = 30;
const IMAGE_WIDTH = 380;
const IMAGE_HEIGHT = 560;

const fetchBooks = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${QUERY}&langRestrict=${LANG}&maxResults=${MAX_RESULTS}&key=AIzaSyAc_qlqQrXuSllv628I5keWC0sdW3qkgAE`
    );
    const books = response.data.items.slice(0, MAX_RESULTS);

    for (const book of books) {
      const title = book.volumeInfo.title;
      const author = book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown";
      const publisher = book.volumeInfo.publisher || "Unknown";
      const publication_date = book.volumeInfo.publishedDate
        ? new Date(book.volumeInfo.publishedDate)
        : null;
      const isbn = book.volumeInfo.industryIdentifiers
        ? book.volumeInfo.industryIdentifiers[0].identifier
        : "";
      const description = book.volumeInfo.description || "";
      const price = book.saleInfo.listPrice
        ? book.saleInfo.listPrice.amount
        : 0;
      const category = book.volumeInfo.categories
        ? book.volumeInfo.categories[0]
        : "Unknown";
      const image_url = book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "";
      const image_filename = `public/images/${isbn}.jpg`;

      const bookData = new Book({
        title,
        author,
        publisher,
        publication_date,
        isbn,
        description,
        price,
        image_path: image_filename,
        category,
      });

      const imageResponse = await axios.get(image_url, {
        responseType: "stream",
      });
      const imageStream = imageResponse.data.pipe(
        fs.createWriteStream(image_filename)
      );
      await new Promise((resolve, reject) => {
        imageStream.on("finish", resolve);
        imageStream.on("error", reject);
      });

      await bookData.save();
    }

    console.log(`${MAX_RESULTS} books added to database.`);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

fetchBooks();
