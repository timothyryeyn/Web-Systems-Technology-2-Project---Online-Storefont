<?php

require 'utilities.php';

$category = $_POST['category'];

//echo displayProductsOfCategory($category);
$products = getSimpleXml(PRODUCT_INFOS_PATH);

if ($category == 'all') {
    $products = getSimpleXml(PRODUCT_INFOS_PATH);

    echo json_encode($products);
} else {
    echo displayProductsOfCategory($category);
}
