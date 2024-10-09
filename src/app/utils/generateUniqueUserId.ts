import slugify from "slugify";
import { User } from "../modules/user/user.model";

const generateUniqueUserId = async(name: string) => {
    let isUnique = false;
    let userId;
  
    while (!isUnique) {
     
      const slug = slugify(name, { lower: true,replacement:"_" ,trim: true});
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      userId = `${slug}_${randomNumber}`;
  
      // Check if the generated userId already exists in the database
      const existingUser = await User.findOne({ userId });
      if (!existingUser) {
        isUnique = true; 
      }
    }
  
    return userId;
};

export default generateUniqueUserId;
