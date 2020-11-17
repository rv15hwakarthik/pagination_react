import React from "react";
import "./style.scss";

function ListTable(props) {
  const tableHeadings = ["Campaign Name", "Type", "Company", "Actions"];
  const list = props.currentItems || [];
  return (
    <div className="list-table">
      <table>
        <thead>
          <tr>
            {tableHeadings.map((heading) => {
              return <th key={heading}>{heading}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {!list.length ? (
            <tr>
              <td colSpan="4">No Data Available</td>
            </tr>
          ) : (
            list.map((row) => {
              return (
                <tr key={row._id}>
                  <td>{row.name}</td>
                  <td>{row.type}</td>
                  <td>{row.company}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListTable;
