import {CrudRepository} from "./index.js";
import User from "../models/user.model.js";

class UserRepository extends CrudRepository{

    constructor(){
        super(User);
    }

    async findOne(email) {
        try {
            const result = await User.findOne(email).select("+password");
            return result;
        } catch (error) {
            throw error;
        }
    }


}

export default UserRepository;