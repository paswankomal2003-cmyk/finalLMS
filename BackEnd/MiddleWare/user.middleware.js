import jwt from "jsonwebtoken";

const isLoggedIn = async function (req, res, next) {
    try {
        // Assuming the token is stored in req.cookies.token
        const { token } = req.cookies;

        // If no token is found
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required"
            });
        }  

        // Verifying the token
        const userDetail = await jwt.verify(token, process.env.JWT_SECRET); // Ensure SECRET is in environment variables

        // Assign user details to the req object
        req.user = userDetail;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// isme hum ye define kar rhe hai ki user ka role yek list me de do ki kin kin role ke liye ap ye activity kar rhe ho.
export const authorizedRoles = (...roles)=> async(req,res,next) => {
    // req.user is comes from isLoggedIn. inside the req.user roles are present because when we create jwt token we already define that roles are present in the token.

    const  currenUserRole = req.user.role;

    // if role are not present then it will show an error.
    if(!roles.includes(currenUserRole)){
        return res.status(403).json({
            success:false,
            message:"You do not have permission to access this Route"
        })
    }
    next()

}

export default isLoggedIn;
