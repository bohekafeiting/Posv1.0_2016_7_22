'use strict'

let tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];
// 下面写实现
function  parseTags(tags) {
    return tags.map(function (tag) {
       let  temp=tag.split('-');
        return{
            barcode:temp[0],amount:parseFloat(temp[1])||1
        }

    })

}

function getItemsAmount(barcodes) {
  let amountItems=[];
   for(let item of barcodes){
       let exit=amountItems.find(function (temp) {
           return item.barcode===temp.barcode;
       })
       if(exit){
           exit.amount+=item.amount;
       }
       else{
           amountItems.push(Object.assign({},{barcode:item.barcode,amount:item.amount}));
       }
   }
   return amountItems;
}

function getCartItems(amountItems) {
    let allItems=loadAllItems();
    let cartItems=[];
    for(let item of amountItems){
       let exit=allItems.find(function (temp) {
           return temp.barcode===item.barcode;
       })
        if(exit){
           cartItems.push(Object.assign({},exit,{amount:item.amount}));
        }
    }
    return cartItems;
}

function  getOriginalSubtotal(cartItems) {
    let originalsubtotal=[];
    for(let item of cartItems){
       originalsubtotal.push(Object.assign({},item,{subtotal:item.amount*item.price}));
    }
    return originalsubtotal;
}

function getDiscountType(){
    let itemsdiscount=loadPromotions();
    let discountTypes=[];
    for(let item of itemsdiscount){
        for(let i=0;i<item.barcodes.length;i++){
            discountTypes.push(Object.assign({},{barcode:item.barcodes[i],discounttype:item.type}));
        }
    }
    return discountTypes;
}

function  getItemsDiscount(originalsubtotal) {
    let discountTypes=getDiscountType();
    let itemsDiscount=[];
    for(let item of originalsubtotal){
        let exit=discountTypes.find(function (temp) {
            return temp.barcode===item.barcode;
        })
        if(exit){
            itemsDiscount.push(Object.assign({},item,{type:exit.discounttype}));
        }
        else{
            itemsDiscount.push(Object.assign({},item));
        }
    }
    return itemsDiscount;
}

function  caculateDiscount(itemsDiscount) {
  let subtotalItems=[];
  let savemoney=0;
   for(let item of itemsDiscount){
      let num=0;
      if(item.type==='BUY_TWO_GET_ONE_FREE'){
           num=parseInt(item.amount/3);
           savemoney+=num*item.price;
           item.subtotal-=num*item.price;
      }
      subtotalItems.push(Object.assign({},item));
   }
   return subtotalItems;
}

function getTotal(subtotalItems) {
  let total=0;
   for(let item of subtotalItems){
     total+=item.subtotal
   }
    return total;
}
