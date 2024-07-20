const { validationResult } = require('express-validator');
const Permission = require('../../models/permissionModel');

const addPermission = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            });
        }

        const { permission_name } = req.body;
        const isExists = await Permission.findOne({ 
            name:{
                $regex: permission_name,
                $options: 'i'
            }
         });

        if (isExists) {
            return res.status(400).json({
                success: false,
                message: 'Permission Name already exists',
            });
        }

        const objek = {
            permission_name
        };

        if (req.body.default) {
            objek.is_default = parseInt(req.body.default);
        }

        const permission = new Permission(objek);
        const newPermission = await permission.save();

        return res.status(200).json({
            success: true,
            message: 'Permission added successfully',
            data: newPermission
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const getPermissions =  async(req, res) => {
    try{
        const permissions = await Permission.find({});
        
        return res.status(200).json({
            success: true,
            message: 'Permission fetched success',
            data: permissions
        });

    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const deletePermission = async(req, res) => {
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
        await Permission.findByIdAndDelete({_id: id});
        return res.status(200).json({
            success: true,
            message: 'Permission Delete success'
        });

    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const updatePermission = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            });
        }

        const { id, permission_name } = req.body;
        const isExists = await Permission.findOne({ _id:id });

        if(!isExists) {
            return res.status(400).json({
                success: false,
                message: 'Permission id not found',
            });
        }
        const isNameAssigned = await Permission.findOne({
             _id: {$ne:id},
             permission_name:{
                $regex: permission_name,
                $options: 'i'
            } 
            });

        if(isNameAssigned) {
            return res.status(400).json({
                success: false,
                message: 'Permission name already asigned to another permission',
            });
        }

        const updatePermission = {
            permission_name
        };

        if (req.body.default !=null) {
            updatePermission.is_default = parseInt(req.body.default);
        }

        const updatedPermission = await Permission.findByIdAndUpdate({_id:id},
            {$set: updatePermission}
        )

        return res.status(200).json({
            success: true,
            message: 'Permission update successfully',
            data: updatedPermission
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
module.exports = {
    addPermission,
    getPermissions,
    deletePermission,
    updatePermission
}
