## Hello!
**[This project can be found live on Heroku here](https://sheltered-castle-49453.herokuapp.com/).**

## Tech Stack
This project uses [Laravel](https://laravel.com/) and [React](https://reactjs.org/); it is written
in [PHP](https://www.php.net/), [JavaScript](https://www.javascript.com/), and [SASS](https://sass-lang.com/).

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
I chose to use PostgreSQL for this application; it's great for high-transactional enterprise level 
applications, and can run more complex queries on large volumes of data if data analysis is something
that would happen down the line. The DB schema is set up well for scaling purposes; if more products 
were to be added, a third `products` table could be added containing product pricing and availability
information, and we would just need to add a column to `orders` referring to the foreign key of the
product being purchased. Additionally, if user profiles were to be implemented in the future, the 
`customers` table is already set up quite well to handle that; we may need to add a couple columns, such as 
`user_id` and `user_password`, but the `customers` table already includes other relevant information.

In terms of performance, indexes could be added to speed up the lookup process for existing customers
and any existing orders of a customer placing an order. We could also introduce a load balancer once
the website starts receiving orders in a greater volume.

### Describe your front end architecture and why you chose to create it as you did.
The frontend is a React application using JavaScript and SCSS. I'm not sure if Curology uses functional
components or React hooks, but I stuck with class components because that's what I'm most familiar with, 
and learning Laravel was my big learning goal for this project. 

**Components**

Within `App.js`, you'll find that the frontend is split into two main components: `Header` 
and `MagicPotion`. This was done so `Header` can be easily reused on other pages in the future. 
`MagicPotion` itself is a form component with the POST request that includes two other components: 
`Item` and `Checkout`. This was done keeping in mind that this website could sell more products in 
the future; `Item` and `Checkout` are both easily reusable for other pages if needed. I chose to wrap both 
in a form for simplicity reasons; I also considered having the `Checkout` component handle 
all the form submission functionality, but that would require passing data from `Item` 
to `Checkout` and the current implementation is a bit more straightforward. `MagicPotion` contains all 
of the key functionality: state management, request handling, error handling, and form validation. Some
of these functions are then passed into `Item` and `Checkout` for ease of use. 

**State Management**

The `MagicPotion` state is split into three different areas for ease of use: `customerInfo`, `itemInfo`, 
and `error`. `customerInfo` corresponds to the `Checkout` inputs, and includes contact and billing 
information. Similarly, `itemInfo` corresponds to the `Item` quantity input and total value. The `error` 
value can be set to any form validation errors from the frontend after a user attempts to submit the form. 
Any `setState` functionality is defined within `MagicPotion` and then passed into `customerInfo` and `itemInfo` 
as needed for compartmentalization. 

**Error Handling**

As mentioned above, the `error` value can be set to any form validation errors from the frontend after 
a user attempts to submit the form. This value is immediately cleared upon submit, and calculated within the
validation section of the submit function. If it exists, the error string is displayed above the submit button 
in red text for UX reasons using `renderError`. 

Additionally, we utilize the Window `alert()` method for any endpoint success or failures. The success message
displays the order number for user reference, and the failure message comes straight from the endpoint.

**Form Validation**

Form validation for this application is relatively simple: on form submit, we ensure that all fields necessary
exist and do not exceed any length restrictions. For more complex fields, such as email or credit card expiration,
we also do further validation using regex and date comparisons. Finally, there currently exists a dummy
`validateCard` function that always returns true, which can be integrated with Stripe or another credit card 
authorization service in the future. 

### Describe the API architecture.
The API is written using Laravel, a PHP framework. 

**Models**

We have two models that correspond with each table in the db: `Orders` and `Customers`. Each model defines the
fillable fields within the respective tables.

**Routes**

We define the entry point for the frontend in `web.php`, and any endpoint routes are defines in `api.php`. 
There's one route for each of the requested endpoints, and the endpoint handlers exist within `OrderController`.

**Controllers**

There's just one controller, `OrderController`, to handle order-related requests. Each function within this
controller handles a corresponding route as defined in routes, with the following requested functionality: 

- `POST /api/magic` to submit a full order
- `GET /api/magic/<uid>` to retrieve order information corresponding to `uid`
- `PATCH /api/magic` to set the fulfilled value of a specific order
- `DELETE /api/magic/<uid>` to delete an order with `uid`

**Tests**

Feature tests for each route are written in `tests/Feature/Feature`. These are quite simple to test basic success
and fail cases for now.

### With more time or in a different environment, what would you do differently?
This was my first time using Laravel and deploying an app to Heroku; although I had experience coding on a PHP
framework and using Heroku previously, there was definitely a bit of a learning curve to figure out the intricacies
or Laravel. With more time, there are quite a few things I would do differently:

- Testing: the testing I've implemented now is super simple. With more time, I would implement more vigorous unit 
  testing, including incorporating more edge cases and writing better testing code (for example, I wasn't able to 
  figure out how to have one test depend on the values/results/effects of a previous test).
- UI/UX: by no means am I designer, but I really love good design when I see it! I would love the opportunity to
  make this website not only prettier, but also more functional. Additionally, I would implement better mobile
  responsiveness support; it currently exists but is not ideal given my limited time. 
- Validation: any form validation that exists is currently on the frontend. Given more time, I would add more
  rigorous form validation (for example, not allowing a subset of special characters in the name fields, 
  incorporating a plugin for address and credit card validation, etc). I would also add further validation to the 
  backend just to be more safe.

Furthermore, since this was my first time using Laravel, I'm sure there are many things that I'm missing that I'm 
unaware of. In a different environment, I'd love the opportunity to get this code reviewed by a more senior engineer 
to see how I can improve this application and if there's anything I'm doing incorrectly. 

### What would you do to improve or scale the application?
There's plenty of opportunity to improve and scale this application! Along with the three points mentioned above
(testing, UI/UX, and validation improvements) as well as the db improvements mentioned previously, we 
could also add authentication to further improve this platform. Currently, the endpoints are completely 
unprotected, which is not ideal for a sales website. Some smaller improvements I would also include both in 
general and for scaling purposes: 

- 404 Not Found pages.
- Implementing a separate cart page instead of having contact/billing info on the same page as the product page so 
  that adding more products to the website can be more easily handled.
- Incorporating user profiles so that returning users could have their contact/billing info pre-filled in. This would
  also make the checkout process a bit smoother and faster.
- Using uuids instead of incremental IDs so that database writes can be spread across many servers in the future.

### Bonus
**Unit Tests** 

Simple unit tests for each route can be found within `tests/Feature/Feature`, testing success and
failure cases for each route.  

**Custom CSS**

I kept the product and contact/billing information portions separate, but added a couple aspects:

- Responsiveness: as e-commerce is shifting more and more to mobile devices, I took 
  responsiveness into account. The page is relatively responsive (improvements could be made
  with more time). Both the product and contact/billing info are also displayed horizontally on larger screens. 
- I added placeholder description text for the item in case that's needed in the future. 
- I also incoporated a lightly Halloween inspired color palette as found on [https://coolors.co/palettes/trending]
  (https://coolors.co/palettes/trending).
