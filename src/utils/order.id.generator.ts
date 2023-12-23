export class OrderIdGenerator {
  static getCurrentDateFormatted() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return { year, month, day };
  }

  static generateRandomCharacters(n) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomChars = "";
    for (let i = 0; i < n; i++) {
      randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomChars;
  }

  static generateOrderId(): string {
    const { year, month, day } = this.getCurrentDateFormatted();
    const randomDigits = this.generateRandomCharacters(3);
    return year + randomDigits + day + month;
  }
}
