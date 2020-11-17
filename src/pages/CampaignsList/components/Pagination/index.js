import React from "react";
import "./style.scss";

function Pagination(props) {
  let pageList = [];
  let { currentPage, setCurrentPage } = props;
  for (let i = 1; i <= Math.ceil(props.totalItems / 10); i++) {
    pageList.push(i);
  }
  return (
    <div className="pagination">
      <ul>
        <li onClick={() => setCurrentPage(currentPage - 1)}>Prev</li>
        {pageList.map((number) => {
          return (
            <li
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </li>
          );
        })}
        <li onClick={() => setCurrentPage(currentPage + 1)}>Next</li>
      </ul>
    </div>
  );
}

export default Pagination;
