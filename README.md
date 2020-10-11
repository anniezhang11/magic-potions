## Installation Instructions

**[This project can be found live on Heroku here](https://sheltered-castle-49453.herokuapp.com/).**

This project uses Laravel and React. Before running locally, you'll have to meet these system requirements:

- PHP ([Installation Guide](https://www.php.net/manual/en/install.php))
- Composer ([Installation Guide](https://getcomposer.org/doc/00-intro.md))
- Laravel ([Installation Guide](https://laravel.com/docs/4.2/quick#installation))

## Usage
First, clone the repo:
```bash
git clone https://github.com/anniezhang11/magic-potions.git
```

To install PHP dependancies:
```bash
composer install
```

And JS dependancies:
```bash
npm install
```

To run the backend locally: 
```bash
php artisan serve
```

To compile the frontend locally: 
```bash
npm run dev
```

You should now be able to view the project at [http://localhost:8000/](http://localhost:8000/). 

To view the local database:
```bash
heroku pg:psql
```

To run tests: 
```bash
php vendor/bin/phpunit
```

## Tech Stack
This project uses [Laravel](https://laravel.com/) and [React](https://reactjs.org/).

## Specific Questions

### Describe your data schema and how it relates to the purchasing of magic potions.

### Describe how this could scale over time.

### Describe your front end architecture and why you chose to create it as you did.

### Describe the API architecture.

### With more time or in a different environment, what would you do differently?

### What would you do to improve or scale the application?

### Bonus
Unit tests.
Custom CSS frontend.
