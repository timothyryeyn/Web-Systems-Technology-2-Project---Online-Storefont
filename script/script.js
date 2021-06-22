
const pathURL = 'process/';

$(function() {
    $.ajax(
      `${pathURL}send_message.php`,
      {
        success: function(data) {

        //console.log(JSON.stringify(['str1', 'str2', 'str3']));
        console.log(data);
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
      },
        error: function() {
        console.log("Request Fail");
        }
     }
  ); 
});