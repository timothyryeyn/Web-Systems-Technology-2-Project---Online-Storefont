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
            loadWishlist();
            $('#search-container').hide();
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
                echo "<div id=\"icon-search\" onclick=\"searchIconClick();\">
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
        </div>
    </header>
    <section id="search-container">
        <div id="search-bar">
            <input type="text" name="search" id="search-input" onkeyup="searchInputValueChange(this);" autocomplete="off">
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
    }
    ?>
    <main id="page-wishlist">
        <section class="section-wishlist">
            <table>
                <thead>
                    <tr>
                        <th class="col-info">Name</th>
                        <th class="col-addcart">Add To Cart</th>
                    </tr>
                </thead>
                <tbody id="wishlist-items-container">
                </tbody>
            </table>
        </section>
    </main>
    <footer>

    </footer>
</body>

</html>