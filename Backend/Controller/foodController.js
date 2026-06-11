import Food from "../models/foodModel.js";

export const getAllFoods = async (req, res) => {
  try {
    const foods= await Food.find()
    res.status(200).json({msg:"Sabai foods paaiyo", foods})
  } 
  catch (error) {
    console.log(error)
  }
}

export const getFoodById = async (req, res) => {
  try{
    const food= await Food.findById({_id:req.params.id})
    if (!food){
      res.status(404).json({msg:"Food not found"})
    }
    res.status (200).json({msg:"Food found successfully.",food})
  }
  catch(error){
    console.log(error)
  }
}

export const deleteFoodById = async (req, res) => {
  try{
    const food= await Food.findByIdAndDelete({_id:req.params.id})
    if (!food){
      res.status(404).json({msg:"Food not found"})
    }
    res.status (200).json({msg:"Food deleted successfully."})
  }
  catch(error){
    console.log(error)
  }
}


export const postFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(200).json({ msg: "Food created successfully", food });
  } catch (error) {
    console.log(error.message);
  }
};


export const updateFood = async (req, res) => {
 try{
  const food= await Food.findByIdAndUpdate(req.params.id, req.body, {new:true})

  if(!food){
    res.status(404).json({msg:"Food not found in db."})
  }
  res.status(200).json({msg:"Food updated sucessfully.", food})
 }
 catch(error){
  console.log(error)
 }
}