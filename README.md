# PlaywrightExample
This is an example of a Playwright test framework project

# Example website
https://www.saucedemo.com/

# Run test commands
Some comamnds to run to see if its working
```
npx playwright test [test file]
npx playwright test login.spec.js --project firefox --headed
npx playwright test -g "login page visibile"
npx playwright test -g "standard user login" --project firefox --headed
```

# Login Test: login.spec.js
Basic login tests.
-   login page visibile
-   standard user login
-   locked out user login
-   bad user login
-   standard user login poor performance

# Login Test: shopping.spec.js
-   add item to cart

# Login Test: e2e-tests.spec.js
-   standard user login and logout
-   standard user shops for 1 item and checks out then logs out