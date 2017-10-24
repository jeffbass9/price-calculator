Price Calculator
=============================

## Synopsis

Javascript code enabling the user to receive a price quote after selecting a
number of options.

## Code Example

Combining checkbox values with a table of selectable quantity values, the
calculator for screen-printing projects returns a price quote based on the
options clicked by the user.

```javascript
var windowSize = window.matchMedia("(min-width: 789px)");
if (windowSize.matches) {
  //Extracting the default values from the printing colors and quantity table:
  printingTablePrice();
  //Change values based on user interaction:
  $(".printing td").click(function(){
    printingTablePrice();
  });
}
```

I wanted an option that was easier to navigate on a small screen, so if the
viewport width is narrower than 789px, the table is replaced with dropdown
options. Unfortunately, since the price values for each quantity/color
option don't follow an exact formula, this takes a lot of switch statements.
If you use this general functionality on a project, I would recommend generating
the price values dynamically.

```javascript
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
      //And so on...
    }
  }
}
```

The sticker calculator changes the displayed size and quantity values based on
the selected shape option.

```javascript
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
        //And so on...
      }
    }
  }
```
## Motivation

I put together this functionality for a client, who wanted potential customers
to be able to get an idea of how much a printing project would cost.

## Dependencies

jQuery Core 3.2.1
Bootstrap CSS v3.3.7

## License

MIT License

Copyright (c) 2017 Jeff Bass Design & Development

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
