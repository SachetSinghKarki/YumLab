import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users= await User.find()
    res.status(200).json({msg:"All users found", users})
  }

    catch (error) {
        console.log(error)
    }
}

export const getUserById = async (req, res) => {

    try{
        const user= await User.findById({_id:req.params.id})
        if (!user){
            res.status(404).json({msg:"User not found"})
        }
        res.status (200).json({msg:"User found successfully.",user})
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteUserById = async (req, res) => {

    try{
        const user= await User.findByIdAndDelete({_id:req.params.id})
        if (!user){
            res.status(404).json({msg:"User not found"})
        }
        res.status (200).json({msg:"User deleted successfully.",user})
    }
    catch (error) {
        console.log(error)
    }
}

export const postUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ msg: "User created successfully", user });
    } catch (error) {
        console.log(error.message);
    }       
};

export const updateProfile = async (req, res) => {
    const { username, avatar, image } = req.body;

    try {
        const updateData = {};

        if (typeof username === "string") {
            const trimmedUsername = username.trim();

            if (!trimmedUsername) {
                return res.status(400).json({ msg: "Username is required" });
            }

            const existingUser = await User.findOne({
                username: trimmedUsername,
                _id: { $ne: req.userId },
            });

            if (existingUser) {
                return res.status(400).json({ msg: "Username already exists" });
            }

            updateData.username = trimmedUsername;
        }

        if (typeof avatar === "string") {
            updateData.avatar = avatar.trim();
        } else if (typeof image === "string") {
            updateData.avatar = image.trim();
        }

        if (!Object.keys(updateData).length) {
            return res.status(400).json({ msg: "Username or avatar is required" });
        }

        const user = await User.findByIdAndUpdate(req.userId, updateData, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "Profile updated successfully.", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Profile update failed" });
    }
}

export const updateUser = async (req, res) => {
    if (req.userId !== req.params.id) {
        return res.status(403).json({ msg: "You can update only your own profile" });
    }

    return updateProfile(req, res);
}
