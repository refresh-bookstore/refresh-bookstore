import { Controller, Get, Route, Request, Tags, Security } from "tsoa";
import { Request as RequestExpress } from "../middlewares/express.authentication";

@Route("")
@Tags("Page")
export class PageController extends Controller {
  @Get("/")
  public async getHomePage(@Request() req: RequestExpress): Promise<void> {
    req.res.render("home/home.html");
  }

  @Get("/login")
  public async getLoginPage(@Request() req: RequestExpress): Promise<void> {
    req.res.render("login/login.html");
  }

  @Get("/register")
  public async getRegisterPage(@Request() req: RequestExpress): Promise<void> {
    req.res.render("register/register.html");
  }

  @Get("/user-mypage")
  @Security("sessionAuth")
  public async getUserMypage(@Request() req: RequestExpress): Promise<void> {
    req.res.render("user-mypage/user-mypage.html");
  }

  @Get("/cart")
  public async getCart(@Request() req: RequestExpress): Promise<void> {
    req.res.render("cart/cart.html");
  }

  @Get("/order-detail")
  @Security("sessionAuth")
  public async getOrderDetail(@Request() req: RequestExpress): Promise<void> {
    req.res.render("order-detail/order-detail.html");
  }

  @Get("/order-create")
  @Security("sessionAuth")
  public async getOrderCreate(@Request() req: RequestExpress): Promise<void> {
    req.res.render("order-create/order-create.html");
  }

  @Get("/order-complete")
  @Security("sessionAuth")
  public async getOrderComplete(@Request() req: RequestExpress): Promise<void> {
    req.res.render("order-complete/order-complete.html");
  }

  @Get("/order-list")
  @Security("sessionAuth")
  public async getOrderList(@Request() req: RequestExpress): Promise<void> {
    req.res.render("order-list/order-list.html");
  }

  @Get("/book-detail")
  public async getBookDetail(@Request() req: RequestExpress): Promise<void> {
    req.res.render("book-detail/book-detail.html");
  }

  @Get("/book-search")
  public async getBookSearch(@Request() req: RequestExpress): Promise<void> {
    req.res.render("book-search/book-search.html");
  }

  @Get("/user-admin")
  @Security("sessionAuth", ["isAdmin"])
  public async getUserAdmin(@Request() req: RequestExpress): Promise<void> {
    req.res.render("user-admin/user-admin.html");
  }
}
