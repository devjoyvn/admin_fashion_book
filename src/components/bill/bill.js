import React, { Component } from "react";
import { Link } from "react-router-dom";
class Bill extends Component {
  constructor() {
    super();
    this.state = {
      pagination: [],
      status: true
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom col-md-6 offset-md-3">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
  render() {
    return (
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="page-header">
              <i className="fa fa-table" /> Table
            </h3>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-home" />
                <Link to="/">Home</Link>
              </li>
              <li>
                <i className="fa fa-table" />Table
              </li>
              <li>
                <i className="fa fa-th-list" />Bill Manager
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">
                Advanced Table
                <span style={{ marginLeft: "50px", marginRight: "30px" }}>
                  Select Day
                </span>
                <select onChange={e => this.props.getBill(e.target.value)}>
                  <option
                    value=""
                    disabled
                    selected
                    style={{ display: "none" }}
                  >
                    Status
                  </option>
                  <option value="true">VERIFY</option>
                  <option value="false">NOT VERIFY</option>
                </select>
              </header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Products</th>
                  </tr>
                  {this.props.bill.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name}</td>
                        <td>
                          {element.address +
                            ", " +
                            element.ward +
                            ", " +
                            element.district +
                            ", " +
                            element.city}
                        </td>
                        <td>{element.phone}</td>
                        <td>{element.date.substring(0, 10)}</td>
                        <td>
                          <select>
                            <option
                              value=""
                              disabled
                              selected
                              style={{ display: "none" }}
                            >
                              Products
                            </option>
                            {element.products.map((item, index) => {
                              return (
                                  <option>
                                      {item.name + " - " + item.count}
                                  </option>
                              )
                            })}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {this.renderPagination()}
            </section>
          </div>
        </div>
      </section>
    );
  }
}
export default Bill;
