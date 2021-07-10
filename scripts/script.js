//SIGN
const SIGN_IN_URL = 'process/sign_in.php';
const SIGN_UP_URL = 'process/sign_up.php';
const SIGN_OUT_URL = 'process/sign_out.php';
//ADD
const ADD_TO_CART_URL = 'process/add_to_cart.php';
const ADD_TO_WISH_URL = 'process/add_to_wish.php';
//REMOVE
const REMOVE_TO_CART_URL = 'process/remove_to_cart.php';
const REMOVE_TO_WISH_URL = 'process/remove_to_wish.php';
//UPDATE
const UPDATE_CART_ITEM_QTY_URL = 'process/update_cart_item_qty.php';
//PURCHASE
const PURCHASE_URL = 'process/purchase.php';
//LOAD
const LOAD_CART_URL = 'process/load_cart.php';
const LOAD_WISHLIST_URL = 'process/load_wishlist.php';
const LOAD_PRODUCTS_URL = 'process/load_products.php';
const LOAD_MESSAGES_URL = 'process/load_messages.php';
const LOAD_KEYWORDS_URL = 'process/load_keywords.php';
//SEND MESSAGE
const SEND_MESSAGE_URL = 'process/send_message.php';

var searchType = getParamValue(window.location.href, 'type');
var key = getParamValue(window.location.href, 'key');

var products = [];
var categories = [];
loadIntellisenseKeywords(products, categories);

//                                AJAX FUNCTIONS
function addToCart(itemName, qty, fromWish = false) {

  $.ajax(
        {
          type: 'POST',
          url: ADD_TO_CART_URL,
          data: {
            'item_name' : itemName,
            'qty' : qty
          },
          success: function(data) {

          switch(data) {
            case 'success':
              alert('Successfully added!');
              break;
            case 'no-user':
              alert('Please login!');
              break;
          }

          if (fromWish) {
            removeToWish(itemName);
          }
        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function addToWish(itemName) {

  $.ajax(
        {
          type: 'POST',
          url: ADD_TO_WISH_URL,
          data: {
            'item_name' : itemName,
          },
          success: function(data) {

          switch(data) {
            case 'success':
              alert('Added to wishlist!');
              break;
            case 'already-wished':
              alert('Item already added!');
              break;
            case 'no-user':
              alert('Please login!');
              break;
          }

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    ); 
}

function updateItemQty(item) {
  $.ajax(
          {
            type: 'POST',
            url: UPDATE_CART_ITEM_QTY_URL,
            data: {
              'items' : JSON.stringify(item)
          },
            success: function(data) {

            console.log(data);

          },
            error: function() {
            console.log("Request Fail");
            }
        }
      );
}

function loadCart() {

  $.ajax(
        {
          type: 'POST',
          url: LOAD_CART_URL,
          success: function(data) {

          loadCartItemsMarkup(JSON.parse(data));

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function loadWishlist() {

  $.ajax(
        {
          type: 'POST',
          url: LOAD_WISHLIST_URL,
          success: function(data) {

          loadWishlistItemMarkup(JSON.parse(data));

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function loadConversation() {

  user = 'a';
  otherUser = 's';

  $.ajax(
        {
          type: 'POST',
          url: LOAD_MESSAGES_URL,
          data: {
            'user' : user,
            'other_user' : otherUser
          },
          success: function(data) {

          console.log(data);
          //console.log(JSON.parse(data));

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function loadProducts(type = 'all', search='', page = 0) {

  $.ajax(
        {
          type: 'POST',
          url: LOAD_PRODUCTS_URL,
          data: {
            'type' : type,
            'search' : search
          },
          success: function(data) {

          var result = JSON.parse(data);

          switch (type) {
            case 'all':    
              loadHomePageProductsMarkup(result);
              break;
            case 'category':
              loadProductsOfCategoryMarkup(result, page);
              break;
            case 'product':
              loadSearchedProductMarkup(result);
              break;
          }

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function loadIntellisenseKeywords(products, categories) {

  $.ajax(
        {
          type: 'POST',
          url: LOAD_KEYWORDS_URL,
          success: function(data) {

          var result = JSON.parse(data);
          
          for (let product of result.products.product) {
            products.push(product);
          }

          for (let category of result.categories.category) {
            categories.push(category);
          }
        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function purchase(items) {
  $.ajax(
        {
          type: 'POST',
          url: PURCHASE_URL,
          data: {
            'items' : JSON.stringify(items)
          },
          success: function(data) {

          alert('Purchase successful!');
          console.log(data);

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function removeToCart(items) {

  $.ajax(
        {
          type: 'POST',
          url: REMOVE_TO_CART_URL,
          data: {
            'items' : JSON.stringify(items)
          },
          success: function(data) {

          //console.log(data);
          alert('Item removed to cart!');
          location.reload();

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function removeToWish(item, explicitlyRemoved = false) {
  items = [item,];

  $.ajax(
        {
          type: 'POST',
          url: REMOVE_TO_WISH_URL,
          data: {
            'items' : items.toString()
          },
          success: function(data) {

          if (explicitlyRemoved) {
            alert('Item removed to wishlist');
          }
          location.reload();

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function signIn(username, password) {

  $.ajax(
        {
          type: 'POST',
          url: SIGN_IN_URL,
          data: {
            'username' : username,
            'password' : password
          },
          success: function(data) {

          if (data == 'success') {
            alert('Successfully logged in!');
            location.reload();
          } else {
            alert('Incorrect username or password!');
          }

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function signUp(username, password, fullName, address, phoneNum) {

  //console.log(`${username} + ${password} + ${fullName} + ${address} + ${phoneNum}`)

  $.ajax(
        {
          type: 'POST',
          url: SIGN_UP_URL,
          data: {
            'username' : username,
            'password' : password,
            'full_name' : fullName,
            'address' : address,
            'phone_num' : phoneNum
          },
          success: function(data) {

          console.log(data);

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function signOut() {
  $.ajax(
        {
          type: 'POST',
          url: SIGN_OUT_URL,
          success: function(data) {

          alert('Successfully logged out!');
          location.reload();
        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function sendMessage() {
  sender = 'b';
  receiver = 's';
  message = 'asdasd';

  $.ajax(
        {
          type: 'POST',
          url: SEND_MESSAGE_URL,
          data: {
            'sender' : sender,
            'receiver' : receiver,
            'message' : message
          },
          success: function(data) {

          console.log(data);

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    ); 
}

//                                UTIL FUNCTIONS
function loadProductsOfCategoryMarkup(products, page) {

  var productArray = products.product;
  var numberOfProducts = Object.keys(productArray).length;
  //console.log(numberOfProducts);

  var markup = '';
  var pageMarkup = '';

  var productsPerPage = 6;

  var numberOfPages = Math.round(numberOfProducts / productsPerPage) > 0 ? 
  Math.round(numberOfProducts / productsPerPage) : 1;

  var from = page * productsPerPage;

  var to = (page + 1) * productsPerPage > numberOfProducts ? 
  numberOfProducts : (page + 1) * productsPerPage;


  for (let i = from; i < to; i++) {

    let product = productArray[i];
    
    markup += `<div class="card-product">
              <img src="${product.img}" alt="sisig">
              <div class="product-info">
                  <span class="item-name">${product.name}</span>
                  <span>${product.price}</span>
                  <span>Stock: ${product.stock}</span>
              </div>
              <div class="cart-adding">
                  <i class="far fa-star" onclick="addToWishClick(this);"></i>
                  <button onclick="addToCartClick(this);">Add To Cart</button>
              </div>
          </div>`;
  }

  for (let i = 0; i < numberOfPages; i++) {
    pageMarkup += `<span class="select-page" onclick="pageLis(this);">${i+1}</span>`;
  }

  $('.container-pagination').html(pageMarkup);
  $('.container-products').html(markup);
}

function loadSearchedProductMarkup(product) {

  markup = `<div class="card-product">
          <img src="${product.img}" alt="sisig">
          <div class="product-info">
              <span class="item-name">${product.name}</span>
              <span>${product.price}</span>
              <span>Stock: ${product.stock}</span>
          </div>
          <div class="cart-adding">
              <i class="far fa-star" onclick="addToWishClick(this);"></i>
              <button onclick="addToCartClick(this);">Add To Cart</button>
          </div>
      </div>`;

  pageMarkup = `<span class="select-page">1</span>`;

  $('.container-pagination').html(pageMarkup);
  $('.container-products').html(markup);
}

function loadHomePageProductsMarkup(allProducts) {

  var productsPerCatContainer = 4;

  var markup = '';
  
  for(let category of allProducts.category) {

    markup += `<div class="container-category">
                <span class="category-name">${category['@attributes'].name}</span>
                <a class="btn-seeall" href="products.php?type=category&key=${category['@attributes'].name}">See All</a>
            </div>
            <div class="container-products">`;

    for (let i = 0; i < productsPerCatContainer; i++) {
      
      let product = category.product[i];

      if (product) {
        markup += `<div class="card-product">
                    <img src="${product.img}" alt="sisig">
                    <div class="product-info">
                        <span class="item-name">${product.name}</span>
                        <span>${product.price}</span>
                        <span>Stock: ${product.stock}</span>
                    </div>
                    <div class="cart-adding">
                        <i class="far fa-star" onclick="addToWishClick(this);"></i>
                        <button onclick="addToCartClick(this);">Add To Cart</button>
                    </div>
                </div>`;
      }
    }

    markup += '</div>';
  }

  $('.section-catproducts').html(markup);
}

function loadCartItemsMarkup(items) {

  // var innerCount = items.item == null ? 0 : Object.keys(items.item).length;
  // var outerCount = Object.keys(items).length;
  // //console.log(`INNER: ${innerCount}`);
  // //console.log(`OUTER: ${outerCount}`);
  //var itemCount = 
  var markup = '';

  for (let item of items.item) {
    var subTotal = item.price * item.qty;
    markup += `<tr class="cart-row">
                <td class="col-info">
                    <div class="col-content item-card">
                        <img src="${item.img}" alt="sisig">
                        <div>
                            <span class="info-name">${item.name}</span>
                            <span class="info-price">$${item.price}</span>
                            <span class="btn-remove">
                                <i class="fas fa-trash-alt" onclick="removeToCartClick(this);"></i>
                            </span>
                        </div>
                    </div>
                </td>
                <td class="col-content col-qty">
                    <input type="number" name="qty" id="qty-1" class="info-qty" value="${item.qty}" min="1" max="${item.stock}" onchange="qtyValueChange(this);">
                    <span class="stock stock-${item.name}">Stock: ${item.stock}</span>
                </td>
                <td class="col-content col-subtotal">
                    <span class="subtotal subtotal-${item.name}">$${subTotal}</span>
                </td>
              </tr>`
  }

  $('#cart-items-container').html(markup); 
  updateTotalPrice();
}

function loadWishlistItemMarkup(items) {

  var markup = '';

  for (let item of items.item) {
    console.log(item);
      markup += `<tr class="wishlist-row">
                  <td class="col-info">
                      <div class="col-content item-card">
                          <img src="${item.img}" alt="sisig">
                          <div>
                              <span class="info-name">${item.name}</span>
                              <span class="info-price">$${item.price}</span>
                              <span class="btn-remove" onclick="removeToWishClick(this);">
                                  <i class="fas fa-trash-alt"></i>
                              </span>
                          </div>
                      </div>
                  </td>
                  <td class="col-addcart">
                      <button onclick="wishlistToCartClick(this);">Add To Cart</button>
                  </td>
                </tr>`;
  }

  $('#wishlist-items-container').html(markup);
}

function loadSearchResults(keyword) {

  $('#search-results').html('');

  var markup = '';

  if (keyword === markup) {
    return;
  }

  //category search
  for (let category of categories) {
    if (category.toUpperCase().includes(keyword.toUpperCase())) {
      markup += `<div class="search-result">Category 
                    <a href="products.php?type=category&key=${category}">${category}</a>
                </div>`;
    }
  }

  //product search
  for (let product of products) {
    if (product.toUpperCase().includes(keyword.toUpperCase())) {
      markup += `<div class="search-result">Product
                  <a href="products.php?type=product&key=${product}">${product}</a>
                </div>`;
    }
  }

  $('#search-results').html(markup);
}

function getParamValue(url, param) {
  var url = new URL(url);

  return url.searchParams.get(param);
}

function updateTotalPrice() {

  var total = 0;

  for (let subtotal of $('.subtotal')) {
    total += parseInt(subtotal.innerHTML.substr(1));
  }

  $('#cart-total').text(`$ ${total}`);
}

//                                LISTENERS

function signInButtonClick() {
  let username = $("#l-un").val();
  let password = $("#l-pw").val();

  if ([username, password].some(val => val === '')) {
    alert("Has empty field");
  } else {
    signIn(username, password);
  }
}

function signUpButtonClick() {
  let username = $("#r-un").val();
  let password = $("#r-pw").val();
  let cPassword = $("#r-cpw").val();
  let fullName = $("#r-fn").val();
  let address = $("#r-ad").val();
  let phoneNum = $("#r-pn").val();

  if ([username, password, cPassword, fullName, address, phoneNum].some(val => val === '')) {
      alert("Has empty field");
  } else if (password != cPassword) {
      alert("Passwords do not match");
  }
}

function logIconMouseEnter() {
  $('#pop-over').css('visibility', 'visible');
}

function logIconMouseLeave() {
  $('#pop-over').css('visibility', 'hidden');
}

function logIconClick() {
  $(".container-login").toggle();
}

function searchIconClick() {
  $('#search-container').toggle();
}

function signInClick() {
  $('#form-signup').css('visibility', 'hidden');
  $('#form-signin').css('visibility', 'visible');
}

function signUpClick() {
  $('#form-signup').css('visibility', 'visible');
  $('#form-signin').css('visibility', 'hidden');
}

function pageLis(element) {
  var page = parseInt(element.innerHTML) - 1;

  loadProducts(searchType, key);
}

function addToCartClick(element) {
  var item = element.parentNode.parentNode;
  var itemName = item.getElementsByClassName('item-name')[0].innerHTML;
  var qty = item.getElementsByClassName('item-qty')[0].value;

  addToCart(itemName, qty);
}

function addToWishClick(element) {

  var itemName = element.parentNode.parentNode
  .getElementsByClassName('item-name')[0].innerHTML;
  
  addToWish(itemName);
}

function logoutClick() {
  signOut();
}

function removeToCartClick(element) {
  var item = element.parentNode.parentNode;
  var itemName = item.getElementsByClassName('info-name')[0].innerHTML;
  var jsonItem = `{"${itemName}" : "0"}`;
  jsonItem = JSON.parse(jsonItem);

  removeToCart(jsonItem);
  //console.log(jsonItem);
}

function removeToWishClick(element) {
  
  var item = element.parentNode.getElementsByClassName('info-name')[0].innerHTML;
  
  removeToWish(item, true);
}

function searchInputValueChange(element) {

  loadSearchResults(element.value);
}

function qtyValueChange(element) {

  var item = element.parentNode.parentNode;

  //create JSON representation
  var itemName = item.getElementsByClassName('info-name')[0].innerHTML;
  var qty = element.value;
  var jsonItem = `{"${itemName}" : "${qty}"}`;
  jsonItem = JSON.parse(jsonItem);

  //update subtotal
  var itemPrice = item.getElementsByClassName('info-price')[0].innerHTML;
  var subTotal = item.getElementsByClassName(`subtotal-${itemName}`)[0];
  subTotal.innerHTML = `$ ${(itemPrice.substr(1) * qty)}`;

  updateTotalPrice();
  
  updateItemQty(jsonItem);
}

function checkoutClick() {
  
  var items = {};

  var cartRows = document.getElementsByClassName('cart-row');

  for (let i  = 1; i < cartRows.length; i++) {
    var name = cartRows[i].getElementsByClassName('info-name')[0].innerHTML;
    var qty = cartRows[i].getElementsByClassName('info-qty')[0].value;

    items[name] = qty;
  }

  purchase(items);
}

function wishlistToCartClick(element) {

  var item = element.parentNode.parentNode;
  var itemName = item.getElementsByClassName('info-name')[0].innerHTML;

  addToCart(itemName, 1, true);
}
