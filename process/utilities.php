<?php

date_default_timezone_set('Asia/Manila');

define('USER_CONVOS_PATH', '../database/user/user_convos.xml');
define('USER_INFOS_PATH', '../database/user/user_infos.xml');
define('PRODUCT_TAGS_PATH', '../database/product/product_tags.xml');
define('PRODUCT_INFOS_PATH', '../database/product/product_infos.xml');
define('CARTS_PATH', '../database/carts.xml');
define('PURCHASE_HISTORY_PATH', '../database/purchase_histories.xml');
define('WISH_LIST_PATH', '../database/wish_lists.xml');

//                                                                              RETURN: JSON STRING
function displayCartItemsOfUser($username)
{
    $carts = getSimpleXml(CARTS_PATH);

    foreach ($carts->cart as $cart) {
        if ($cart['user'] == $username) {
            return json_encode($cart->children());
        }
    }
} //display all cart items with info of given user

function displayWishlistOfUser($username)
{
    $wishlist = getSimpleXml(WISH_LIST_PATH);

    foreach ($wishlist->wish as $wish) {
        if ($wish['user'] == $username) {
            return json_encode($wish->children());
        }
    }
}

function displayConversationOfUserWith($convoOwner, $conversator)
{
    $users_convos = getSimpleXml(USER_CONVOS_PATH);

    foreach ($users_convos->conversation as $conversation) {
        if ($conversation['of'] == $convoOwner) {
            foreach ($conversation->with as $with) {
                if ($with['user'] == $conversator) {

                    return json_encode($with->children());
                }
            }
        }
    }
}

function displayProductsOfCategory($categoryName)
{

    $products = getSimpleXml(PRODUCT_INFOS_PATH);

    foreach ($products->category as $category) {
        if ($category['name'] == $categoryName) {

            return json_encode($category->children());
        }
    }
} //display all products with info of given category

function displayProduct($search)
{

    $products = getSimpleXml(PRODUCT_INFOS_PATH);

    foreach ($products->category as $category) {
        foreach ($category->product as $product) {
            if ($product->name == $search) {
                return json_encode($product);
            }
        }
    }
} //display product searched

function displaySearchKeys()
{
    $products = getSimpleXml(PRODUCT_TAGS_PATH);

    return json_encode($products);
}

//                                                                              RETURN: BOOL
function doesUserExist($username)
{
    $users_infos = getSimpleXml(USER_INFOS_PATH);

    foreach ($users_infos->user as $user) {
        if ($user['username'] == $username) {
            return true;
        }
    }

    return false;
}

function isUserExisting($username, $password)
{
    $users_infos = getSimpleXml(USER_INFOS_PATH);

    foreach ($users_infos->user as $user) {
        if ($user['username'] == $username && $user['password'] == $password) {
            return $username;
        }
    }

    return null;
} //checks if username and password is correct

function hasOnWishlist($username, $itemName)
{
    $wishlist = getSimpleXml(WISH_LIST_PATH);

    foreach ($wishlist->wish as $wish) {
        if ($wish['user'] == $username) {
            foreach ($wish->item as $item) {
                if ($item->name == $itemName) {
                    return true;
                }
            }
        }
    }
    return false;
} // check if item is already in the wish list

function hasConversationWith($username, $userToSearch)
{
    $users_convos = getSimpleXml(USER_CONVOS_PATH);

    foreach ($users_convos->conversation as $conversation) {
        if ($conversation['of'] == $username) {
            foreach ($conversation->with as $with) {
                if ($with['user'] == $userToSearch) {
                    return true;
                }
            }
        }
    }
    return false;
}

//                                                                              RETURN: SIMPLEXML
function findProduct($productName)
{

    $products = getSimpleXml(PRODUCT_INFOS_PATH);

    foreach ($products->category as $category) {
        foreach ($category->product as $product) {

            if ($product->name == $productName) {
                return $product->children();
            }
        }
    }
    return null;
} //returns a readable simple xml of a given product name

function getSimpleXml($path)
{
    if (file_exists($path)) {
        return simplexml_load_file($path);
    }

    echo "Fail retrieving $path";
} //returns a simple xml of a given xml file


//                                                                              RETURN: VOID
function addNewUser($username, $password, $fullName, $address, $phoneNumber)
{
    $users_infos = getSimpleXml(USER_INFOS_PATH);
    $users_convos = getSimpleXml(USER_CONVOS_PATH);
    $carts = getSimpleXml(CARTS_PATH);
    $histories = getSimpleXml(PURCHASE_HISTORY_PATH);
    $wishlist = getSimpleXml(WISH_LIST_PATH);

    //NEW USER CREATION
    $newUser = $users_infos->addChild('user');
    $newUser->addAttribute('username', $username);
    $newUser->addAttribute('password', $password);
    $newUser->addChild('fullName', $fullName);
    $newUser->addChild('address', $address);
    $newUser->addChild('phoneNumber', $phoneNumber);
    $users_infos->saveXML(USER_INFOS_PATH);

    //USER CONVO CREATION
    $conversation = $users_convos->addChild('conversation');
    $conversation->addAttribute('of', $username);
    $users_convos->saveXML(USER_CONVOS_PATH);

    //USER CART CREATION
    $cart = $carts->addChild('cart');
    $cart->addAttribute('user', $username);
    $carts->saveXML(CARTS_PATH);

    //PURCHASE HISTORY CREATION
    $history = $histories->addChild('history');
    $history->addAttribute('user', $username);
    $histories->saveXML(PURCHASE_HISTORY_PATH);

    //WISH LIST CREATION
    $wish = $wishlist->addChild('wish');
    $wish->addAttribute('user', $username);
    $wishlist->saveXML(WISH_LIST_PATH);
} //adds a new user with the given credentials

function addToCart($username, $itemName, $qty)
{

    $carts = getSimpleXml(CARTS_PATH);

    foreach ($carts->cart as $cart) {
        if ($cart['user'] == $username) {

            $hasProduct = false;

            //check if product is in cart and add qty
            foreach ($cart->item as $item) {
                if ($item->name == $itemName) {
                    $hasProduct = true;
                    $item->qty += intval($qty);
                }
            }

            if (!$hasProduct) {
                $product_info = findProduct($itemName);

                if ($product_info != null) {
                    $name = $product_info->name;
                    $price = $product_info->price;
                    $stock = $product_info->stock;
                    $img = $product_info->img;

                    //NEW ITEM CREATION
                    $newItem = $cart->addChild('item');

                    //ADDING INFO
                    $newItem->addChild('name', $name);
                    $newItem->addChild('price', $price);
                    $newItem->addChild('qty', $qty);
                    $newItem->addChild('stock', $stock);
                    $newItem->addChild('img', $img);
                    //echo json_encode($product_info);
                }
            }
        }
    }

    $carts->saveXML(CARTS_PATH);
    updateStock();
} //adds an item with the given qty of the given user

function addToWish($username, $itemName)
{
    $wishlist = getSimpleXml(WISH_LIST_PATH);

    foreach ($wishlist->wish as $wish) {
        if ($wish['user'] == $username) {
            $productInfo = findProduct($itemName);
            $itemPrice = $productInfo->price;
            $itemImg = $productInfo->img;

            $newItem = $wish->addChild('item');
            $newItem->addChild('name', $itemName);
            $newItem->addChild('price', $itemPrice);
            $newItem->addChild('img', $itemImg);
            $wishlist->saveXML(WISH_LIST_PATH);
        }
    }
} //adds the given item to given users wishlist

function addToPurchaseHistory($username, $items)
{
    $histories = getSimpleXml(PURCHASE_HISTORY_PATH);

    foreach ($histories->history as $history) {
        if ($history['user'] == $username) {
            //NEW PURCHASE CREATION
            $newPurchase = $history->addChild('purchase');

            //ADDING INFO
            $newPurchase->addAttribute('total', '0');
            $newPurchase->addAttribute('date', date('Y/m/d H:i:s'));

            //ADDING ITEMS
            foreach ($items as $name => $qty) {
                $productInfo = findProduct($name);
                $productPrice = $productInfo->price;
                $productStock = $productInfo->stock;
                $productImg = $productInfo->img;
                $qtyOnHistory = $qty > $productStock ? $productStock : $qty;

                //ADDING ITEM INFO
                $item = $newPurchase->addChild('item');
                $item->addChild('name', $name);
                $item->addChild('price', $productPrice);
                $item->addChild('qty', $qtyOnHistory);
                $item->addChild('img', $productImg);

                //CALCULATING AND SETTING TOTAL PRICE
                $newPurchase['total'] = $newPurchase['total'] + ($productPrice * $qty);
            }

            $histories->saveXML(PURCHASE_HISTORY_PATH);
        }
    }
} //create a history of the purchase

function purchaseItemOrItems($username, $items)
{
    addToPurchaseHistory($username, $items);
    foreach ($items as $name => $qty) {
        takeProduct($name, $qty);
        removeToCart($username, $name);
    }
} //purchase all of the given products and remove it to given user's cart

function removeToCart($username, $itemName)
{
    $carts = getSimpleXml(CARTS_PATH);

    for ($i = 0; $i < $carts->count(); $i++) {
        if ($carts->cart[$i]['user'] == $username) {
            for ($j = 0; $j < $carts->cart[$i]->count(); $j++) {
                if ($carts->cart[$i]->item[$j]->name == $itemName) {
                    unset($carts->cart[$i]->item[$j]);

                    $carts->saveXML(CARTS_PATH);
                }
            }
        }
    }
}   //removes an item to given user's cart

function updateItemQtyOnCart($username, $items)
{
    $carts = getSimpleXml(CARTS_PATH);

    foreach ($carts->cart as $cart) {
        if ($cart['user'] == $username) {

            //check if product is in cart and update qty
            foreach ($items as $name => $qty) {
                foreach ($cart->item as $item) {
                    if ($item->name == $name) {

                        $item->qty = $qty;
                    }
                }
            }
        }
    }
    $carts->saveXML(CARTS_PATH);
}

function removeToWishlist($username, $itemName)
{
    $wishlist = getSimpleXml(WISH_LIST_PATH);

    for ($i = 0; $i < $wishlist->count(); $i++) {
        if ($wishlist->wish[$i]['user'] == $username) {
            for ($j = 0; $j < $wishlist->wish[$i]->count(); $j++) {
                if ($wishlist->wish[$i]->item[$j]->name == $itemName) {
                    unset($wishlist->wish[$i]->item[$j]);
                    $wishlist->saveXML(WISH_LIST_PATH);
                }
            }
        }
    }
}  //removes an item to given user's wishlist

function addMessage($convoOwner, $conversator, $msg, $isSender)
{
    $users_convos = getSimpleXml(USER_CONVOS_PATH);

    $action = $isSender ? 'send' : 'receive';

    foreach ($users_convos->conversation as $conversation) {
        if ($conversation['of'] == $convoOwner) {
            if (hasConversationWith($convoOwner, $conversator)) {
                foreach ($conversation->with as $with) {
                    if ($with['user'] == $conversator) {
                        //ADD MESSAGE
                        $content = $with->addChild('msg');
                        $content->addChild('date', date('Y/m/d H:i:s'));
                        $content->addChild('content', $msg);
                        $content->addChild('action', $action);

                        $users_convos->saveXML(USER_CONVOS_PATH);
                    }
                }
            } else {
                //ADD RECEIVER
                $with = $conversation->addChild('with');
                $with->addAttribute('user', $conversator);

                //ADD MESSAGE
                $content = $with->addChild('msg');
                $content->addChild('date', date('Y/m/d H:i:s'));
                $content->addChild('content', $msg);
                $content->addChild('action', $action);

                $users_convos->saveXML(USER_CONVOS_PATH);
            }
        }
    }
} //add the given message to conversation of the given sender to given receiver

function takeProduct($itemName, $qty)
{
    $products = getSimpleXml(PRODUCT_INFOS_PATH);

    foreach ($products->category as $category) {
        foreach ($category->product as $product) {
            if ($product->name == $itemName) {
                //product name and qty
                $productStock = intval($product->stock);

                //negative value automatically ignored
                $product->stock -= $productStock < $qty ? $productStock : $qty;

                $products->saveXML(PRODUCT_INFOS_PATH);
            }
        }
    }
} //take product by the given quantity

function updateStock()
{
    $carts = getSimpleXml(CARTS_PATH);

    foreach ($carts->cart as $cart) {
        foreach ($cart->item as $item) {
            //cart item name and qty
            $cartItemName = strval($item->name);
            $intCartItemQty = intval($item->qty);

            //current item stock
            $itemStock = intval(findProduct($cartItemName)->stock);

            //updating qty and stock
            $item->qty = $intCartItemQty > $itemStock ? $itemStock : $intCartItemQty;
            $item->stock = $itemStock;
            $carts->saveXML(CARTS_PATH);
        }
    }
} //called to fix exceeding qty
