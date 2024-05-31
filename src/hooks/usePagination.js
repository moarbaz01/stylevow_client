import { useState } from "react";

// How to create a pagination functionality
// What we need
// 1. Only 8 products in one page
// 2. Total Products
// 3. Current page should be highlighted
// 4. When we have more then 5 page... So other page selection should be [...] (It gives a unique way to present)
// 5. Total Pages

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = Math.ceil(data.length / itemsPerPage);

  // Showing products according to pages
  function currentData() {
    // Suppose current page is = 0  &  itemsPerPage is = 8 ; then start value will be = 0
    const start = (currentPage - 1) * itemsPerPage;
    // Suppose start value is = 0  &  itemsPerPage is  = 8 ; then end value will be = 8
    const end = start + itemsPerPage;
    // It return values between 0 to 8 ; means 8 products
    return data.slice(start, end);
  }

  // Increase current page by click
  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPages)); // currentPage should below maxPages, do not exceed maxPages
  }

  // Decrease current page by click
  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1)); // currentPage should below 1
  }

  // Jump Page takes that the current page should greater then 1 and below then maxPages
  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPages));
  }

  return { currentPage, maxPages, next, prev, jump, currentData };
}

export default usePagination;
