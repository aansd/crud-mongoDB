const {validationResult} = require('express-validator');
const Post = require('../models/postModel');

const createPost = async(req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            });
        }

        const {title, description} = req.body;

        var objeck = {
            title,
            description
        }

        if(req.body.categories){
            objeck.categories = req.body.categories;
        }

        const post = new Post(objeck);
        const postData = await post.save();
        const postFullData = await Post.findOne({ _id: postData._id }).populate('categories');

        return res.status(200).json({
            success: true,
            message: 'Create Post success',
            data: postFullData
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            message:error.message
        });
    }
}

const getPost = async(req, res) => {
    try{
        const category = await Post.find({}).populate('categories');

        return res.status(200).json({
            success: true,
            message: 'Post fetched success',
            data: category
        });

    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const deletePost = async(req, res) => {
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
        await Post.findByIdAndDelete({_id: id});
        return res.status(200).json({
            success: true,
            message: 'Post Delete success'
        });

    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const updatePost = async(req, res) => {
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            });
        }

        const {id, title, description, categories} = req.body;
        const postData = await Post.findOne({_id:id});

        if(!postData){
        return res.status(400).json({
            success: true,
            message: 'post Id Do not exists!'
        });
    }

    const isExistsTitle = await Post.findOne({
        _id:{$ne:id},
        title
    });

    if(isExistsTitle){
        return res.status(400).json({
            success: false,
            message: 'title already Exists!'
        });
    }

    const isExistsDesc = await Post.findOne({
        _id:{$ne:id},
        description
    });

    if(isExistsDesc){
        return res.status(400).json({
            success: false,
            message: 'Description already Exists!'
        });
    }

    const updateData = await Post.findByIdAndUpdate({_id:id},{
        title,
        description,
        categories
    },{new:true}).populate('categories');

    return res.status(200).json({
        success: true,
        message: 'post Updated success',
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
    createPost,
    getPost,
    deletePost,
    updatePost
}
