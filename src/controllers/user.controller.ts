import { Request as RequestExpress } from "../middlewares/express.authentication";
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
  Middlewares,
} from "tsoa";
import { UserService } from "../services/user.service";
import { CreateUser } from "../dtos/user/create.user";
import { UserResponse } from "../dtos/user/user.response";
import { LoginDTO } from "../dtos/user/login.dto";
import { promisify } from "util";
import { UpdateUser } from "../dtos/user/update.user";
import { validateBody } from "../middlewares/validate.middleware";

@Tags("User")
@Route("")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post("user")
  @Middlewares(validateBody(CreateUser))
  public async createUser(@Body() createUser: CreateUser): Promise<void> {
    await this.userService.createUser(createUser);
  }

  @Get("user")
  @Security("sessionAuth")
  public async getUser(@Request() req: RequestExpress): Promise<UserResponse> {
    return this.userService.getUser(req.session.email);
  }

  @Put("user")
  @Security("sessionAuth")
  @Middlewares(validateBody(UpdateUser))
  public async updateUser(
    @Request() req: RequestExpress,
    @Body() updateUser: UpdateUser
  ): Promise<void> {
    await this.userService.updateUserByEmail(req.session.email, updateUser);
  }

  @Delete("user")
  @Security("sessionAuth")
  @Middlewares(validateBody(LoginDTO))
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
  @Middlewares(validateBody(LoginDTO))
  public async login(
    @Request() req: RequestExpress,
    @Body() loginDTO: LoginDTO
  ): Promise<void> {
    const email = await this.userService.login(loginDTO);
    req.session.email = email;
  }

  @Get("login/status")
  @Security("sessionAuth")
  public async checkLoginStatus(
    @Request() req: RequestExpress
  ): Promise<void> {}

  @Post("logout")
  public async logout(@Request() req: RequestExpress): Promise<void> {
    const destroySession = promisify(req.session.destroy).bind(req.session);
    await destroySession();
  }
}
