## Hello!
**[This project can be found live on Heroku here](https://sheltered-castle-49453.herokuapp.com/).**

## Tech Stack
This project uses [Laravel](https://laravel.com/) and [React](https://reactjs.org/).

## Specific Questions

### Describe your data schema and how it relates to the purchasing of magic potions.
There are two tables: `customers` and `orders`. The tables are configured as follows:

**customers**
| Field      | Type                    |
|------------|-------------------------|
| id         | int (autoincrement)     |
| first_name | varchar(50)             |
| last_name  | varchar(50)             |
| street1    | varchar(60)             |
| street2    | varchar(60)             |
| city       | varchar(50)             |
| state      | varchar(50)             |
| zip        | varchar(5)              |
| email      | varchar(50)             |
| phone      | varchar(10)             |

**orders**
| Field           | Type                |
|-----------------|---------------------|
| id              | int (autoincrement) |
| customer_id     | int                 |
| card_number     | varchar(20)         |
| card_expiration | varchar(5)          |
| quantity        | int                 |
| total           | double              |
| fulfilled       | bool                |

Each table also has automatic `created_at` and `updated_at` timestamps. 

In the table `orders`, the `customer_id` key is a foreign key that refers to a corresponding
row in the `customers` table. There is a one to many relationship between `customers` and `orders`;
each order must correspond to exactly one customer, and each customer can have many orders. This 
corresponds to the purchasing of magic potions as customers have monthly limits of 3 potions maximum. 
When a purchase is made, we can easily check for whether the customer exists already by matching
name and address within `customers`, and then check for any previous orders by `customer_id` within 
the orders table. 

In creating this db schema, there was also the option of having just one db with all the information 
(customer and order-related). I pursued this design instead for scalability reasons, especially 
keeping in mind that many online purchasing platforms emcompass user profiles; separating `customers` 
from `orders` allows for that to be easily implemented if needed. 

### Describe how this could scale over time.

### Describe your front end architecture and why you chose to create it as you did.

### Describe the API architecture.

### With more time or in a different environment, what would you do differently?

### What would you do to improve or scale the application?

### Bonus
Unit tests.
Custom CSS frontend.
