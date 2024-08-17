const { Router } = require('express');
const router = Router();

const { 
    registerUser,loginUser,getUserData,deleteUser,getAllUsers
} = require('../controllers/usuarios.controller');

const { 
    createSucursal,
    getSucursalById,
    getAllSucursales,
    updateSucursal,
    deleteSucursal,
} = require('../controllers/sucursales.controller');

// USUARIOS
router.post('/register', registerUser);
router.post('/login-user', loginUser);
router.post('/userData', getUserData);
router.post('/deleteUser', deleteUser);
router.get('/getAllUser', getAllUsers);


// Rutas para SUCURSAL
router.post('/createSucursal', createSucursal);
router.get('/getSucursal/:id', getSucursalById);
router.get('/getAllSucursales', getAllSucursales);
router.post('/updateSucursal/:id', updateSucursal);
router.post('/deleteSucursal/:id', deleteSucursal);
module.exports = router;
