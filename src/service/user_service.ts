import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt"
import { CreateUserInput, loginInput, UserModel } from "../schema/user.schema";
import { signJwt } from "../utils/jwt";

class UserService{
    async createUser(input: CreateUserInput){

       
        //call user model to create a user
        return UserModel.create(input);
    }

    async login(input: loginInput){
        const e = "Invalid email or password"
        //Get our user by email
        const user = await UserModel.find().findByEmail(input.email).lean();
        if(!user){
            throw new ApolloError(e)
        }

        //validate the password
        const passwordIsValid = await bcrypt.compare(input.password, user.password);

        if(!passwordIsValid){
            throw new ApolloError(e);
        }
        //sign a jwt
        const token = signJwt();
        //set a cookie for the jwt
        //return the jwt

    }
}

export default UserService;