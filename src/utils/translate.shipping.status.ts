import { ShippingStatus } from "@prisma/client";

export function translateShippingStatus(status: ShippingStatus): string {
  const statusTranslations: { [key: string]: string } = {
    READY: "상품 준비중",
    SHIPPING: "배송중",
    DELIVERED: "배송완료",
    CANCELLED: "주문취소",
  };

  return statusTranslations[status] || "알 수 없음";
}
