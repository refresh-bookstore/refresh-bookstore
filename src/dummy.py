import requests
import pymongo
import io
from PIL import Image

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["myapp"]
book_collection = db["books"]

BOOKS_PER_PAGE = 30
QUERY = "programming"
LANG = "ko"
MAX_RESULTS = 30


def fetchBooks():
    try:
        response = requests.get(
            f"https://api.duckduckgo.com/?q={QUERY}&format=json&lang={LANG}&no_redirect=1&no_html=1&skip_disambig=1&kp=-1&kl=wt-wt&kz=-1&kae=d&k1=-1&kx=1&kak=-1&kax=-1&kf=-1&kaf=1&ko=-1&kt=a&k7=ffffff&k8=5c5c5c&k9=5c5c5c&ka=b&kaa=008491&kad=ffffff&kai=1&kau=-1&kba=1&kb=1&kf=1&kaf=1&kbc=1&k4=-1&kaj=m&kam=bingpedia"
        )
        books = response.json()["Results"][:MAX_RESULTS]

        for book in books:
            title = book["Title"]
            author = book["Author"]
            description = book.get("Abstract", "")
            image_url = book.get("Image", "")

            if not image_url:
                continue  # Skip if there is no image

            # Download and resize the image using the link with the best resolution
            image_response = requests.get(image_url)
            image_bytes = io.BytesIO(image_response.content)
            image = Image.open(image_bytes)

            resized_image = image.resize(
                (720, int(720 / image.width * image.height)), resample=Image.LANCZOS)
            resized_image_io = io.BytesIO()
            resized_image.save(resized_image_io, format="JPEG")
            resized_image_filename = f"public/images/{title}_resized.jpg"

            with open(resized_image_filename, "wb") as f:
                f.write(resized_image_io.getvalue())

            book_data = {
                "title": title,
                "author": author,
                "publisher": "",
                "publication_date": "",
                "isbn": "",
                "description": description,
                "price": 0,
                "image_path": resized_image_filename,
                "category": "Programming",
            }
            book_collection.insert_one(book_data)

        print(f"{MAX_RESULTS} books added to database.")

    except Exception as e:
        print(e)

    finally:
        client.close()


fetchBooks()
