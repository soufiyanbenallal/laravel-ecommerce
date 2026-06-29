export const SearchService = {
  async predictive(query: string) {
    const response = await fetch(
      `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,article,page&resources[limit]=6`
    );
    if (!response.ok) throw new Error('Failed to fetch search results');
    return response.json();
  },

  async search(query: string, page = 1, type = 'product') {
    const response = await fetch(
      `/search?q=${encodeURIComponent(query)}&page=${page}&type=${type}`
    );
    if (!response.ok) throw new Error('Failed to search');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const products = doc.querySelectorAll('.product-card');
    return {
      count: products.length,
      html,
    };
  },
};
