# XYZ MACHINE PROBLEM

**Direction**: Create a program that translates the input (any combination of X, Y, or Z) to their low-resolution ascii art-like representation (use letter ‘O’ as the character to draw the letters)

**Used**:
- Laravel
- Vue + Vuex + Vue Router
- Laravel Sanctum for token authentication

**Setup**:
1. Clone Repository
    ```sh
    $ git clone https://github.com/pjsalita/xyz.git
    ```
2. Install and compile dependencies
    ```sh
    $ composer install
    $ npm install
    $ npm run dev
    ```
3. Create .env file and generate app key
    ```sh
    $ cp .env.example .env
    $ php artisan key:generate
    ```
4. Create **database.sqlite** file under database folder
    ```sh
    $ touch database/database.sqlite
    ```
5. Run migrations
    ```sh
    $ php artisan migrate
    ```
6. Serve
    ```sh
    $ php artisan serve
    ```
7. Visit the served port to check the front-end.

Sample endpoint:
- http://localhost:8000/api/xyz?direction=horizontal&size=5
