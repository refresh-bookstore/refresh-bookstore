import { Request as RequestExpress } from "../decorators/express.authentication.decorator";
import {
  Controller,
  Route,
  Post,
  Body,
  Tags,
  Get,
  Request,
  Security,
  Put,
  Delete,
} from "tsoa";
import { UserService } from "../services/user.service";
import { CreateUser } from "../dtos/user/create.user";
import { UserResponse } from "../dtos/user/user.response";
import { LoginDTO } from "../dtos/user/login.dto";
import { promisify } from "util";
import { UpdateUser } from "../dtos/user/update.user";

@Tags("User")
@Route("")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post("user")
  public async createUser(
    @Body() createUser: CreateUser
  ): Promise<UserResponse> {
    return await this.userService.createUser(createUser);
  }

  @Get("user")
  @Security("sessionAuth")
  public async getUser(@Request() req: RequestExpress): Promise<UserResponse> {
    return this.userService.getUser(req.session.user.email);
  }

  @Put("user")
  @Security("sessionAuth")
  public async updateUser(
    @Request() req: RequestExpress,
    @Body() updateUser: UpdateUser
  ): Promise<UserResponse> {
    return await this.userService.updateUserByEmail(
      req.session.user.email,
      updateUser
    );
  }

  @Delete("user")
  @Security("sessionAuth")
  public async deleteUser(
    @Request() req: RequestExpress,
    @Body() loginDTO: LoginDTO
  ): Promise<void> {
    await this.userService.deleteUser(loginDTO);
    const destroySession = promisify(req.session.destroy).bind(req.session);
    await destroySession();
  }

  @Get("users")
  @Security("sessionAuth", ["isAdmin"])
  public async getUsers(): Promise<UserResponse[]> {
    return await this.userService.getUsers();
  }

  @Post("login")
  public async login(
    @Request() req: RequestExpress,
    @Body() loginDTO: LoginDTO
  ): Promise<void> {
    const user = await this.userService.login(loginDTO);
    req.session.user = { email: user.email };
  }

  @Get("login/status")
  public async checkLoginStatus(
    @Request() req: RequestExpress
  ): Promise<boolean> {
    return !!req.session.user;
  }

  @Post("logout")
  public async logout(@Request() req: RequestExpress): Promise<void> {
    const destroySession = promisify(req.session.destroy).bind(req.session);
    await destroySession();
  }
}
