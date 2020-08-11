/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require("jsonwebtoken");

module.exports = {

    // Sign up the user-agent
    webSignUp: function (req, res) {
        
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        if (!name || !email || !password) return res.badRequest('Invalid Request..');

        var customerDetails = {
            name: name,
            email: email,
            password: password,
        };
        
        Customer.create(customerDetails).exec((err) => {

            if (err) return res.status(400).json(err.message);

            res.json({
                success: true,
            });
        });
    },

    // Sign in the user-agent
    webLogin: function (req, res) {

        var Passwords = require('machinepack-passwords');

        var error = null;
        const email = req.body.email;
        const password = req.body.password;

        if (!email) return res.badRequest('Invalid Request..');

        Customer.findOne({email: email}).exec((err, foundAuth) => {

            if (err) return res.status(400).json(err.message);

            if(!foundAuth) {
                return res.status(400).json('Invalid Credentials');
            }

            Passwords.checkPassword({
                passwordAttempt: password,
                encryptedPassword: foundAuth.password
            })
            .exec({

                error: function(err) {
                    return res.negotiate(err);
                },

                incorrect: function() {
                    return res.send(409, 'Invalid credentials, please try again.');
                },

                success: function() {

                    const payload = { id: foundAuth.id, name: foundAuth.name };

                    jwt.sign(
                        payload,
                        'sampleseceretkey',
                        { expiresIn: 360000 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                }
            });
        });

    }
};

