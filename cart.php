<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('location: index.php');
}
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
            loadCart();
            //unsetHoverIconLis();
        });
    </script>
    <header>
        <span>Name</span>
        <nav>
            <span><a href="index.php">Home</a></span>
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
                    <i class=\"fas fa-user\" class=\"icon\"></i>
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

    </footer>
</body>

</html>