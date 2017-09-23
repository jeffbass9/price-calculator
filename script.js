
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
      var quantity = quantityText.substring(0, quantityText.indexOf('-'));
      var colorPrice;

      if(printColors == 1){
        if(quantity == 12){
          colorPrice = 2.5;
        }
        else if(quantity == 30){
          colorPrice = 1.5;
        }
        else if(quantity == 75){
          colorPrice = 1;
        }
        else if(quantity == 150){
          colorPrice = 0.9;
        }
        else if(quantity == 300){
          colorPrice = 0.85;
        }
      }
      else if(printColors == 2){
        if(quantity == 12){
          colorPrice = 2.75;
        }
        else if(quantity == 30){
          colorPrice = 1.75;
        }
        else if(quantity == 75){
          colorPrice = 1.25;
        }
        else if(quantity == 150){
          colorPrice = 1.15;
        }
        else if(quantity == 300){
          colorPrice = 1.10;
        }
      }
      else if(printColors == 3){
        if(quantity == 12){
          colorPrice = 3;
        }
        else if(quantity == 30){
          colorPrice = 2;
        }
        else if(quantity == 75){
          colorPrice = 1.5;
        }
        else if(quantity == 150){
          colorPrice = 1.4;
        }
        else if(quantity == 300){
          colorPrice = 1.35;
        }
      }
      else if(printColors == 4){
        if(quantity == 12){
          colorPrice = 3.25;
        }
        else if(quantity == 30){
          colorPrice = 2.25;
        }
        else if(quantity == 75){
          colorPrice = 1.75;
        }
        else if(quantity == 150){
          colorPrice = 1.65;
        }
        else if(quantity == 300){
          colorPrice = 1.6;
        }
      }
      else if(printColors == 5){
        if(quantity == 12){
          colorPrice = 3.75;
        }
        else if(quantity == 30){
          colorPrice = 2.75;
        }
        else if(quantity == 75){
          colorPrice = 2.25;
        }
        else if(quantity == 150){
          colorPrice = 1.9;
        }
        else if(quantity == 300){
          colorPrice = 1.85;
        }
      }
      else if(printColors == 6){
        if(quantity == 12){
          colorPrice = 4.25;
        }
        else if(quantity == 30){
          colorPrice = 3.25;
        }
        else if(quantity == 75){
          colorPrice = 2.75;
        }
        else if(quantity == 150){
          colorPrice = 2.15;
        }
        else if(quantity == 300){
          colorPrice = 2.10;
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
    var stickerQuantity = $("#quantity-list").val();
    var stickerPrice = 0;

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

      $("#quantity-list option:nth-of-type(1)").text("50").val(50);
      $("#quantity-list option:nth-of-type(2)").text("100").val(100);
      $("#quantity-list option:nth-of-type(3)").text("200").val(200);
      $("#quantity-list option:nth-of-type(4)").text("300").val(300);
      $("#quantity-list option:nth-of-type(5)").text("500").val(500);
      $("#quantity-list option:nth-of-type(6)").text("1000").val(1000);
      $("#quantity-list option:nth-of-type(7)").text("2000").val(2000);
      $("#quantity-list option:nth-of-type(8)").text("3000").val(3000);
      $("#quantity-list option:nth-of-type(9)").text("5000").val(5000);
      $("#quantity-list option:nth-of-type(10)").remove();
    }

    // Die-cut options
    if(stickerShape == 1){
      returnStickerDefaults();
      // If 2 X 2
      if(stickerSize == 1){
        if(stickerQuantity == 50){
          var stickerPrice = 55;
        }
        else if(stickerQuantity == 100){
          var stickerPrice = 65;
        }
        else if(stickerQuantity == 200){
          var stickerPrice = 85;
        }
        else if(stickerQuantity == 300){
          var stickerPrice = 100;
        }
        else if(stickerQuantity == 500){
          var stickerPrice = 135;
        }
        else if(stickerQuantity == 1000){
          var stickerPrice = 205;
        }
        else if(stickerQuantity == 2000){
          var stickerPrice = 330;
        }
        else if(stickerQuantity == 3000){
          var stickerPrice = 440;
        }
        else if(stickerQuantity == 5000){
          var stickerPrice = 640;
        }
      }
      // If 3 X 3
      else if(stickerSize == 2){
        if(stickerQuantity == 50){
          var stickerPrice = 65;
        }
        else if(stickerQuantity == 100){
          var stickerPrice = 85;
        }
        else if(stickerQuantity == 200){
          var stickerPrice = 120;
        }
        else if(stickerQuantity == 300){
          var stickerPrice = 150;
        }
        else if(stickerQuantity == 500){
          var stickerPrice = 210;
        }
        else if(stickerQuantity == 1000){
          var stickerPrice = 335;
        }
        else if(stickerQuantity == 2000){
          var stickerPrice = 555;
        }
        else if(stickerQuantity == 3000){
          var stickerPrice = 755;
        }
        else if(stickerQuantity == 5000){
          var stickerPrice = 1125;
        }
      }
      // If 4 X 4
      else if(stickerSize == 3){
        if(stickerQuantity == 50){
          var stickerPrice = 80;
        }
        else if(stickerQuantity == 100){
          var stickerPrice = 110;
        }
        else if(stickerQuantity == 200){
          var stickerPrice = 165;
        }
        else if(stickerQuantity == 300){
          var stickerPrice = 210;
        }
        else if(stickerQuantity == 500){
          var stickerPrice = 300;
        }
        else if(stickerQuantity == 1000){
          var stickerPrice = 495;
        }
        else if(stickerQuantity == 2000){
          var stickerPrice = 840;
        }
        else if(stickerQuantity == 3000){
          var stickerPrice = 1155;
        }
        else if(stickerQuantity == 5000){
          var stickerPrice = 1725;
        }
    }
      // If 5 X 5
      else if(stickerSize == 4){
        if(stickerQuantity == 50){
          var stickerPrice = 95;
        }
        else if(stickerQuantity == 100){
          var stickerPrice = 140;
        }
        else if(stickerQuantity == 200){
          var stickerPrice = 215;
        }
        else if(stickerQuantity == 300){
          var stickerPrice = 280;
        }
        else if(stickerQuantity == 500){
          var stickerPrice = 400;
        }
        else if(stickerQuantity == 1000){
          var stickerPrice = 685;
        }
        else if(stickerQuantity == 2000){
          var stickerPrice = 1175;
        }
        else if(stickerQuantity == 3000){
          var stickerPrice = 1615;
        }
        else if(stickerQuantity == 5000){
          var stickerPrice = 2430;
        }
    }
  }
  // end Die Cut options

  // Begin Square options
  else if(stickerShape == 2){
    returnStickerDefaults();
    // If 2 X 2
    if(stickerSize == 1){
      if(stickerQuantity == 50){
        var stickerPrice = 50;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 60;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 80;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 90;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 120;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 180;
      }
      else if(stickerQuantity == 2000){
        var stickerPrice = 280;
      }
      else if(stickerQuantity == 3000){
        var stickerPrice = 370;
      }
      else if(stickerQuantity == 5000){
        var stickerPrice = 530;
      }
    }
    // If 3 X 3
    else if(stickerSize == 2){
      if(stickerQuantity == 50){
        var stickerPrice = 60;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 75;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 100;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 130;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 175;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 275;
      }
      else if(stickerQuantity == 2000){
        var stickerPrice = 450;
      }
      else if(stickerQuantity == 3000){
        var stickerPrice = 605;
      }
      else if(stickerQuantity == 5000){
        var stickerPrice = 890;
      }
    }
    // If 4 X 4
    else if(stickerSize == 3){
      if(stickerQuantity == 50){
        var stickerPrice = 70;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 90;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 135;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 170;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 240;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 390;
      }
      else if(stickerQuantity == 2000){
        var stickerPrice = 655;
      }
      else if(stickerQuantity == 3000){
        var stickerPrice = 895;
      }
      else if(stickerQuantity == 5000){
        var stickerPrice = 1390;
      }
    }
    // If 5 X 5
    else if(stickerSize == 4){
      if(stickerQuantity == 50){
        var stickerPrice = 80;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 115;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 170;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 225;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 320;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 530;
      }
      else if(stickerQuantity == 2000){
        var stickerPrice = 900;
      }
      else if(stickerQuantity == 3000){
        var stickerPrice = 1280;
      }
      else if(stickerQuantity == 5000){
        var stickerPrice = 2090;
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
      if(stickerQuantity == 10){
        var stickerPrice = 25;
      }
      else if(stickerQuantity == 50){
        var stickerPrice = 95;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 135;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 200;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 275;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 395;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 665;
      }
      else if(stickerQuantity == 2000){
        var stickerPrice = 1135;
      }
      else if(stickerQuantity == 3000){
        var stickerPrice = 1590;
      }
      else if(stickerQuantity == 5000){
        var stickerPrice = 2605;
      }
    }
    // If 11.5 X 3
    else if(stickerSize == 2){
      if(stickerQuantity == 10){
        var stickerPrice = 30;
      }
      else if(stickerQuantity == 50){
        var stickerPrice = 100;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 150;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 235;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 315;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 450;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 770;
      }
      else if(stickerQuantity == 2000){
        var stickerPrice = 1325;
      }
      else if(stickerQuantity == 3000){
        var stickerPrice = 1925;
      }
      else if(stickerQuantity == 5000){
        var stickerPrice = 3160;
      }
    }
    // If 15 X 3.75
    else if(stickerSize == 3){
      if(stickerQuantity == 10){
        var stickerPrice = 35;
      }
      else if(stickerQuantity == 50){
        var stickerPrice = 130;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 205;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 330;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 440;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 650;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 1115;
      }
      else if(stickerQuantity == 2000){
        var stickerPrice = 2065;
      }
      else if(stickerQuantity == 3000){
        var stickerPrice = 3065;
      }
      else if(stickerQuantity == 5000){
        var stickerPrice = 5065;
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
      if(stickerQuantity == 10){
        var stickerPrice = 35;
      }
      else if(stickerQuantity == 50){
        var stickerPrice = 100;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 145;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 235;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 335;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 525;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 1000;
      }
    }
    // If 5 X 5
    if(stickerSize == 2){
      if(stickerQuantity == 10){
        var stickerPrice = 45;
      }
      else if(stickerQuantity == 50){
        var stickerPrice = 120;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 190;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 335;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 480;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 770;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 1495;
      }
    }
    // If 6 X 6
    if(stickerSize == 3){
      if(stickerQuantity == 10){
        var stickerPrice = 50;
      }
      else if(stickerQuantity == 50){
        var stickerPrice = 150;
      }
      else if(stickerQuantity == 100){
        var stickerPrice = 250;
      }
      else if(stickerQuantity == 200){
        var stickerPrice = 455;
      }
      else if(stickerQuantity == 300){
        var stickerPrice = 665;
      }
      else if(stickerQuantity == 500){
        var stickerPrice = 1075;
      }
      else if(stickerQuantity == 1000){
        var stickerPrice = 2100;
      }
    }
  }
  //end Decals options

  $("#sticker-price").text(stickerPrice);

};
// end stickerPriceCalculator

$(document).ready(stickerPriceCalculator);

$('.sticker-calculator').change(stickerPriceCalculator);
