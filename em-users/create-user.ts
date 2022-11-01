import { Context, HttpRequest } from "@azure/functions";
import { User } from "../core/entities/user.entity";
import { responseFactory } from "../shared/response-factory";

export async function createUser(context: Context, req: HttpRequest) {
  try {
    const { firstName, lastName, email } = req.body;
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    if(!firstName || !lastName || !email) throw new Error("Missing some user parameters")
    await newUser.save();
    context.res = responseFactory(newUser, 200);
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 404);
  }
}
