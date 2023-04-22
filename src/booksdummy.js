const axios = require("axios");
const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require("sharp");

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

const fetchBooks = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${QUERY}&langRestrict=${LANG}&maxResults=${MAX_RESULTS}&key=AIzaSyAc_qlqQrXuSllv628I5keWC0sdW3qkgAE`
    );
    const books = response.data.items.slice(0, MAX_RESULTS);

    for (const book of books) {
      const {
        volumeInfo: {
          title,
          authors,
          publisher,
          publishedDate,
          industryIdentifiers,
          description,
          imageLinks,
        },
        saleInfo: { listPrice },
      } = book;

      const author = authors ? authors.join(", ") : "Unknown";
      const publication_date = publishedDate ? new Date(publishedDate) : null;
      const isbn = industryIdentifiers ? industryIdentifiers[0].identifier : "";
      const price = listPrice ? listPrice.amount : 0;
      const category = "Programming";
      const image_url = imageLinks ? imageLinks.thumbnail : "";

      if (!image_url) continue; // 이미지가 없는 경우 skip

      const search_response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${title}&cx=00849175fe6714227&imgSize=huge&imgType=photo&num=1&searchType=image&key=AIzaSyAc_qlqQrXuSllv628I5keWC0sdW3qkgAE`
      );

      if (search_response.data.items.length > 0) {
        const image_link = search_response.data.items[0].link;

        const image_response = await axios.get(image_link, {
          responseType: "stream",
        });

        const imageStream = image_response.data.pipe(
          fs.createWriteStream(`public/images/${isbn}.jpg`)
        );

        await new Promise((resolve, reject) => {
          imageStream.on("finish", resolve);
          imageStream.on("error", reject);
        });

        const resized_filename = `public/images/${isbn}_resized.jpg`;

        await sharp(`public/images/${isbn}.jpg`)
          .resize({
            width: 720,
            fit: "contain",
            background: { r: 255, g: 255, b: 255 },
          })
          .toFile(resized_filename);

        fs.unlinkSync(`public/images/${isbn}.jpg`);

        const bookData = new Book({
          title,
          author,
          publisher,
          publication_date,
          isbn,
          description,
          price,
          image_path: resized_filename,
          category,
        });

        await bookData.save();
      } else {
        console.log(`No image found for book with title "${title}".`);
      }
    }

    console.log(`${MAX_RESULTS} books added to database.`);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

fetchBooks();
