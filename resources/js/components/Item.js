import React, { Component } from 'react'

class Item extends Component {
    render () {
        const { itemInfo, handleChange } = this.props;

        return (
            <div className="item-container col-md-6">
                <div className="section-header">Magic Potion # 1</div>
                <div className="item-details">
                    <div className="image-container">
                        <img src='/img/potion.jpg' className="item-image"></img>
                    </div>
                    <div className="item-pricing">
                        <div className="item-price">$49.99</div>
                        <label>Quantity:</label>
                        <input 
                            name="quantity" 
                            type="number" 
                            value={itemInfo.quantity} 
                            onChange={handleChange} 
                            min={0} 
                            max={3}
                        />
                    </div>
                    <label>Total: {itemInfo.total} </label>
                </div>
            </div>
        )
    }
}

export default Item 