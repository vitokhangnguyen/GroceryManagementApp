import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Categories from '../assets/data/inventory_category.json';
import CustomCategories from '../assets/data/inventory_category_custom.json';
import './InventoryList.css';
import ShowHideIcon from '../assets/icons/ic-hide.png';
import SearchIcon from '../assets/icons/ic-search.webp';

class InventoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          currentCategory: Categories[0],
          hideSidebar: false,
          searchPattern: '',
          sortPattern: 'alphabetic',
        };
    }

  changeCategory = newCategory => {
    this.setState(prevState => ({ currentCategory: newCategory }));
  }

  toggleSidebar = () => {
    this.setState(prevState => ({ hideSidebar: !prevState.hideSidebar }))
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
      return (
          <div className="inventory-page">
            <div className="inventory-page-header">
                <div className="inventory-page-subheader-1 mb-2">
                  <h2>Inventory</h2>
                  <div className="input-group w-auto">
                    <input
                      placeholder="Search"
                      className="form-control py-2 border-right-0 border"
                      name="searchPattern"
                      value={this.state.searchPattern}
                      onChange={this.onInputChange}
                    />
                    <span className="input-group-append">
                      <button className="btn btn-link border-left-0 border" tabIndex="-1" style={{ backgroundColor: 'white' }} type="button">
                          <img src={SearchIcon} alt="search-inventory" width="22px" />
                      </button>
                    </span>
                  </div>
                </div>
                <div className="inventory-page-subheader-2 mr-4 mb-2">
                  <span className="mr-2">Sort&nbsp;by:</span>
                  <select
                    className="form-control w-auto"
                    name="sortPattern"
                    value={this.state.sortPattern}
                    onChange={this.onInputChange}
                  >
                    <option value="alphabetic">A-Z</option>
                    <option value="counter-alphabetic">Z-A</option>
                  </select>
                </div>
            </div>
            <div className="inventory-page-body">
              <CategoriesPanel
                onCategoryChange={this.changeCategory}
                currentCategory={this.state.currentCategory}
                onToggle={this.toggleSidebar}
                hide={this.state.hideSidebar}
              />
              <InventoryList category={this.state.currentCategory} search={this.state.searchPattern} sort={this.state.sortPattern} />
            </div>
          </div> 
      );
  }
}

const CategoriesPanel = props => {
  return (
    <div className={'category-sidebar ' + (props.hide ? "hidden" : "")}>
      <ul>
        {
          Categories.map((category, index) =>
            <CategoryItem
              key={index}
              isActive={category.name === props.currentCategory.name}
              onCategoryItemSelect={() => props.onCategoryChange(category)}
              category={category}
            />
          )
        }
      </ul>
      <div
        onClick={props.onToggle}
        className={"sidebar-control " + (props.hide ? "hidden" : "")}
      >
        <img alt="show-hide-sidebar" src={ShowHideIcon} />
      </div>
    </div>
  );
}

const CategoryItem = props => {
  let { name, backgroundColor, color } = props.category;
  return (
    <li
      style={{ backgroundColor, color}}
      onClick={props.onCategoryItemSelect}
      className={ (props.isActive ? 'active' : '') + ' category-item'}
    >
      <span className="category-name">{name}</span>
      <div className="arrow-right" style={{	background: `linear-gradient(45deg, transparent 50%, ${backgroundColor} 50%)` }}></div>
    </li>
  );
}

const InventoryList = props => {
  let { search, sort, category } = props;
  let items = category.items;
  if (category.name === 'All') {
    items = Categories.reduce((prev, cur) => prev.concat(cur.items), []);
  }
  if (['alphabetic', 'counter-alphabetic'].includes(sort)) {
    items.sort(function (item1, item2) {
      var name1 = item1.name.toUpperCase();
      var name2 = item2.name.toUpperCase();
      return sort === 'alphabetic' ? name1.localeCompare(name2) : name2.localeCompare(name1);
    });
  }
  let searchPattern = search.trim().toLowerCase();
  return (
    <div className="inventory-list">
      { 
        items.map((item, index) =>
          item.name.toLowerCase().includes(searchPattern) || 
          item.location.toLowerCase().includes(searchPattern) ?
            <InventoryItem key={index} item={{ ...item, category: category.name }} /> : null
        )
      }
    </div>
  );
}

const InventoryItem = props => {
  let { imageFile, name, location, qty } = props.item;
  let imageUrl = require(`../assets/images/inventory/${imageFile}`).default;
  const [show, setShow] = useState(false);

  return (
    <>
      <Card onClick={() => setShow(true)}>
        <div className="cardImage">
          <Card.Img src={imageUrl} alt={imageFile} />
        </div>
        <div className="cardInfo">
          <Card.Text>{ name }</Card.Text>
          <Card.Text className="light">{ location }</Card.Text>
          <Card.Text className="cardQty">
            <span className="qty">Qty:</span>&nbsp;
            { qty }
          </Card.Text>
        </div>
      </Card>

      <InventoryItemModel item={props.item} show={show} onHide={() => setShow(false)} />
    </>
  );
}

const InventoryItemModel = props => {
  let { imageFile, name, qty, category } = props.item;
  let imageUrl = require(`../assets/images/inventory/${imageFile}`).default;
  let editIcon = require("../assets/icons/ic-edit.png").default;
  let pcIcon = require("../assets/images/logo/presidentschoice.jpg").default;
  let warningIcon = require("../assets/icons/ic-warning.png").default;
  return (
    <Modal
      size="lg"
      animation={false}
      show={props.show}
      onHide={props.onHide}
      centered={true}
    >
    <Modal.Header closeButton>
      <div className="modalImage" sm={5}>
        <Image src={imageUrl} width={333} alt={imageFile} />
      </div>
      <div sm={6}>
        <h4><strong>{name}</strong></h4>
        <p><span><img src={pcIcon} alt={"president choice"} width={22}></img></span>President's Choice</p>
        <span><strong>Quantity:</strong> {qty} <span><img src={editIcon} alt={"edit"} width={28}></img></span></span>
        <p className="warning"><img src={warningIcon} alt={"warning"} width={22}></img>Despite no expiry date, it is recommended to consume vegetable within 3 days of purchase.</p>
      </div>
    </Modal.Header>
    <Modal.Body>
      <Tabs defaultActiveKey="history" transition={false}>
        <Tab eventKey="history" title="History">
          <div className="history-list">

            <div><p className="categorySubTitle">2 days ago (Dec 6):</p></div>
            <div>
            <ul>
              <li className="history-item" style={{borderLeft: "4px solid red"}}>
                Khang used <strong>0.5 lb</strong> for cooking
              </li>
              <li className="history-item" style={{borderLeft: "4px solid green"}}>
                Roman purchased <strong>2.5 lb</strong> from Listo's NoFrills
              </li>
            </ul>
            </div>

            <div><p className="categorySubTitle">1 week ago (Dec 1):</p></div>
            <div>
              <ul>
                <li className="history-item" style={{borderLeft: "4px solid red"}}>
                  Khang used <strong>1.3 lb</strong> for cooking
                </li>
                <li className="history-item" style={{borderLeft: "4px solid green"}}>
                  Arsh purchased <strong>2.5 lb</strong> from Listo's NoFrills
                </li>
                <li className="history-item" style={{borderLeft: "4px solid red"}}>
                  Arsh used <strong>1.5 lb</strong> for cooking
                </li>
                <li className="history-item" style={{borderLeft: "4px solid green"}}>
                  Ray purchased <strong>2.5 lb</strong> from Listo's NoFrills
                </li>
              </ul>
            </div>
          </div>
        </Tab>
        <Tab eventKey="category" title="Categories">
          <div className="d-flex justify-content-between">
            <div id="categoryLeft">
              <ul>
                {
                  Categories.map((cat, index) => {
                    let { backgroundColor, color, name } = cat;
                    return (
                      <li
                        key={index}
                        style={{ backgroundColor, color }}
                        className="d-flex justify-content-between"
                      >
                        <span className="modalCategoryName">{name}</span>
                        <span className="alittletotheleft">
                          <input type="radio" name="modalCategoryPredefined" defaultChecked={name === category} />
                        </span>
                      </li>
                    );
                  }
                  )
                }
              </ul>
            </div>
            <div id="categoryRight">
              <p className="categorySubTitle">Customs:</p>
              <ul>
                {
                  CustomCategories.map((category, index) => {
                    let { backgroundColor, color, name } = category;
                    return (
                      <li
                        key={index}
                        style={{backgroundColor, color}}
                        className="d-flex justify-content-between"
                      >
                        <span className="modalCategoryName">{name}</span>
                        <span className="alittletotheleft">
                          <input type="checkbox" name="modalCategoryCustom"/>
                        </span>
                      </li>
                    );
                  })
                }
                <li
                  style={{backgroundColor: "#EFEFEF", color: "black"}}
                  className="d-flex justify-content-between">
                  <span className="modalCategoryName">Add Category</span>
                </li>
              </ul>
            </div>
          </div>
        </Tab>
        <Tab eventKey="surprise" title="Local Supplies" disabled>
          Coming soon...
        </Tab>
        <Tab eventKey="nutrition" title="Nutritions" disabled>
          Coming soon...
        </Tab>
      </Tabs>
    </Modal.Body>
    </Modal>
  )
}

export default InventoryPage;