const { validationResult } = require('express-validator');
const { categoryValidator } = require('../../helpers/adminValidator');
const Category = require('../../models/categoryModel');


const addCategory = async(req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            });
        }

        const {category_name} = req.body;

        const isExists = await Category.findOne({
            name:{
                $regex: category_name,
                $options: 'i'
            }
        })

        if(isExists){
            return res.status(400).json({
                success: false,
                message: 'Category is name already Exists!'
            });
        }

        const category = new Category({
            name: category_name
        });

        const categoryData = await category.save();

        return res.status(200).json({
            success: true,
            message: 'category add success',
            data: categoryData
        });

    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const getCategory = async(req, res) => {
    try{
        const category = await Category.find({});

        return res.status(200).json({
            success: true,
            message: 'category fetched success',
            data: category
        });

    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

const deleteCategory = async(req, res) => {
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            });
        }

        const {id} = req.body;
        await Category.findByIdAndDelete({_id: id});
        return res.status(200).json({
            success: true,
            message: 'Category Delete success'
        });

    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const updateCategory = async(req, res) => {
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            });
        }

        const {id, category_name} = req.body;
        const categoryData = await Category.findOne({_id:id});

        if(!categoryData){
        return res.status(400).json({
            success: true,
            message: 'Category Id Do not exists!'
        });
    }

    const isExists = await Category.findOne({
        _id:{$ne:id},
        name:{
            $regex: category_name,
            $options: 'i'
        }
    })

    if(isExists){
        return res.status(400).json({
            success: false,
            message: 'Category name already Exists!'
        });
    }

    const updateData = await Category.findByIdAndUpdate({_id:id},{
        $set:{
            name: category_name
        }
    },{new:true});

    return res.status(200).json({
        success: true,
        message: 'Category Updated success',
        data: updateData
    });

    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}



module.exports = {
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
}