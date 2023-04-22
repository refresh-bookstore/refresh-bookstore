import pymongo
import requests
import json
import urllib

# 구글 API 정보
API_KEY = "AIzaSyAc_qlqQrXuSllv628I5keWC0sdW3qkgAE"
SEARCH_ENGINE_ID = "00849175fe6714227"

# 검색할 프로그래밍 언어 리스트
languages = ["Python", "Java", "JavaScript", "C++", "PHP", "Ruby", "Go"]

book_data_list = []

for language in languages:
    # 구글 검색 쿼리 설정
    query = f"{language}"
    query_url = urllib.parse.quote_plus(query)

    # 구글 검색 API 호출
    url = f"https://www.googleapis.com/customsearch/v1?key={API_KEY}&cx={SEARCH_ENGINE_ID}&q={query_url}"
    res = requests.get(url)
    data = json.loads(res.text)

    # 검색 결과에서 책 정보와 이미지 추출
    if "items" in data:
        for item in data["items"]:
            if "title" in item and "authors" in item and "publisher" in item and "publishedDate" in item and "description" in item and "industryIdentifiers" in item:
                title = item["title"]
                author = item["authors"]
                publisher = item["publisher"]
                publication_date = item["publishedDate"]
                description = item["description"]
                isbn = None
                for identifier in item["industryIdentifiers"]:
                    if identifier["type"] == "ISBN_13":
                        isbn = identifier["identifier"]
                        break

                # 이미지 검색
                image_url = item["image"]["thumbnailLink"]
                image_res = requests.get(image_url)
                image_data = image_res.content

                # 이미지 해상도가 가장 높은 이미지 검색
                image_list_url = f"https://www.googleapis.com/customsearch/v1?q=&cx={SEARCH_ENGINE_ID}&imgSize=large&imgType=photo&num=10&searchType=image&key={API_KEY}&imgUrl={image_url}"
                image_list_res = requests.get(image_list_url)
                image_list_data = json.loads(image_list_res.text)
                highest_resolution = 0
                highest_resolution_url = ""
                for image_item in image_list_data["items"]:
                    if "image" in image_item and "height" in image_item["image"] and "width" in image_item["image"]:
                        resolution = image_item["image"]["height"] * \
                            image_item["image"]["width"]
                        if resolution > highest_resolution:
                            highest_resolution = resolution
                            highest_resolution_url = image_item["link"]

                # 이미지 파일 저장
                image_filename = f"{title}.jpg"
                image_path = f"/public/images/{image_filename}"
                with open(image_path, "wb") as f:
                    f.write(image_data)

                # 책 정보 저장
                book_data = {
                    "title": title,
                    "author": author,
                    "publisher": publisher,
                    "publication_date": publication_date,
                    "isbn": isbn,
                    "description": description,
                    "price": None,
                    "image_path": image_path,
                    "category": "프로그래밍 언어" if language in languages else "Frontend"
                }
                book_data_list.append(book_data)

# 몽고DB에 데이터 저장

client = pymongo.MongoClient("mongodb://localhost:27017/myapp")
db = client["bookstore"]
books_collection = db["books"]

for book_data in book_data_list:
    books_collection.insert_one(book_data)

print("총 {}권의 책 정보가 저장되었습니다.".format(len(book_data_list)))
