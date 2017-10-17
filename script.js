//Add and remove highlight effect on printing color/quantity table
$(".printing").find("tr:nth-of-type(2) td:nth-of-type(1)").addClass("selected");

$(".printing").find("td").click(function(){
  $("td.selected").removeClass("selected");
  $(this).addClass("selected");
});

// Calculating screen printing costs:

  var total = 0;
  var garmentCost = 5;
  var setupTotal = 0;
  var printingTotal = 0;

  //Calculate the total cost and print it
  function printingPrice(){
    total =  setupTotal + printingTotal;
    $("#price").text(total.toFixed(2));
  }
  //Extract values from the printing quantity/color table
  function printingTablePrice(){
    $(".selected").each(function(){
      var tdPrice = $(this).html();
      var colorPrice = Number(tdPrice.replace(/[^0-9\.]+/g,""));
      var tablehead = $(this).closest("tr").find(".quantity").text();
      var quantity = tablehead.substring(0, tablehead.indexOf('-'));

      printingTotal = ((colorPrice + garmentCost) * quantity);
      printingPrice();
    });
  }

  //Extracting the values from the setup costs checkbox list:
  $(".setup-costs").click(function(){
    if($(this).is(".setup-costs:checked")){
      setupTotal += parseInt($(this).val(), 10);
    }
    else{
      setupTotal -= parseInt($(this).val(), 10);
    }
    printingPrice();
  });

  //Applying the 25% rush-order charge, if selected:
  $(".rush-order").click(function(){
    if($(this).is(".rush-order:checked")){
      printingTotal = printingTotal * 1.25;
    }
    else{
      printingTotal = printingTotal * 0.8;
    }
    printingPrice();
  });

  var windowSize = window.matchMedia("(min-width: 789px)");
  if (windowSize.matches) {
    //Extracting the default values from the printing colors and quantity table:
    printingTablePrice();
    //Change values based on user interaction:
    $(".printing td").click(function(){
      printingTablePrice();
    });
  }
  else{
    function printingCalculator(){
      var printColors = $("#color-list").val();
      var quantityText = $("#printing-quantity-list option:selected").text();
      var quantityNumber = quantityText.substring(0, quantityText.indexOf('-'));
      var quantity = parseInt(quantityNumber);
      var colorPrice;

      if(printColors == 1){
        switch(quantity){
          case 12:
            colorPrice = 2.5;
            break;
          case 30:
            colorPrice = 1.5;
            break;
          case 75:
            colorPrice = 1;
            break;
          case 150:
            colorPrice = 0.9;
            break;
          case 300:
            colorPrice = 0.85;
            break;
        }
      }
      else if(printColors == 2){
        switch(quantity){
          case 12:
            colorPrice = 2.75;
            break;
          case 30:
            colorPrice = 1.75;
            break;
          case 75:
            colorPrice = 1.25;
            break;
          case 150:
            colorPrice = 1.15;
            break;
          case 300:
            colorPrice = 1.10;
            break;
        }
      }
      else if(printColors == 3){
        switch(quantity){
          case 12:
            colorPrice = 3;
            break;
          case 30:
            colorPrice = 2;
            break;
          case 75:
            colorPrice = 1.5;
            break;
          case 150:
            colorPrice = 1.4;
            break;
          case 300:
            colorPrice = 1.35;
            break;
        }
      }
      else if(printColors == 4){
        switch(quantity){
          case 12:
            colorPrice = 3.25;
            break;
          case 30:
            colorPrice = 2.25;
            break;
          case 75:
            colorPrice = 1.75;
            break;
          case 150:
            colorPrice = 1.65;
            break;
          case 300:
            colorPrice = 1.6;
            break;
        }
      }
      else if(printColors == 5){
        switch(quantity){
          case 12:
            colorPrice = 3.75;
            break;
          case 30:
            colorPrice = 2.75;
            break;
          case 75:
            colorPrice = 2.25;
            break;
          case 150:
            colorPrice = 1.9;
            break;
          case 300:
            colorPrice = 1.85;
            break;
        }
      }
      else if(printColors == 6){
        switch(quantity){
          case 12:
            colorPrice = 4.25;
            break;
          case 30:
            colorPrice = 3.25;
            break;
          case 75:
            colorPrice = 2.75;
            break;
          case 150:
            colorPrice = 2.15;
            break;
          case 300:
            colorPrice = 2.10;
            break;
        }
      }
      printingTotal = ((colorPrice + garmentCost) * quantity);
      printingPrice();
    };

    //Run the Printing Calculator when the page loads
    printingCalculator();
    //Run the Printing Calculator every time a quantity value is changed
      $(".mobile-print-calculator").change(function(){
        printingCalculator();
      });

  }
//end screen printing price calculations

//Sticker Price Calculator
function stickerPriceCalculator(){

    var stickerShape = $("#sticker-shape-list").val();
    var stickerSize = $("#size-list").val();
    var stickerMaterial = $("#material-list").val();
    var stickerQuantityVal = $("#quantity-list").val();
    var stickerQuantity = parseInt(stickerQuantityVal);
    var stickerPrice;


    function returnStickerDefaults(){
      $("#size-list option:nth-of-type(1)").text('2" X 2"');
      $("#size-list option:nth-of-type(2)").text('3" X 3"');
      $("#size-list option:nth-of-type(3)").text('4" X 4"');

      if($("#size-list option:nth-of-type(4)").length){
        $("#size-list option:nth-of-type(4)").text('5" X 5"');
      }
      else{
        $("#size-list").append('<option value=4>5" X 5"</option">')
      }

      //Set quantity list values 1-9
      $("#quantity-list option:nth-of-type(1)").text("50").val(50);
      $("#quantity-list option:nth-of-type(2)").text("100").val(100);
      $("#quantity-list option:nth-of-type(3)").text("200").val(200);
      $("#quantity-list option:nth-of-type(4)").text("300").val(300);
      $("#quantity-list option:nth-of-type(5)").text("500").val(500);
      $("#quantity-list option:nth-of-type(6)").text("1000").val(1000);
      $("#quantity-list option:nth-of-type(7)").text("2000").val(2000);
      $("#quantity-list option:nth-of-type(8)").text("3000").val(3000);
      $("#quantity-list option:nth-of-type(9)").text("5000").val(5000);
      //Remove quantity list value 10
      $("#quantity-list option:nth-of-type(10)").remove();
    }

    // Die-cut options
    if(stickerShape == 1){
      returnStickerDefaults();
      // If 2 X 2
      if(stickerSize == 1){
        switch(stickerQuantity){
          case 50:
            stickerPrice = 55;
            break;
          case 100:
            stickerPrice = 65;
            break;
          case 200:
            stickerPrice = 85;
            break;
          case 300:
            stickerPrice = 100;
            break;
          case 500:
            stickerPrice = 135;
            break;
          case 1000:
            stickerPrice = 205;
            break;
          case 2000:
            stickerPrice = 330;
            break;
          case 3000:
            stickerPrice = 440;
            break;
          case 5000:
            stickerPrice = 640;
            break;
        }
      }
      // If 3 X 3
      else if(stickerSize == 2){
        switch(stickerQuantity){
          case 50:
            stickerPrice = 65;
            break;
          case 100:
            stickerPrice = 85;
            break;
          case 200:
            stickerPrice = 120;
            break;
          case 300:
            stickerPrice = 150;
            break;
          case 500:
            stickerPrice = 210;
            break;
          case 1000:
            stickerPrice = 335;
            break;
          case 2000:
            stickerPrice = 555;
            break;
          case 3000:
            stickerPrice = 755;
            break;
          case 5000:
            stickerPrice = 1125;
            break;
        }
      }
      // If 4 X 4
      else if(stickerSize == 3){
        switch(stickerQuantity){
          case 50:
            stickerPrice = 80;
            break;
          case 100:
            stickerPrice = 110;
            break;
          case 200:
            stickerPrice = 165;
            break;
          case 300:
            stickerPrice = 210;
            break;
          case 500:
            stickerPrice = 300;
            break;
          case 1000:
            stickerPrice = 495;
            break;
          case 2000:
            stickerPrice = 840;
            break;
          case 3000:
            stickerPrice = 1155;
            break;
          case 5000:
            stickerPrice = 1725;
            break;
        }
      }
      // If 5 X 5
      else if(stickerSize == 4){
        switch(stickerQuantity){
          case 50:
            stickerPrice = 95;
            break;
          case 100:
            stickerPrice = 140;
            break;
          case 200:
            stickerPrice = 215;
            break;
          case 300:
            stickerPrice = 280;
            break;
          case 500:
            stickerPrice = 400;
            break;
          case 1000:
            stickerPrice = 685;
            break;
          case 2000:
            stickerPrice = 1175;
            break;
          case 3000:
            stickerPrice = 1615;
            break;
          case 5000:
            stickerPrice = 2430;
            break;
        }
      }
  }
  // end Die Cut options

  // Begin Square options
  else if(stickerShape == 2){
    returnStickerDefaults();
    // If 2 X 2
    if(stickerSize == 1){
      switch(stickerQuantity){
        case 50:
          stickerPrice = 50;
          break;
        case 100:
          stickerPrice = 60;
          break;
        case 200:
          stickerPrice = 80;
          break;
        case 300:
          stickerPrice = 90;
          break;
        case 500:
          stickerPrice = 120;
          break;
        case 1000:
          stickerPrice = 180;
          break;
        case 2000:
          stickerPrice = 280;
          break;
        case 3000:
          stickerPrice = 370;
          break;
        case 5000:
          stickerPrice = 530;
          break;
      }
    }
    // If 3 X 3
    else if(stickerSize == 2){
      switch(stickerQuantity){
        case 50:
          stickerPrice = 60;
          break;
        case 100:
          stickerPrice = 75;
          break;
        case 200:
          stickerPrice = 100;
          break;
        case 300:
          stickerPrice = 130;
          break;
        case 500:
          stickerPrice = 175;
          break;
        case 1000:
          stickerPrice = 275;
          break;
        case 2000:
          stickerPrice = 450;
          break;
        case 3000:
          stickerPrice = 605;
          break;
        case 5000:
          stickerPrice = 890;
          break;
      }
    }
    // If 4 X 4
    else if(stickerSize == 3){
      switch(stickerQuantity){
        case 50:
          stickerPrice = 70;
          break;
        case 100:
          stickerPrice = 90;
          break;
        case 200:
          stickerPrice = 135;
          break;
        case 300:
          stickerPrice = 170;
          break;
        case 500:
          stickerPrice = 240;
          break;
        case 1000:
          stickerPrice = 390;
          break;
        case 2000:
          stickerPrice = 655;
          break;
        case 3000:
          stickerPrice = 895;
          break;
        case 5000:
          stickerPrice = 1390;
          break;
      }
    }
    // If 5 X 5
    else if(stickerSize == 4){
      switch(stickerQuantity){
        case 50:
          stickerPrice = 80;
          break;
        case 100:
          stickerPrice = 115;
          break;
        case 200:
          stickerPrice = 170;
          break;
        case 300:
          stickerPrice = 225;
          break;
        case 500:
          stickerPrice = 320;
          break;
        case 1000:
          stickerPrice = 530;
          break;
        case 2000:
          stickerPrice = 900;
          break;
        case 3000:
          stickerPrice = 1280;
          break;
        case 5000:
          stickerPrice = 2090;
          break;
      }
    }
  }
  //end Square options

  //Begin Bumper options
  else if(stickerShape == 3){
    // Change size dropdown text
    function bumperSizes (){
      $("#size-list option[value=1]").text('7.5" X 3.75"');
      $("#size-list option[value=2]").text('11.5" X 3"');
      $("#size-list option[value=3]").text('15" X 3.75"');
      $("#size-list option[value=4]").remove();
    };
    bumperSizes();

    //Change quantity dropdown text
    function bumperQuantities (){
      $("#quantity-list option:nth-of-type(1)").text("10").val(10);
      $("#quantity-list option:nth-of-type(2)").text("50").val(50);
      $("#quantity-list option:nth-of-type(3)").text("100").val(100);
      $("#quantity-list option:nth-of-type(4)").text("200").val(200);
      $("#quantity-list option:nth-of-type(5)").text("300").val(300);
      $("#quantity-list option:nth-of-type(6)").text("500").val(500);
      $("#quantity-list option:nth-of-type(7)").text("1000").val(1000);
      $("#quantity-list option:nth-of-type(8)").text("2000").val(2000);
      $("#quantity-list option:nth-of-type(9)").text("3000").val(3000);
      $("#quantity-list").append("<option value=5000>5,000</option>");
    }

    bumperQuantities();

      // If 7.5 X 3.75
      if(stickerSize == 1){
        switch(stickerQuantity){
          case 10:
            stickerPrice = 25;
            break;
          case 50:
            stickerPrice = 95;
            break;
          case 100:
            stickerPrice = 135;
            break;
          case 200:
            stickerPrice = 200;
            break;
          case 300:
            stickerPrice = 275;
            break;
          case 500:
            stickerPrice = 395;
            break;
          case 1000:
            stickerPrice = 665;
            break;
          case 2000:
            stickerPrice = 1135;
            break;
          case 3000:
            stickerPrice = 1590;
            break;
          case 5000:
            stickerPrice = 2605;
            break;
        }
      }
      // If 11.5 X 3
      else if(stickerSize == 2){
        switch(stickerQuantity){
          case 10:
            stickerPrice = 30;
            break;
          case 50:
            stickerPrice = 100;
            break;
          case 100:
            stickerPrice = 150;
            break;
          case 200:
            stickerPrice = 235;
            break;
          case 300:
            stickerPrice = 315;
            break;
          case 500:
            stickerPrice = 450;
            break;
          case 1000:
            stickerPrice = 770;
            break;
          case 2000:
            stickerPrice = 1325;
            break;
          case 3000:
            stickerPrice = 1925;
            break;
          case 5000:
            stickerPrice = 3160;
            break;
        }
      }
      // If 15 X 3.75
      else if(stickerSize == 3){
        switch(stickerQuantity){
          case 10:
            stickerPrice = 35;
            break;
          case 50:
            stickerPrice = 130;
            break;
          case 100:
            stickerPrice = 205;
            break;
          case 200:
            stickerPrice = 330;
            break;
          case 300:
            stickerPrice = 440;
            break;
          case 500:
            stickerPrice = 650;
            break;
          case 1000:
            stickerPrice = 1115;
            break;
          case 2000:
            stickerPrice = 2065;
            break;
          case 3000:
            stickerPrice = 3065;
            break;
          case 5000:
            stickerPrice = 5065;
            break;
        }
      }
  }
  //end Bumper options

  //begin Decals options
  else if(stickerShape == 4){
    // Change size dropdown text
    function decalSizes (){
      $("#size-list option[value=1]").text('4" X 4"');
      $("#size-list option[value=2]").text('5" X 5"');
      $("#size-list option[value=3]").text('6" X 6"');
      $("#size-list option[value=4]").remove();
    };
    decalSizes();
    //Change quantity dropdown text
    function decalQuantities (){
      $("#quantity-list option:nth-of-type(1)").text("10").val(10);
      $("#quantity-list option:nth-of-type(2)").text("50").val(50);
      $("#quantity-list option:nth-of-type(3)").text("100").val(100);
      $("#quantity-list option:nth-of-type(4)").text("200").val(200);
      $("#quantity-list option:nth-of-type(5)").text("300").val(300);
      $("#quantity-list option:nth-of-type(6)").text("500").val(500);
      $("#quantity-list option:nth-of-type(7)").text("1000").val(1000);
      $("#quantity-list option:nth-of-type(8)").remove();
      $("#quantity-list option:nth-of-type(9)").remove();
      $("#quantity-list option:nth-of-type(10)").remove();
    }
    if(($("quantity-list option:nth-of-type(1)").val() == 50) || ($("#quantity-list option:nth-of-type(8)").val() == 3000)){
      decalQuantities();
    }
    // If 4 X 4
    if(stickerSize == 1){
      switch(stickerQuantity){
        case 10:
          stickerPrice = 35;
          break;
        case 50:
          stickerPrice = 100;
          break;
        case 100:
          stickerPrice = 145;
          break;
        case 200:
          stickerPrice = 235;
          break;
        case 300:
          stickerPrice = 335;
          break;
        case 500:
          stickerPrice = 525;
          break;
        case 1000:
          stickerPrice = 1000;
          break;
      }
    }
    // If 5 X 5
    if(stickerSize == 2){
      switch(stickerQuantity){
        case 10:
          stickerPrice = 45;
          break;
        case 50:
          stickerPrice = 120;
          break;
        case 100:
          stickerPrice = 190;
          break;
        case 200:
          stickerPrice = 335;
          break;
        case 300:
          stickerPrice = 480;
          break;
        case 500:
          stickerPrice = 770;
          break;
        case 1000:
          stickerPrice = 1495;
          break;
      }
    }
    // If 6 X 6
    if(stickerSize == 3){
      switch(stickerQuantity){
        case 10:
          stickerPrice = 50;
          break;
        case 50:
          stickerPrice = 150;
          break;
        case 100:
          stickerPrice = 250;
          break;
        case 200:
          stickerPrice = 455;
          break;
        case 300:
          stickerPrice = 665;
          break;
        case 500:
          stickerPrice = 1075;
          break;
        case 1000:
          stickerPrice = 2100;
          break;
      }
    }
  }
  //end Decals options

  $("#sticker-price").text(stickerPrice);

};
// end stickerPriceCalculator

$(document).ready(stickerPriceCalculator);

$('.sticker-calculator').change(stickerPriceCalculator);
