import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import './InventoryList.css';
import Inventory from '../assets/inventory.json';

class InventoryPage extends Component {
    constructor(props) {
        super(props);
        this.changeCategory = this.changeCategory.bind(this);
        this.state = { 
          active: 0
        };
    }

  changeCategory(index) {
    this.setState(prevState => ({ active: index }));
  }

  get currentCategory() {
    return Inventory.find((invItem, index) => index === this.state.active);
  }

  render() {
      return (
          <div className="page">
            <div className="category-sidebar">
              <div className="heading">
                  <h2>Inventory </h2>
              </div>
              <CategoriesPanel onCategoryChange={this.changeCategory} currentCategory={this.currentCategory} />
            </div>

            <InventoryList category={this.currentCategory} />
          </div> 
      );
  }
}

const CategoriesPanel = props => {
  return (
    <ul>
      {
        Inventory.map((category, index) =>
          <CategoryItem key={index} active={category.category === props.currentCategory.category} onCategoryItemSelect={() => props.onCategoryChange(index)} category={category} />)
      }
    </ul>
  );
}

const CategoryItem = props => {
  let category = props.category;
  return (
    <li
      style={{ backgroundColor: category.backgroundColor, color: category.color}}
      onClick={props.onCategoryItemSelect}
      className={ (props.active ? 'active' : '') + ' category-item'}
    >
      {category.category}
    </li>
  );
}

const InventoryList = props => {
  let category = props.category;
  return (
    <div className="inventory-list">
      {
      category.category === 'All' ?
        Inventory.reduce((prev, cur) => prev.concat(cur.items), [])
          .map((item, index) => <InventoryItem key={index} item={item} />) :
        category.items.map((item, index) => <InventoryItem key={index} item={item} />)
      }
    </div>
  );
}

const InventoryItem = props => {
  let imgUrl = require(`../assets/images/inventory/${props.item.imageFile}`).default;
  return (
    <Card >
      <div className="cardImage">
        <Card.Img src={imgUrl} alt={props.item.imageFile} />
      </div>
      <div className="cardBottom">
        <div className="cardText">
          <Card.Text >{props.item.name}</Card.Text>
          <Card.Text>{props.item.location}</Card.Text>
        </div>
        <div className="cardQty">
          <Card.Text id="qty">Qty: &nbsp;</Card.Text>
          <Card.Text >{props.item.qty}</Card.Text>
        </div>
      </div>
   
    </Card>
  );
}

export default InventoryPage;