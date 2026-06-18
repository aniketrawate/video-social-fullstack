
// this is async handler in try catch format.
// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await func(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error"
//         });
//     }
// }

// this is async handler in promise format.

const asyncHandler = (requestHandler) => { 
    return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    });
}}

export default asyncHandler;