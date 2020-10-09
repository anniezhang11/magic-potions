import React, { Component } from 'react'

class Item extends Component {
    render () {
        const { itemInfo, handleChange } = this.props;

        return (
            <div className="item-container">
                <div className="section-header">Magic Potion # 1</div>
                <div className="item-details">
                    <div className="image-container">
                        <img src='/img/potion.jpg' className="item-image"></img>
                    </div>
                    <div className="item-pricing">
                        <div className="item-price">$49.99</div>
                        <div className="item-label">Quantity (max 3):</div>
                        <input 
                            name="quantity" 
                            type="number" 
                            value={itemInfo.quantity} 
                            onChange={handleChange} 
                            min={0} 
                            max={3}
                        />
                        <div>Total: ${itemInfo.total} </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item 