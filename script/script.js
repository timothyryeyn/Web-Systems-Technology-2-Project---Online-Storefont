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

          //console.log(data);
          console.log(JSON.parse(data));

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function loadProductsOfCategory() {

  category = 'cat2';

  $.ajax(
        {
          type: 'POST',
          url: LOAD_PRODUCTS_URL,
          data: {
            'category' : category
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

function signIn() {

  username = 'a';
  password = 'a';

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

        },
          error: function() {
          console.log("Request Fail");
          }
      }
    );
}

function signUp() {

  username = 'a';
  password = 'a';
  fullName = 'a';
  address = 'a';
  phoneNum = 'a';

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


$(() => {
  loadConversation();    
});

        //console.log(JSON.stringify(['str1', 'str2', 'str3']));
        //console.log(JSON.parse(data));

        /*
          products = JSON.parse(data)
          products: 
            Array(2)
              0: {name: "NAME", price: "PRICE", qty: "QTY"}
              1: {name: "NAME2", price: "PRICE2", qty: "QTY2"}

          products.product[0]: {name: "NAME", price: "PRICE", qty: "QTY"}
          products.product[0].name: NAME
        */