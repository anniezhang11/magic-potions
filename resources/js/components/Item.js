import React, { Component } from 'react'

class Item extends Component {
    render () {
        const { itemInfo, handleChange } = this.props;

        return (
            <div>
                <label>
                    Quantity:
                    <input name="quantity" type="number" value={itemInfo.quantity} onChange={handleChange} />
                </label>
                <label>
                    Total:
                    <input name="total" type="text" value={itemInfo.total} onChange={handleChange} disabled/>
                </label>
            </div>
        )
    }
}

export default Item 