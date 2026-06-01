
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

const asyncHandler = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((error) => {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    });
}

export default asyncHandler;