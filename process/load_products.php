<?php

require 'utilities.php';

$type = $_POST['type'];
$search = $_POST['search'];

switch ($type) {
    case 'home':
        $products = getSimpleXml(PRODUCT_INFOS_PATH);
        echo json_encode($products);
        break;
    case 'all':
        echo displayAllProducts();
        break;
    case 'category':
        echo displayProductsOfCategory($search);
        break;
    case 'product':
        echo displayProduct($search);
        break;
}
