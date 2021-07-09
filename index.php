<?php
session_start();
//$_SESSION['user'] = 'a';
//$_SESSION = [];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/e4d9ad29db.js" crossorigin="anonymous"></script>
    <script src="scripts/script.js"></script>
    <link rel="stylesheet" href="styles/style.css">
    <title>Home</title>
</head>

<body>
    <script>
        $(() => {
            loadProducts();
            $(".container-login").hide();
            //unsetHoverIconLis();
        });
    </script>
    <header>
        <span>Name</span>
        <nav>
            <span>Home</span>
            <span>All Products</span>
        </nav>
        <div>
            <?php
            if (isset($_SESSION['user'])) {
                echo "<div id=\"icon-search\">
                    <i class=\"fas fa-search\" class=\"icon\" onclick=\"\"></i>
                </div>
                <div id=\"icon-cart\">
                    <a href=\"cart.php\">
                        <i class=\" fas fa-shopping-cart\" id=\"cart\" onclick=\"\"></i>
                    </a>
                </div>
                <div id=\"icon-user\" onmouseover=\"logIconMouseEnter();\" onmouseout=\"logIconMouseLeave();\">
                    <i class=\"fas fa-user icon\"></i>
                </div>";
            } else {
                echo "<div id=\"icon-search\">
                    <i class=\"fas fa-search\" class=\"icon\" onclick=\"\"></i>
                </div>
                <div id=\"icon-user\" onclick=\"logIconClick();\">
                    <i class=\"fas fa-user icon\"></i>
                </div>";
            }
            ?>

            <!--       LOGGED      
            <div>
                <i class=" fas fa-shopping-cart" id="cart"></i>
            </div>
            <div>
                <i class="fas fa-user" id="user"></i>
                <span id="username">Tim</span>
            </div>
            -->
        </div>
    </header>
    <?php
    if (isset($_SESSION['user'])) {
        echo "<div id=\"pop-over\" onmouseover=\"logIconMouseEnter();\" onmouseout=\"logIconMouseLeave();\">
                <div>Wishlist</div>
                <div onclick=\"logoutClick();\">Logout</div>
            </div>";
    } else {
        echo "<div class=\"container-login\" id=\"form-signup\">
                <h1>Sign Up</h1>
                <div class=\"container-fields-signup\">
                    <input type=\"text\" name=\"r-un\" id=\"r-un\" placeholder=\"Username\">
                    <input type=\"text\" name=\"r-pw\" id=\"r-pw\" placeholder=\"Password\">
                    <input type=\"text\" name=\"r-cpw\" id=\"r-cpw\" placeholder=\"Confirm Password\">
                    <input type=\"text\" name=\"r-fn\" id=\"r-fn\" placeholder=\"Full Name\">
                    <input type=\"text\" name=\"r-ad\" id=\"r-ad\" placeholder=\"Address\">
                    <input type=\"text\" name=\"r-pn\" id=\"r-pn\" placeholder=\"Phone Number\">
                </div>
                <button id=\"btn-signup\" onclick=\"signUpButtonClick();\">Sign Up</button>
                <div class=\"container-sign-link\">
                    <span>Has account already?</span>
                    <span id=\"link-signin\" onclick=\"signInClick();\">Sign In</span>
                </div>
            </div>
            <div class=\"container-login\" id=\"form-signin\">
                <h1>Sign In</h1>
                <div class=\"container-fields-signin\">
                    <input type=\"text\" name=\"l-un\" id=\"l-un\" placeholder=\"Username\">
                    <input type=\"text\" name=\"l-pw\" id=\"l-pw\" placeholder=\"Password\">
                </div>
                <button id=\"btn-signin\" onclick=\"signInButtonClick();\">Sign In</button>
                <div class=\"container-sign-link\">
                    <span>No Account Yet?</span>
                    <span id=\"link-signup\" onclick=\"signUpClick();\">Sign Up</span>
                </div>
            </div>
            ";
    }
    ?>
    <main id="page-home">
        <section class="banner"></section>
        <h1>Product Categories</h1>
        <section class="section-catproducts">
        </section>
    </main>
    <footer>

    </footer>
</body>

</html>