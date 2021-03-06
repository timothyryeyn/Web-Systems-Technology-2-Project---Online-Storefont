<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('location: index.php');
}
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
    <title>Cart</title>
</head>

<body>
    <script>
        $(() => {
            loadCart();
            $('#category-container').hide();
        });
    </script>
    <header>
        <div>
            <img src="files/images/shop-it.png" alt="shop-it" id="shop-it-logo">
            <span id="logo-title">Shop It!</span>
        </div>
        <nav>
            <span><a href="index.php">Home</a></span>
            <span id="nav-products" onmouseover="productNavMouseEnter();" onmouseout="productNavMouseLeave();"><a href="products.php?type=all">Products</a></span>
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
    <section id="search-container">
        <div id="search-bar">
            <input type="text" name="search" id="search-input" onkeyup="searchInputValueChange(this);" autocomplete="off">
            <div id="search-results">
            </div>
        </div>
    </section>
    <section id="category-container" onmouseover="productNavMouseEnter();" onmouseout="productNavMouseLeave();">
        <span><a href="products.php?type=category&key=Beverages">Beverages</a></span>
        <span><a href="products.php?type=category&key=Chocolates">Chocolates</a></span>
        <span><a href="products.php?type=category&key=Condiments">Condiments</a></span>
        <span><a href="products.php?type=category&key=Snacks">Snacks</a></span>
        <span><a href="products.php?type=category&key=Fruits">Fruits</a></span>
        <span><a href="products.php?type=category&key=Vegetables">Vegetables</a></span>
    </section>
    <?php
    if (isset($_SESSION['user'])) {
        echo "<div id=\"pop-over\" onmouseover=\"logIconMouseEnter();\" onmouseout=\"logIconMouseLeave();\">
                <div><a href=\"wishlist.php\">Wishlist</a></div>
                <div onclick=\"logoutClick();\">Logout</div>
            </div>";
    }
    ?>
    <main id="page-cart">
        <section class="section-cart">
            <table>
                <thead>
                    <tr class="cart-row">
                        <th class="col-info">Name</td>
                        <th class="col-qty">Quantity</td>
                        <th class="col-subtotal">Subtotal</td>
                    </tr>
                </thead>
                <tbody id="cart-items-container">
                </tbody>
            </table>
            <div class="container-total">
                <div class="cart-total-info" id="cart-total">$5.00</div>
                <div class="cart-total-label">Total:</div>
            </div>
            <div class="container-checkout">
                <div>
                    <button class="btn-checkout" onclick="checkoutClick();">Checkout</button>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <div class="footer-info-container">
            <div>Developed By:</div>
            <div>Timothy Ryeyn L. Perez</div>
            <div>3rd Year BSIT at Bulacan State University</div>
            <div><a href="https://www.github.com/timothyryeyn" target="_blank"><i class="fab fa-github"></i>Github</a></div>
            <div><a href="https://www.linkedin.com/in/timothy-ryeyn-perez" target="_blank"><i class="fab fa-linkedin-in"></i>LinkedIn</a></div>
            <div><a href="https://web.facebook.com/timothyryeyn.perez/" target="_blank"><i class="fab fa-facebook"></i>Facebook</a></div>
            <div><span><i class="fab fa-google"></i>timothyryeyn.perez@gmail.com</span></div>
        </div>
        <div class="footer-info-container">
            <div>Collaborators:</div>
            <div>Leo Carlo C. Reyes</div>
            <div>Dorothy Joy M. Francisco</div>
            <div>Ian Christian P. Romero</div>
            <div>Marinella M. De Guzman</div>
            <div></div>
    </footer>
</body>

</html>