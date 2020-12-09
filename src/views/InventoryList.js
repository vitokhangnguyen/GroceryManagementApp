import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Categories from '../assets/inventory_category.json';
import './InventoryList.css';
import ShowHideIcon from '../assets/icons/ic-hide.png';

class InventoryPage extends Component {
    constructor(props) {
        super(props);
        this.changeCategory = this.changeCategory.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.state = { 
          currentCategory: Categories[0],
          hideSidebar: false,
        };
    }

  changeCategory(newCategory) {
    this.setState(prevState => ({ currentCategory: newCategory }));
  }

  toggleSidebar() {
    this.setState(prevState => ({ hideSidebar: !prevState.hideSidebar }))
  }

  render() {
      return (
          <div className="inventory-page">
            <div className="inventory-page-header">
                <h2>Inventory</h2>
            </div>
            <div className="inventory-page-body">
              <CategoriesPanel
                onCategoryChange={this.changeCategory}
                currentCategory={this.state.currentCategory}
                onToggle={this.toggleSidebar}
                hide={this.state.hideSidebar}
              />
              <InventoryList category={this.state.currentCategory} />
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
  let { name, items } = props.category;
  if (name === 'All') {
    items = Categories.reduce((prev, cur) => prev.concat(cur.items), []);
  }
  return (
    <div className="inventory-list">
      { items.map((item, index) => <InventoryItem key={index} item={item} />) }
    </div>
  );
}

const InventoryItem = props => {
  let { imageFile, name, location, qty } = props.item;
  let imageUrl = require(`../assets/images/inventory/${imageFile}`).default;
  return (
    <Card >
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
  );
}

export default InventoryPage;