const BASE_URL = "https://openlibrary.org";

export const getTrendingBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/subjects/love.json?limit=20`);
    if (!response.ok) throw new Error("Fetch trending books failed");
    const data = await response.json();
    return data.works.map(book => ({
      ...book,
      key: book.key,
      first_publish_year: book.first_publish_year || "-",
      author_name: book.authors ? book.authors.map(a => a.name) : ["-"],
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const searchBooks = async (keyword) => {
  try {
    const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(keyword)}&limit=20`);
    if (!response.ok) throw new Error("Search books failed");
    const data = await response.json();
    return data.docs.map(book => ({
      ...book,
      key: book.key,
      first_publish_year: book.first_publish_year || "-",
      author_name: book.author_name || ["-"],
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getBookDetail = async (key) => {
  try {
    const response = await fetch(`${BASE_URL}${key}.json`);
    if (!response.ok) throw new Error("Get detail failed");
    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getCoverUrl = (book) => {
  const coverId = book.cover_i || (book.covers && book.covers[0]);
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
};

export const getAuthorText = (book) => {
  if (book.author_name) return book.author_name.join(", ");
  if (book.authors) return book.authors.map(a => a.name).join(", ");
  return "-";
};