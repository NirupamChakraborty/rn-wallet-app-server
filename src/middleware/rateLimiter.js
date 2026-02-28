import ratelimiter from "../config/upslash.js";

const rateLimiterMiddleware = async (req, res, next) => {
    try {
        const { success } = await ratelimiter.limit("my-rate-limit-key"); // You can use a unique key for each user or IP address, e.g., `req.ip` or `req.user.id`   
        if (!success) {
            return res.status(429).json({ error: "Too many requests" });
        }
        next();
        
    } catch (error) {
        console.log("rate limit error", error);
        next(error);
        
    }
}

export default rateLimiterMiddleware;