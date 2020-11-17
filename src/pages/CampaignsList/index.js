import React, { Component } from "react";
import "./style.scss";
import ListTable from "./components/ListTable/index";
import Pagination from "./components/Pagination/index";
import jsonData from "../../constants/dummyData";

class CampaignsList extends Component {
  constructor(props) {
    super(props);

    this.searchValue = "";
    this.dataCopy = [...jsonData];
    this.data = [...jsonData];
    this.debounceTimer = null;

    this.state = {
      currentPage: 1,
      totalItems: this.data.length,
      currentItems: []
    };
  }

  componentDidMount() {
    this.getCurrentItems();
  }

  getCurrentItems = () => {
    const list = this.data.slice(
      (this.state.currentPage - 1) * 10,
      (this.state.currentPage - 1) * 10 + 10
    );
    this.setState({
      currentItems: list
    });
  };

  setCurrentPage = (currentPage) => {
    if (
      currentPage !== 0 &&
      currentPage !== Math.round(this.data.length / 10) + 1
    ) {
      this.setState(
        {
          currentPage: currentPage
        },
        function () {
          this.getCurrentItems();
        }
      );
    }
  };

  filterData = () => {
    this.data = [...this.dataCopy];

    let tempList = this.data.filter((row) => {
      return (
        row.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        row.type.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        row.company.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    });

    this.data = [...tempList];
    this.setState(
      {
        currentPage: 1,
        totalItems: this.data.length
      },
      function () {
        this.getCurrentItems();
      }
    );
  };

  changeHandler = (event) => {
    this.searchValue = event.target.value;
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.filterData();
    }, 1000);
  };

  render() {
    const { currentItems, totalItems, currentPage } = this.state;

    return (
      <div className="campaigns-list">
        <div className="campaigns-list__options">
          <input
            type="text"
            placeholder="Search..."
            onChange={this.changeHandler}
          />
          <button type="button">Filters</button>
        </div>
        <div className="campaigns-list__table">
          <ListTable currentItems={currentItems} />
        </div>
        <div className="campaigns-list__pagination">
          <Pagination
            setCurrentPage={this.setCurrentPage}
            totalItems={totalItems}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default CampaignsList;
