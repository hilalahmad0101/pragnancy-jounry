import Joi from 'joi';
import nc from 'next-connect'
import connection from '../../connection/config';
connection();
const handler = nc()
    .post((req, res) => {
        const { name, email, password, confirm_password } = req.body;

        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().required(),
            confirm_password: Joi.any()
                .equal(Joi.ref('password'))
                .required()
                .messages({
                    'any.only': 'Passwords must match'
                }),
        });
        const message = schema.validate({ name, email, password, confirm_password });
        if(message.error){
            return res.send({
                success:false,
                message:message.error.details[0].message
            });
        }else{
            return res.send(req.body)
        }
    })

export default handler;