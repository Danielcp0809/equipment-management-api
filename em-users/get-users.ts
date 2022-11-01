import { Context, HttpRequest } from "@azure/functions";
import { User } from "../core/entities/user.entity";
import { responseFactory } from "../shared/response-factory";

export async function getAllUsers(context: Context, req: HttpRequest) {
  try {
    const users = await User.find();
    context.res = responseFactory(users, 200);
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 500);
  }
}
