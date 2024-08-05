import { asyncHandler } from "../middleware/asyncHandler.js";
import Users from "../models/Users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const userData = asyncHandler(async (req, res) => {
    const userDa = await Users.find({}, { password: 0 })
    console.log(userDa)
    if (userDa.length == 0) throw new Error('user not found')

    return res.status(200).json({ success: true, userDa, message: 'user data found' })

})

export const userRegister = asyncHandler(async (req, res) => {
    const { email, password, role, name } = req.body
    const userDa = await Users.find({ email: email })
    console.log(userDa)
    if (userDa.length > 0) throw new Error('user already exists')
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await Users.create({ email, password: hashPassword, role, name })
    return res.status(200).json({ success: true, message: 'user created', data: newUser })

})

export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const userDa = await Users.findOne({ email: email })
    if (!userDa) throw new Error('No user found')
    console.log(userDa.password)
    const isUser = await bcrypt.compare(password, userDa.password)
    if (!isUser) throw new Error('wrong password')

    const token = jwt.sign({ userId: userDa._id, role: userDa.role }, "saurabh", { expiresIn: "1d" })

    return res.status(200).json({ success: true, message: 'user login', token })


})

export const userFileRequest = asyncHandler(async (req, res) => {
    console.log(req.user.role)
    if (req.user.role != "user") throw new Error('only user can upload file')
    let uploadPath
    // return console.log(req.files)
    if (req.files) {
        sampleFile = req.files.sampleFile;
        uploadPath = __dirname + '/uploads/' + sampleFile.name;
        uploadPath = __dirname + '/uploads/' + sampleFile.name;
        sampleFile.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
        });

    }
    let updateUser = await Users.updateOne({ _id: req.user.userId })
    updateUser.fileData = uploadPath
    await updateUser.save()
    return res.status(200).json({ success: true, message: 'file uploaded' })

})

export const approveFile = asyncHandler(async (req, res) => {
    if (req.user.role != "admin") throw new Error('Only admin can approve file')
    const { isActive } = req.body
    let updateUser = await Users.updateOne({ _id: req.user.userId })
    updateUser.isActive = isActive
    await updateUser.save()
    return res.status(200).json({ success: true, message: 'Active saved' })

})