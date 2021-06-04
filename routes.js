const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router()

const ApiController = require('./src/controllers/ApiController');

routes.get('/lines', celebrate({
    [Segments.QUERY]: {
        search_term: Joi.string().required()
    }
}), ApiController.get_lines)

routes.get('/lines-way', celebrate({
    [Segments.QUERY]: {
        search_term: Joi.string().required(),
        direction: Joi.number().required()
    }
}), ApiController.get_lines_way)

routes.get('/shapes', celebrate({
    [Segments.QUERY]: {
        shape_id: Joi.string().required()
    }
}), ApiController.get_shapes)

routes.get('/stops', celebrate({
    [Segments.QUERY]: {
        search_term: Joi.string().required()
    }
}), ApiController.get_stops)

routes.get('/stops-line', celebrate({
    [Segments.QUERY]: {
        code_line: Joi.number().required()
    }
}), ApiController.get_stops_line)

routes.get('/bus-position', celebrate({
    [Segments.QUERY]: {
        line_id: Joi.number().required()
    }
}), ApiController.get_bus_position)

module.exports = routes;