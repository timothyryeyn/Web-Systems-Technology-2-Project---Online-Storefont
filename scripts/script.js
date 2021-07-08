//SIGN
const SIGN_IN_URL = 'process/sign_in.php';
const SIGN_UP_URL = 'process/sign_up.php';
//ADD
const ADD_TO_CART_URL = 'process/add_to_cart.php';
const ADD_TO_WISH_URL = 'process/add_to_wish.php';
//REMOVE
const REMOVE_TO_CART_URL = 'process/remove_to_cart.php';
const REMOVE_TO_WISH_URL = 'process/remove_to_wish.php';
//PURCHASE
const PURCHASE_URL = 'process/purchase.php';
//LOAD
const LOAD_CART_URL = 'process/load_cart.php';
const LOAD_WISHLIST_URL = 'process/load_wishlist.php';
const LOAD_PRODUCTS_URL = 'process/load_products.php';
const LOAD_MESSAGES_URL = 'process/load_messages.php';
//SEND MESSAGE
const SEND_MESSAGE_URL = 'process/send_message.php';

var category = getParamValue(window.location.href, 'search');


function addToCart() {
  username = 'a';
  itemName = 'Milo';
  qty = 5;

  $.ajax(
        {
          type: 'POST',
          url: ADD_TO_CART_URL,
          data: {
            'username' : username,
            'item_name' : itemName,
            'qty' : qty
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

function addToWish() {
  username = 'a';
  itemName = 'Del Monte';

  $.ajax(
        {
          type: 'POST',
          url: ADD_TO_WISH_URL,
          data: {
            'username' : username,
            'item_name' : itemName,
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

  username = 's';

  $.ajax(
        {
          type: 'POST',
          url: LOAD_CART_URL,
          data: {
            'username' : username
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

function loadWishlist() {

  username = 'a';

  $.ajax(
        {
          type: 'POST',
          url: LOAD_WISHLIST_URL,
          data: {
            'username' : username
          },
          success: function(data) {

          //console.log(data);
          console.log(JSON.parse(data));

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

function loadProducts(category = 'all', page = 0) {

  $.ajax(
        {
          type: 'POST',
          url: LOAD_PRODUCTS_URL,
          data: {
            'category' : category
          },
          success: function(data) {

          var result = JSON.parse(data);

          if (category == 'all') {
            loadHomePageProducts(result);
          } else {
            loadProductsOfCategory(result, page);
          }
        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function purchase() {

  username = 'a';
  items = {'Milo':5,'Energen':2};

  $.ajax(
        {
          type: 'POST',
          url: PURCHASE_URL,
          data: {
            'username' : username,
            'items' : JSON.stringify(items)
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

function removeToCart() {
  username = 'a';
  items = {'Milo' : 5, "Del Monte" : 200};

  $.ajax(
        {
          type: 'POST',
          url: REMOVE_TO_CART_URL,
          data: {
            'username' : username,
            'items' : JSON.stringify(items)
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

function removeToWish() {
  username = 'aa';
  items = ['Milo','Del Monte'];

  $.ajax(
        {
          type: 'POST',
          url: REMOVE_TO_WISH_URL,
          data: {
            'username' : username,
            'items' : items.toString()
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

          if (data === 'yes') {
            return true;
          } else {
            return false;
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

//UTILS
function loadProductsOfCategory(products, page) {

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
                  <span>${product.name}</span>
                  <span>${product.price}</span>
              </div>
              <div class="cart-adding">
                  <input type="number" name="quantity" id="product-qty" value="${product.stock}">
                  <button>Add To Cart</button>
              </div>
          </div>`;
  }

  for (let i = 0; i < numberOfPages; i++) {
    pageMarkup += `<span class="select-page" onclick="pageLis(this);">${i+1}</span>`;
  }

  $('.container-pagination').html(pageMarkup);
  $('.container-products').html(markup);
}

function loadHomePageProducts(allProducts) {

  var productsPerCatContainer = 4;

  var markup = '';
  
  for(let category of allProducts.category) {

    markup += `<div class="container-category">
                <span class="category-name">${category['@attributes'].name}</span>
                <a class="btn-seeall" href="products.php?search=${category['@attributes'].name}">See All</a>
            </div>
            <div class="container-products">`;

    for (let i = 0; i < productsPerCatContainer; i++) {
      
      let product = category.product[i];

      if (product) {
        markup += `<div class="card-product">
                    <img src="${product.img}" alt="sisig">
                    <div class="product-info">
                        <span>${product.name}</span>
                        <span>${product.price}</span>
                    </div>
                    <div class="cart-adding">
                        <input type="number" name="quantity" id="product-qty" value="${product.stock}">
                        <button>Add To Cart</button>
                    </div>
                </div>`;
      }
    }

    $('.section-catproducts').html(markup += '</div>');
  }

  return markup;
}

function test(element) {
  console.log(element.parentNode.childNodes[1].innerHTML);
}

function getParamValue(url, param) {
  var url = new URL(url);

  return url.searchParams.get(param);
}

//LISTENER

function loginLis() {
  $(".container-login").toggle();

  $("#user").click(() => {
      $(".container-login").toggle();
      console.log("aaa")
  });
  $("#link-signup").click(() => {
      $("#form-signin").css("visibility", "hidden");
      $("#form-signup").css("visibility", "visible");
  });
  $("#link-signin").click(() => {
      $("#form-signin").css("visibility", "visible");
      $("#form-signup").css("visibility", "hidden");
  });

  $("#btn-signup").click(() => {
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
  });

  $("#btn-signin").click(() => {
      let username = $("#l-un").val();
      let password = $("#l-pw").val();

      if ([username, password].some(val => val === '')) {
          alert("Has empty field");
      } else {
          signIn(username, password);
      }

  });
}

function pageLis(element) {
  var page = parseInt(element.innerHTML) - 1;

  loadProducts(category, page);
}

function addToCartLis() {

}
