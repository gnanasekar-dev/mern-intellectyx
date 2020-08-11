/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // Get list of products
	getProducts: function(req, res) {

        Product.find().sort('createdAt DESC').exec((err, products) => {

            if (err) return res.status(400).json(err.message);

            res.json(products);
        });
    },

    // Get a product
	getProduct: function(req, res) {

        var productId = req.param('productId');
        
        if (!productId) return res.badRequest('Invalid Request..');

        Product.findOne({id: productId}).exec((err, foundProduct) => {

            if (err) return res.status(400).json(err.message);

            if(!foundProduct) {
                return res.status(400).json('Product Not Found');
            }

            res.json(foundProduct);
        });
    },

    // Add a product
    addProduct: function(req, res) {

        var name = req.body.name;
        var price = req.body.price;

        if (!name || !price) return res.badRequest('Invalid Request..');

        var productDetails = {
            name: name,
            price: price,
        };
        
        Product.create(productDetails).exec((err) => {

            if (err) return res.status(400).json(err.message);

            res.json({
                success: true,
            });
        });
    },

    // Edit a product
    editProduct: function(req, res) {

        var productId = req.body.productId;
        var name = req.body.name;
        var price = req.body.price;

        if (!name || !price) return res.badRequest('Invalid Request..');

        var productDetails = {
            name: name,
            price: price,
        };
        
        Product.update({id: productId}).set(productDetails).exec((err) => {

            if (err) return res.status(400).json(err.message);

            res.json({
                success: true,
            });
        });

    },

    // Remove a product
    removeProduct: function(req, res) {

        var id = req.body.id;

        if (!id) return res.badRequest('Invalid Request..');

        var deletionObj = {
            id: id,
        };

        Product.destroy(deletionObj).fetch().exec((err, response) => {

            if (err) return res.status(400).json(err.message);

            if(response.length > 0) {
                res.json(response[0].id);
            }
            else {
                res.status(400).json('Product Not Found');
            }
        });
    },
};
