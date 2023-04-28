const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productService = require("../services/productService");

function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomChars =
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(65 + Math.floor(Math.random() * 26));
  let randomNums = "0000" + Math.floor(Math.random() * 10000);
  randomNums = randomNums.slice(-4);
  let randomMid = "";
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      randomMid += Math.floor(Math.random() * 10);
    } else {
      randomMid += chars.charAt(Math.floor(Math.random() * 36) + 26);
    }
  }
  const randomId = randomChars + randomMid + randomNums;
  return randomId;
}

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: generateOrderId,
    },
    email: {
      type: String,
      required: true,
    },
    shippingStatus: {
      type: String,
      required: true,
      enum: ["상품 준비중", "배송중", "배송완료", "주문취소"],
      default: "상품 준비중",
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    detailAddress: {
      type: String,
      // required: true,
      // trim: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    orderRequest: {
      type: String,
      required: true,
    },
    orderList: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// orderSchema.pre("save", async function (next) {
//   try {
//     let totalPrice = 0;
//     const order = this;

//     for (let i = 0; i < order.orderList.length; i++) {
//       let getPrice = await productService.getPrice(
//         order.orderList[i].product.price
//       );
//       totalPrice += order.orderList[i].quantity * getPrice;
//     }

//     order.totalPrice = totalPrice;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
