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

var captchaCode;

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
              sweetAlert('success', 'Added to cart!');
              break;
            case 'invalid-qty':
              sweetAlert('error', 'Product is out stock!');
              break;
            case 'no-user':
              sweetLoginConfirmAlert(() => { logIconClick(); })
              break;
          }

          if (fromWish && data == 'success') {
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
              sweetAlert('success', 'Added to wishlist!');
              break;
            case 'already-wished':
              sweetAlert('info', 'Already added to wishlist!');
              break;
            case 'no-user':
              sweetLoginConfirmAlert(() => { logIconClick(); })
              break;
          }

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

          let parsedData = data.split(':sep:');
          let items = JSON.parse(parsedData[1]);
          let itemCount = parsedData[0];

          loadCartItemsMarkup(items, itemCount);

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

          let parsedData = data.split(':sep:');
          let items = JSON.parse(parsedData[1]);
          let itemCount = parsedData[0];
        
          loadWishlistItemMarkup(items, itemCount);

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
            case 'home':    
              loadHomePageProductsMarkup(result);
              break;
            case 'all':
            case 'category':
              loadAllProducts(result, page);
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

          sweetAlert('success', 'Purchase successful!');
          window.setTimeout(() => { location.reload(); }, 1000);

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

          sweetAlert('success', 'Item removed to cart');
          window.setTimeout(() => { location.reload(); }, 1000);

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
            sweetAlert('success', 'Item removed to wishlist');
          }
          window.setTimeout(() => { location.reload(); }, 1000);

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

          console.log(data);

          if (data == 'success') {
            sweetAlert('success', 'Successfully logged in!');
            window.setTimeout(() => { location.reload(); }, 1000);
          } else {
            sweetAlert('error', 'Incorrect username or password!');
          }

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function signUp(username, password, fullName, address, phoneNum) {

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

          sweetAlert('success', 'Registered succesfully!');
          signInClick();
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

          sweetAlert('success', 'Successfully logged out!');
          window.setTimeout(() => { location.reload(); }, 1000);
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

          },
            error: function() {
            console.log("Request Fail");
            }
        }
      );
}

//                                UTIL FUNCTIONS
function getParamValue(url, param) {
  var url = new URL(url);

  return url.searchParams.get(param);
}

function getKey(jsonObject) {
  return Object.keys(jsonObject)[0];
}

function getValue(jsonObject) {
  return Object.values(jsonObject)[0];
}

function loadAllProducts(products, page) {

  var productArray = products.product;
  var numberOfProducts = Object.keys(productArray).length;

  var markup = '';
  var pageMarkup = '';

  var productsPerPage = 6;

  var numberOfPages = Math.ceil(numberOfProducts / productsPerPage) > 0 ? 
  Math.ceil(numberOfProducts / productsPerPage) : 1;

  var from = page * productsPerPage;

  var to = (page + 1) * productsPerPage > numberOfProducts ? 
  numberOfProducts : (page + 1) * productsPerPage;


  for (let i = from; i < to; i++) {

    let product = productArray[i];
    
    markup += `<div class="card-product">
                    <img src="${product.img}" alt="sisig">
                    <div class="product-info">
                        <span class="product-name">${product.name}</span>
                        <span class="product-price">₱${product.price}</span>
                        <span class="product-stock">Stock: ${product.stock}</span>
                    </div>
                    <div class="cart-adding">
                        <div>
                          <i class="far fa-star" onclick="addToWishClick(this);"></i>
                        </div>
                        <button onclick="addToCartClick(this);">Add To Cart</button>
                    </div>
                </div>`;
  }

  for (let i = 0; i < numberOfPages; i++) {
    pageMarkup += page == i ? `<span class="select-page" id="selected-page" onclick="pageLis(this);">${i+1}</span>` :`<span class="select-page" onclick="pageLis(this);">${i+1}</span>`;
  }

  $('.container-pagination').html(pageMarkup);
    $(".container-products").fadeOut(400, function() {
    $(this).html(markup).fadeIn(400);
  });
}

function loadSearchedProductMarkup(product) {

  markup = `<div class="card-product">
              <img src="${product.img}" alt="sisig">
              <div class="product-info">
                  <span class="product-name">${product.name}</span>
                  <span class="product-price">₱${product.price}</span>
                  <span class="product-stock">Stock: ${product.stock}</span>
              </div>
              <div class="cart-adding">
                  <div>
                    <i class="far fa-star" onclick="addToWishClick(this);"></i>
                  </div>
                  <button onclick="addToCartClick(this);">Add To Cart</button>
              </div>
            </div>`;

  pageMarkup = `<span class="select-page">1</span>`;

  $(".container-products").fadeOut(400, function() {
    $(this).html(markup).fadeIn(400);
  });
  $('.container-pagination').html(pageMarkup);
}

function loadHomePageProductsMarkup(allProducts) {

  var productsPerCatContainer = 4;

  var markup = '';
  
  for(let category of allProducts.category) {

    markup += `<div class="container-category">
                <div>
                  <span class="category-name">${category['@attributes'].name}</span>
                </div>
                <div>
                  <a class="btn-seeall" href="products.php?type=category&key=${category['@attributes'].name}">See All<i class="fas fa-chevron-right"></i></a>
                </div>
            </div>
            <div class="container-products">`;

    for (let i = 0; i < productsPerCatContainer; i++) {
      
      let product = category.product[i];

      if (product) {
        markup += `<div class="card-product">
                    <img src="${product.img}" alt="sisig">
                    <div class="product-info">
                        <span class="product-name">${product.name}</span>
                        <span class="product-price">₱${product.price}</span>
                        <span class="product-stock">Stock: ${product.stock}</span>
                    </div>
                    <div class="cart-adding">
                        <div>
                          <i class="far fa-star" onclick="addToWishClick(this);"></i>
                        </div>
                        <button onclick="addToCartClick(this);">Add To Cart</button>
                    </div>
                </div>`;
      }
    }

    markup += '</div>';
  }

  $('.section-catproducts').html(markup);
}

function loadCartItemsMarkup(items, count) {

  var markup = '';

  if (count == 0) {

    $('.container-total, .container-checkout').remove();

  } else if (count == 1) {

    let item = items.item;
    let subTotal = item.price * item.qty;

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
  } else {
   
    for (let item of items.item) {
    let subTotal = item.price * item.qty;
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
  }

  $('#cart-items-container').html(markup); 
  updateTotalPrice();
}

function loadWishlistItemMarkup(items, count) {

  var markup = '';

  if (count == 0) {

  } else if (count == 1) {

    let item = items.item;

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
  } else {
    for (let item of items.item) {

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
  }

  $('#wishlist-items-container').html(markup);
}

function loadSearchResults(keyword) {



  var markup = '';

  if (keyword === markup) {
    return;
  }

  //category search
  for (let category of categories) {
    if (category.toUpperCase().includes(keyword.toUpperCase())) {
      markup += `<div class="search-result">
                    <a href="products.php?type=category&key=${category}">
                      <span>
                        Category '${category}'
                      </span>
                    </a>
                </div>`;
    }
  }

  //product search
  for (let product of products) {
    if (product.toUpperCase().includes(keyword.toUpperCase())) {
      markup += `<div class="search-result">
                    <a href="products.php?type=product&key=${product}">
                      <span>
                        ${product}
                      </span>
                    </a>
                </div>`;
    }
  }

  $('#search-results').html(markup);
}

function updateTotalPrice() {

  var total = 0;

  for (let subtotal of $('.subtotal')) {
    total += parseInt(subtotal.innerHTML.substr(1));
  }

  $('#cart-total').text(`$ ${total}`);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length).replaceAll('%20', ' ').replaceAll('%2C', ',');
    }
    return "";
}

function loadCaptcha() {
  var a = Math.ceil(Math.random() * 9)+ '';
  var b = Math.ceil(Math.random() * 9)+ '';
  var c = Math.ceil(Math.random() * 9)+ '';
  var d = Math.ceil(Math.random() * 9)+ '';
  var e = Math.ceil(Math.random() * 9)+ '';
  var code = a + b + c + d + e;
  captchaCode = code;
  console.log(typeof captchaCode);
  $('#CaptchaDiv').text(code);
}

//                                LISTENERS
function addToCartClick(element) {
  var item = element.parentNode.parentNode;
  var itemName = item.getElementsByClassName('product-name')[0].innerHTML;

  addToCart(itemName, 1);
}

function addToWishClick(element) {

  var itemName = element.parentNode.parentNode.parentNode
  .getElementsByClassName('product-name')[0].innerHTML;
  
  addToWish(itemName);
}

function checkoutClick() {
  
  var items = {};

  var cartRows = document.getElementsByClassName('cart-row');

  for (let i  = 1; i < cartRows.length; i++) {
    var name = cartRows[i].getElementsByClassName('info-name')[0].innerHTML;
    var qty = cartRows[i].getElementsByClassName('info-qty')[0].value;

    items[name] = qty;
  }

  let fullname = getCookie('fullname');
  let address = getCookie('address');
  let phone = getCookie('phone');
  let totalAmount = $('#cart-total').text();

  sweetCheckoutConfirmAlert(fullname, address, phone, totalAmount, () => { purchase(items); });
}

function logoutClick() {
  sweetConfirmAlertDanger('Do you want to sign out?', signOut);
}

function logIconClick() {
  $('body').css('overflow', 'hidden');
  $(".container-sign").fadeIn();
  $('#overlay').show();
}

function logIconMouseEnter() {
  $('#pop-over').css('visibility', 'visible');
}

function logIconMouseLeave() {
  $('#pop-over').css('visibility', 'hidden');
}

function pageLis(element) {
  var page = parseInt(element.innerHTML) - 1;

  loadProducts(searchType, key, page);
}

function removeToCartClick(element) {
  var item = element.parentNode.parentNode;
  var itemName = item.getElementsByClassName('info-name')[0].innerHTML;
  var jsonItem = `{"${itemName}" : "0"}`;
  jsonItem = JSON.parse(jsonItem);

  sweetConfirmAlertDanger('Remove the item to cart?', () => { removeToCart(jsonItem); });
}

function removeToWishClick(element) {
  
  var item = element.parentNode.getElementsByClassName('info-name')[0].innerHTML;
  
  sweetConfirmAlertDanger('Remove the item to wishlist?', () => { removeToWish(item, true); });
}

function signInButtonClick() {
  let username = $("#l-un").val();
  let password = $("#l-pw").val();

  if ([username, password].some(val => val === '')) {
    sweetAlert('error', 'Please enter username and password!'); 
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
  let captcha = $('#CaptchaInput').val();

  if ([username, password, cPassword, fullName, address, phoneNum].some(val => val === '')) {
    sweetAlert('error', 'Please fill all the fields!'); 
  } else if (captcha == '') {
    sweetAlert('error', 'Please fill the captcha form!'); 
  } else if (captchaCode != captcha) {
    sweetAlert('error', 'Please match the captcha code!'); 
  } else if (password != cPassword) {
    sweetAlert('error', 'Passwords do not match!'); 
  } else {
    signUp(username, password, fullName, address, phoneNum);
  }
}

function searchIconClick() {
  $('#search-container').toggle();
  document.getElementById('search-input').focus();
}

function signInClick() {
 
  var signUpForm = `<div id="container-close"><i class="fas fa-times" id="close" onclick="signCloseClick();"></i></div>
                    <h1>Sign In</h1>
                    <div class="container-fields-signin">
                      <input type="text" name="l-un" id="l-un" placeholder="Username" required>
                      <input type=""password" name="l-pw" id="l-pw" placeholder="Password" required>
                    </div>
                    <button id="btn-signin" onclick="signInButtonClick();">Sign In</button>
                    <div class="container-sign-link">
                      <span>No Account Yet?</span>
                      <span id="link-signup" onclick="signUpClick();">Sign Up</span>
                    </div>
                  </div>`

  $(".container-sign").fadeOut(400, function() {
    $(this).html(signUpForm).fadeIn(400);
  });
}

function signUpClick() {

  var usernamePattern = {"^[a-z\\d\\.]{5,}$" : "Must only contain alphanumeric characters and atleast 5 characters length"};
  var passwordPattern = {"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$" : "Must contain uppercase, lowercase and a number"};
  var fullnamePattern = {".{2,50}" : "Must only be 2-50 characters length"};
  var addressPattern = fullnamePattern;
  var phonePattern = {"^(09|\\+639)\\d{9}$" : "Must start with +639/09 and must be in valid length (14/11 digits)"};

 var signInForm = `<div id="container-close"><i class="fas fa-times" id="close" onclick="signCloseClick();"></i></div>
                  <h1>Sign Up</h1>
                  <div class="container-fields-signup">
                    <input type="text" name="r-un" id="r-un" placeholder="Username" pattern="${getKey(usernamePattern)}" onblur="validateField(this);" title="${getValue(usernamePattern)}">
                    <input type="password" name="r-pw" id="r-pw" placeholder="Password" pattern="${getKey(passwordPattern)}" onblur="validateField(this);" title="${getValue(passwordPattern)}">
                    <input type="password" name="r-cpw" id="r-cpw" placeholder="Confirm Password" pattern="${getKey(passwordPattern)}" onblur="validateField(this);" title="${getValue(passwordPattern)}">
                    <input type="text" name="r-fn" id="r-fn" placeholder="Full Name" pattern="${getKey(fullnamePattern)}" onblur="validateField(this);" title="${getValue(fullnamePattern)}">
                    <input type="text" name="r-ad" id="r-ad" placeholder="Address" pattern="${getKey(addressPattern)}" onblur="validateField(this);" title="${getValue(addressPattern)}">
                    <input type="text" name="r-pn" id="r-pn" placeholder="Phone Number" pattern="${getKey(phonePattern)}" onblur="validateField(this);" title="${getValue(phonePattern)}">
                    <br>
                  <div class="capbox">
                    <div id="CaptchaDiv"></div>
                      <div class="capbox-inner">
                        Type the number:<br>
                        <input type="hidden" id="txtCaptcha">
                        <input type="text" name="CaptchaInput" id="CaptchaInput" size="15"><br>
                      </div>
                    </div>
                  </div>
                  <button id="btn-signup" onclick="signUpButtonClick();">Sign Up</button>
                  <div class="container-sign-link">
                    <span>Has account already?</span>
                    <span id="link-signin" onclick="signInClick();">Sign In</span>
                  </div>`;

  $(".container-sign").fadeOut(400, function() {
    $(this).html(signInForm).fadeIn(400);
  });
  setTimeout(loadCaptcha, 500);
}

function searchInputValueChange(element) {

  $('#search-results').html('');

  let input = element.value;

  if (input.length > 1) {
    loadSearchResults(input);
  }
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

function validateField(element) {
  
  if (typeof element.reportValidity === 'function') {
    element.reportValidity();
  }
}

function wishlistToCartClick(element) {

  var item = element.parentNode.parentNode;
  var itemName = item.getElementsByClassName('info-name')[0].innerHTML;

  addToCart(itemName, 1, true);
}

function signCloseClick() {
  $('body').css('overflow', 'scroll');
  $(".container-sign").fadeOut();
  $('#overlay').hide();  
}

//                                        SWEET ALERTS
function sweetAlert(iconType, message) {
  swal({
    text: message,
    icon: iconType,
    button: false,
    timer: 1500
  });
}

function sweetConfirmAlertDanger(prompt, successFunction) {
  swal({
    text: prompt,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
        successFunction();
    }
  });
}

function sweetLoginConfirmAlert(successFunction) {
  swal({
        title: 'Please sign in to continue',
        icon: "error",
        buttons: {
            cancel: true,
            signin: {
                text: 'Sign In'
            }
        }
    })
    .then((willLog) => {
        if (willLog) {
            successFunction();
        }
    });
}

function sweetCheckoutConfirmAlert(fullname, address, phone, totalAmount, successFunction) {
  
  swal({
        title: 'Confirm Purchase',
        icon: "info",
        text: `Total Amount: ${totalAmount}\n\nSent to: ${address}\n\nName: ${fullname}\n\nPhone Number: ${phone}`,
        buttons: {
            cancel: true,
            confirm: true
        }
    })
    .then((willLog) => {
        if (willLog) {
            successFunction();
        }
    });
}
