enum FieldFormItemType {
  Email = "email",
  Text = "text",
  Radio = "radio",
  Checkbox = "checkbox",
}

enum CardTypes {
  List = "list",
  Gird = "gird",
  Default = "default",
}

enum ActiveForgotPasswordStep {
  step1 = "1",
  step2 = "2",
  step3 = "3",
}

enum TransactionType {
  PROMOTE = "promote",
  MEMBERSHIP = "membership",
}

enum CardMenu {
  EDIT = "edit",
  DELETE = "delete",
  PROMOTE = "promote",
  SOLD = "sold",
}

enum FreeType {
  MONTH = "MONTHLY",
  YEAR = "ANNUAL",
}

enum UserRole {
  Admin = "admin",
  ExamDepartment = "exam_department",
  Proctor = "proctor",
  ITSupport = "it_support",
}

enum Color {
  WHITE = "#FFFFFF",
  RED = "#FF0000",
  BLUE = "#0000FF",
  GREEN = "#00FF00",
  ORANGE = "#FFA500",
  BLACK = "#000000",
  YELLOW = "#FFFF00",
}
enum ColorTranslate {
  WHITE = "Trắng",
  RED = "Đỏ",
  BLUE = "Xanh Biển",
  GREEN = "Xanh lá",
  ORANGE = "Cam",
  BLACK = "Đen",
  YELLOW = "Vàng",
}
enum OrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Canceled = "Canceled",
}
enum OrderStatusTranslate {
  Pending = "Đang xử lí",
  Confirmed = "Đã xác nhận",
  Shipped = "Đang vận chuyển",
  Delivered = "Đã giao hàng",
  Canceled = "Đã hủy",
}
enum PaymentMethod {
  CashOnDelivery = "CashOnDelivery", // Nhận tiền khi thanh toán
  OnlinePayment = "OnlinePayment", // Thanh toán online
}
enum PaymentMethodTranslate {
  CashOnDelivery = "Thanh toán tại nhà", // Nhận tiền khi thanh toán
  OnlinePayment = "Thanh toán trực tiếp", // Thanh toán online
}

enum TransactionStastus {
  Pending = "Pending",
  Success = "Success",
  Failed = "Failed",
}
enum TransactionStastusTranslate {
  Pending = "Đang xử lí",
  Success = "Thành công",
  Failed = "Thất bại",
}

const enums = {
  FieldFormItemType,
  CardTypes,
  TransactionType,
  CardMenu,
  FreeType,
  ActiveForgotPasswordStep,
  UserRole,
  Color,
  ColorTranslate,
  OrderStatus,
  PaymentMethod,
  TransactionStastus,
  OrderStatusTranslate,
  TransactionStastusTranslate,
  PaymentMethodTranslate,
};
export default enums;
