import React, { useState, useEffect } from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  handlePageChange,
  currentPage,
}) => {
  const [activePage, setActivePage] = useState(currentPage);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  //   const isSmallScreen = window.innerWidth <= 768;
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const handleButtonClick = (page) => {
    setActivePage(page);
    handlePageChange(page);
  };

  const renderPagination = () => {
    if (isSmallScreen) {
      return (
        <div>
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => handleButtonClick(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="page-btn"
            disabled={currentPage === pages.length}
            onClick={() => handleButtonClick(currentPage + 1)}
          >
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div className="pagination-div">
          <div>
            {pages.map((page, index) => {
              return (
                <button
                  className={
                    currentPage === page ? "page-btn active" : "page-btn"
                  }
                  //   className="page-btn"
                  key={index}
                  onClick={() => handleButtonClick(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return <div className="pagination-div">{renderPagination()}</div>;

  //   if (isSmallScreen) {
  //     return (
  //       <div>
  //         <button
  //           className="page-btn"
  //           disabled={currentPage === 1}
  //           onClick={() => handlePageChange(currentPage - 1)}
  //         >
  //           Previous
  //         </button>
  //         <button
  //           className="page-btn"
  //           disabled={currentPage === pages.length}
  //           onClick={() => handlePageChange(currentPage + 1)}
  //         >
  //           Next
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="pagination-div">
  //         <div>
  //           {pages.map((page, index) => {
  //             return (
  //               <button
  //                 className={
  //                   currentPage === page ? "page-btn active" : "page-btn"
  //                 }
  //                 //   className="page-btn"
  //                 key={index}
  //                 onClick={() => handlePageChange(page)}
  //               >
  //                 {page}
  //               </button>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     );
  //   }
};

export default Pagination;
