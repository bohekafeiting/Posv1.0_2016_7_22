'use strict';

describe("parseTags",function () {
   it("should return barcodes ",function () {
       let tags=['ITEM000001',
           'ITEM000001',
           'ITEM000001',
           'ITEM000001',
           'ITEM000001',
           'ITEM000003-2.5',
           'ITEM000005',
           'ITEM000005',
           'ITEM000005'];
       let result=parseTags(tags);
       expect(result).toEqual([{"barcode":"ITEM000001","amount":1},
           {"barcode":"ITEM000001","amount":1},{"barcode":"ITEM000001","amount":1},
           {"barcode":"ITEM000001","amount":1},{"barcode":"ITEM000001","amount":1},
           {"barcode":"ITEM000003","amount":2.5},{"barcode":"ITEM000005","amount":1},
           {"barcode":"ITEM000005","amount":1},{"barcode":"ITEM000005","amount":1}]);
   });
})

describe("getItemsAmount",function () {
    it("should print merge barcodes and amount",function () {
     let  amountItems= [{"barcode":"ITEM000001","amount":1},
         {"barcode":"ITEM000001","amount":1},{"barcode":"ITEM000001","amount":1},
         {"barcode":"ITEM000001","amount":1},{"barcode":"ITEM000001","amount":1},
         {"barcode":"ITEM000003","amount":2.5},{"barcode":"ITEM000005","amount":1},
         {"barcode":"ITEM000005","amount":1},{"barcode":"ITEM000005","amount":1}];
     let result=getItemsAmount(amountItems);
      expect(result).toEqual([{"barcode":"ITEM000001","amount":5},
          {"barcode":"ITEM000003","amount":2.5},{"barcode":"ITEM000005","amount":3}]);
    });
})

describe("getCartItems",function () {
    it("should print allcartitemsinformation",function () {
        let cartItems=[{"barcode":"ITEM000001","amount":5},
            {"barcode":"ITEM000003","amount":2.5},{"barcode":"ITEM000005","amount":3}];
        let result=getCartItems(getItemsAmount(cartItems));
        expect(result).toEqual([{"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"amount":5},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"amount":2.5},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"amount":3}]);
    });
})

describe("getOriginalSubtotal",function () {
    it("should print all OriginalSubtotal",function () {
        let originalsubtotal=[{"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"amount":5},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"amount":2.5},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"amount":3}];
        let result=getOriginalSubtotal(originalsubtotal);
        expect(result).toEqual([{"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"amount":5,"subtotal":15},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"amount":2.5,"subtotal":37.5},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"amount":3,"subtotal":13.5}]);
    });
})

describe("getDiscountType()",function () {
    it("should print all itemsDiscountType",function () {
       let result=getDiscountType();
       expect(result).toEqual([{"barcode":"ITEM000000","discounttype":"BUY_TWO_GET_ONE_FREE"},
            {"barcode":"ITEM000001","discounttype":"BUY_TWO_GET_ONE_FREE"},
            {"barcode":"ITEM000003","discounttype":"OTHER_PROMOTION"},
            {"barcode":"ITEM000004","discounttype":"OTHER_PROMOTION"}]);
    });
})

describe("getItemsDiscount",function () {
    it("should print all itemsDiscountType()",function () {
        let originalsubtotal=[{"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"amount":5,"subtotal":15},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"amount":2.5,"subtotal":37.5},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"amount":3,"subtotal":13.5}];
        let result=getItemsDiscount(originalsubtotal);
        expect(result).toEqual([{"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"amount":5,
            "subtotal":15,"type":"BUY_TWO_GET_ONE_FREE"},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"amount":2.5,
                "subtotal":37.5,"type":"OTHER_PROMOTION"},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"amount":3,"subtotal":13.5}]
        );
    });
})


describe("caculateDiscount",function () {
    it("should print discountsubtotal",function () {
        let itemsDiscount=[{"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"amount":5,
            "subtotal":15,"type":"BUY_TWO_GET_ONE_FREE"},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"amount":2.5,
                "subtotal":37.5,"type":"OTHER_PROMOTION"},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"amount":3,"subtotal":13.5}]
        let result=caculateDiscount(itemsDiscount);
        expect(result).toEqual([{"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,
            "amount":5,"subtotal":12,"type":"BUY_TWO_GET_ONE_FREE"},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,
                "amount":2.5,"subtotal":37.5,"type":"OTHER_PROMOTION"},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"amount":3,"subtotal":13.5}]
        );
    });
})

describe("getTotal",function () {
    it("should print total",function () {
        let totalitems=[{"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,
            "amount":5,"subtotal":15,"type":"BUY_TWO_GET_ONE_FREE"},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,
                "amount":2.5,"subtotal":37.5,"type":"OTHER_PROMOTION"},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"amount":3,"subtotal":13.5}];
        let result=getTotal(totalitems);
        expect(result).toEqual(66);
    })

});