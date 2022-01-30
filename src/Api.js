export const API_URL = 'https://finpec-my-book-list.herokuapp.com';

export function BOOK_POST(body) {
  return {
    url: API_URL + '/favorite-books',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function BOOK_GET(id) {
  return {
    url: `${API_URL}/favorite-books/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

export function BOOK_DELETE(id) {
  return {
    url: `${API_URL}/favorite-books/${id}`,
    options: {
      method: 'DELETE'
    },
  };
}

export function BOOKS_LIST() {
  return {
    url: `${API_URL}/favorite-books`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

export function GOOGLE_BOOKS_GET() {
  return {
    url: 'https://www.googleapis.com/books/v1/volumes?q=dq=holmes',
    options: {
      method: 'GET'
    }
  }
}