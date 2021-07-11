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
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/e4d9ad29db.js" crossorigin="anonymous"></script>
    <script src="scripts/script.js"></script>
    <link rel="stylesheet" href="styles/style.css">
    <title>Home</title>
</head>

<body>
    <div id="overlay"></div>
    <script>
        $(() => {
            loadProducts();
            $('#search-container').hide();
            //unsetHoverIconLis();
        });
    </script>
    <header>
        <span>Name</span>
        <nav>
            <span><a href="index.php">Home</a></span>
            <span>Products</span>
        </nav>
        <div>
            <?php
            if (isset($_SESSION['user'])) {
                echo "<div id=\"icon-search\" onclick=\"searchIconClick();\">
                    <i class=\"fas fa-search fa-lg\" class=\"icon\" onclick=\"\"></i>
                </div>
                <div id=\"icon-cart\">
                    <a href=\"cart.php\">
                        <i class=\" fas fa-shopping-cart fa-lg\" id=\"cart\" onclick=\"\"></i>
                    </a>
                </div>
                <div id=\"icon-user\" onmouseover=\"logIconMouseEnter();\" onmouseout=\"logIconMouseLeave();\">
                    <i class=\"fas fa-user icon fa-lg\"></i>
                </div>";
            } else {
                echo "<div id=\"icon-search\" onclick=\"searchIconClick();\">
                    <i class=\"fas fa-search fa-lg\" class=\"icon\" onclick=\"\"></i>
                </div>
                <div id=\"icon-user\" onclick=\"logIconClick();\">
                    <i class=\"fas fa-user icon fa-lg\"></i>
                </div>";
            }
            ?>
        </div>
    </header>
    <section id="search-container">
        <div id="search-bar">
            <span id="search-title">Search</span>
            <input type="text" name="search" id="search-input" onkeyup="searchInputValueChange(this);" autocomplete="off" />
            <div id="search-results">
            </div>
        </div>
    </section>
    <?php
    if (isset($_SESSION['user'])) {
        echo "<div id=\"pop-over\" onmouseover=\"logIconMouseEnter();\" onmouseout=\"logIconMouseLeave();\">
                <div><a href=\"wishlist.php\">Wishlist</a></div>
                <div onclick=\"logoutClick();\">Logout</div>
            </div>";
    } else {
        echo "<div class=\"container-sign\">
                <i class=\"fas fa-times\"></i>
                <h1>Sign In</h1>
                <div class=\"container-fields-signin\">
                    <input type=\"text\" name=\"l-un\" id=\"l-un\" placeholder=\"Username\" required>
                    <input type=\"password\" name=\"l-pw\" id=\"l-pw\" placeholder=\"Password\" required>
                </div>
                <button id=\"btn-signin\" onclick=\"signInButtonClick();\">Sign In</button>
                <div class=\"container-sign-link\">
                    <span>No Account Yet?</span>
                    <span id=\"link-signup\" onclick=\"signUpClick();\">Sign Up</span>
                </div>
            </div>
            <script>$(\".container-sign\").hide();</script>
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