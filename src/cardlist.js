import React, { useState, useEffect } from "react";

// import carList from "./inventory.json";
import Card from "./card";

import Pagination from "./pagination";

export default function CardList({ results }) {
  // data = data.results;
  // console.log(results);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(25);
  // const itemsPerPage = 25;
  const totalPages = Math.ceil(results.length / postsPerPage);
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentItems = results.slice(firstIndex, lastIndex);

  // Function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="carList">
      {currentItems.map((car) => {
        return <Card {...car} key={car.id}></Card>;
      })}

      {/* <div className="wrapper"> */}
      <Pagination
        totalPosts={results.length}
        postsPerPage={postsPerPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
      {/* </div> */}
    </section>
  );
}

// iterate over
