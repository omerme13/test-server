const User = require("./models/users.model.js");
const catchAsync = require("./utils/catchAsync");

const getUsers = catchAsync(async (req, res, next) => {
    const searchTextRegex = new RegExp(req.query.search, 'i');
    let query = User.find({
        $or:
            [{
                first_name: { $regex: searchTextRegex }
            },
            {
                last_name: { $regex: searchTextRegex }
            }]
    });

    if (req.query.sort) {
        query = query.sort(req.query.sort);
    }

    const numOfUsers = await User.countDocuments();

    const page = +req.query.page || 1;
    const limit = +req.query.limit || numOfUsers;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit)

    const users = await query;

    return res.status(200).json({
        status: 'success',
        results: users.length,
        next: skip >= numOfUsers
            ? null
            : `${req.path}?search=${req.query.search || ''}&sort=${req.query.sort || ''}&limit=${req.query.limit || ''}&page=${+req.query.page + 1 || 1}`,
        data: users
    })
});

const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    return res.status(200).json({ status: 'success', data: user })
});

const updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({ status: 'success', data: user })
});

const createUser = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);

    return res.status(201).json({ status: 'success', data: user })
});

const deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    return res.status(204).json({ status: 'success', data: null })
});

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
};
