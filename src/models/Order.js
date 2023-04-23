const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productService = require("../services/productService");

const orderSchema = new Schema({
  orderId:{
    type: Number,
    required:true,
  },
  shippingStatus:{
    type: String,
    required:true,
    enum: ['상품준비중', '배송중', '배송완료', '주문취소'],
    default:'상품 준비중',
  },
  userName:{
    type:String,
    required: true,
  },
  userAddress:{
    type:String,
    required: true,
  },
  userPhone:{
    type:String,
    required: true,
  },
  orderList:[
    {
      product: { 
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true 
      },
      quantity: {
        type: Number,
        required: true,
      },
    }
  ],
  totalPrice:{
    type: Number,
    required: true,
  }
  },{ 
    timestamps: true 
  }
);

orderSchema.pre("save", async(next) => {
  try{
    let totalPrice = 0;
    const order = this;

    for(let i = 0; i < order.orderList.length; i++){
      let getPrice = await productService.getProduct(price);
      totalPrice += orderList[i].quantity * getPrice;
    }

    order.totalPrice = totalPrice;
    next();

  } catch(error){
    next(error);
  }
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;