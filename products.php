<?php
$search = $_GET['search'];
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
            loadProducts(category);

            loginLis();
        });
    </script>
    <header>
        <span>Name</span>
        <nav>
            <span>Home</span>
            <span>All Products</span>
        </nav>
        <div>
            <div>
                <i class="fas fa-search" id="search"></i>
            </div>
            <div>
                <i class="fas fa-user" id="user"></i>
            </div>
            <!--             
            <div>
                <i class="fas fa-shopping-cart" id="cart"></i>
            </div>
            <div>
                <i class="fas fa-user" id="user"></i>
                <span id="username">Tim</span>
            </div>
            -->
        </div>
    </header>
    <main id="page-products">
        <h1>Searched by "<?php echo $_GET['search'] ?>"</h1>
        <section class="section-products">
            <div class="container-products">
            </div>
        </section>
        <section class="section-pagination">
            <div class="container-pagination">
            </div>
        </section>
    </main>
    <footer>

    </footer>
</body>

</html>