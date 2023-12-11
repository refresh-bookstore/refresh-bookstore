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
  Response,
} from "tsoa";
import { UserService } from "../services/user.service";
import { CreateUser } from "../dtos/user/create.user";
import { UserResponse } from "../dtos/user/user.response";
import { LoginDTO } from "../dtos/user/login.dto";
import { promisify } from "util";
import { UpdateUser } from "../dtos/user/update.user";
import { validateBody } from "../middlewares/validate.middleware";
import { Error } from "../exceptions/exception.type";

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
  @Response<Error>("409", "이미 사용 중인 이메일입니다.")
  @Response<Error>("500", "회원가입 중 오류가 발생했습니다.")
  public async createUser(@Body() createUser: CreateUser): Promise<void> {
    await this.userService.createUser(createUser);
  }

  @Get("user")
  @Security("sessionAuth")
  @Response<Error>("404", "해당 사용자를 찾을 수 없습니다.")
  public async getUser(@Request() req: RequestExpress): Promise<UserResponse> {
    return this.userService.getUser(req.session.email);
  }

  @Put("user")
  @Security("sessionAuth")
  @Middlewares(validateBody(UpdateUser))
  @Response<Error>("404", "해당 사용자를 찾을 수 없습니다.")
  @Response<Error>("500", "사용자 업데이트에 실패했습니다.")
  public async updateUser(
    @Request() req: RequestExpress,
    @Body() updateUser: UpdateUser
  ): Promise<void> {
    await this.userService.updateUserByEmail(req.session.email, updateUser);
  }

  @Delete("user")
  @Security("sessionAuth")
  @Middlewares(validateBody(LoginDTO))
  @Response<Error>("404", "해당 사용자를 찾을 수 없습니다.")
  @Response<Error>("500", "사용자 탈퇴에 실패했습니다.")
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
  @Response<Error>("404", "해당 사용자를 찾을 수 없습니다.")
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
