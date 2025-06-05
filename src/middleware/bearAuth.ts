import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//middleware to check if user is loggedin
// export const isAuthenticated = (req: Request, res: Response, next: NextFunction ) =>{
//  const authHeader = req.headers.authorization
 
//  if (!authHeader || !authHeader.startsWith("Bearer")) {
//     res.status(401).json({message: "Unauthorized"});
//     return;
//  }

//     //  `
//     //  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGFybGllQGV4YW1wbGUuY29tIiwiY3VzdG9tZXJfaWQiOiJjaGFybGllQGV4YW1wbGUuY29tIiwiZmlyc3RfbmFtZSI6IkNoYXJsaWUiLCJsYXN0X25hbWUiOiJNaWxsZXIiLCJleHAiOjE3NDg5MjkyNTEsImlhdCI6MTc0ODkyOTE5Mn0.S6lFwi2hpM58TLO8SYEGvDeuriIHQlwJXEF2QbamKaU
//     //  `
//  const token = authHeader.split(" ")[1];

//  try {
//     const decode = jwt.verify(token, process.env.JWT_SECRET as string);

//     // attaching user info with request
//     (req as any).customer = decode;
//     next
//  } catch (error) {
//     next();
//  }
// }

export const checkRoles = (requiredRoles: "admin" | "user" | "both") =>{
    return (req: Request, res: Response, next: NextFunction):void =>{
        const authHeader =req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(401).json({
                message: "unauthorized!!!!"
            })
            return;
        }

        const token = authHeader.split(" ") [1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            (req as any).user = decoded;

            //check for roles
            if(
                typeof decoded ===  "object" &&  //Ensure decoded is an object
                decoded !== null &&             //Ensure decoded is not null
                "role" in decoded               //Ensure decoded has a role property
            ){
                if(requiredRoles === "both")
                    if(decoded.role === "admin" || decoded.role === "user"){
                        next();
                        return;
                    } else if (decoded.role === requiredRoles){
                        next();
                        return;
                    }
            }else {
                res.status(401).json({ message: "Invalid Token Payload, not authorized!!"});
                return;
            }            
        } catch (error) {
            res.status(401).json({ message: "Invalid token p"});
            return;
        }
    }
}

export const adminRoleAuth = checkRoles("admin");
export const userRoleAuth = checkRoles("user");
export const bothRoleAuth = checkRoles("both");
