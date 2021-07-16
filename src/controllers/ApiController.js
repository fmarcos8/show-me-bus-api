const SpTrans = require("../entity/SpTrans")
const busAPI = require('bus-promise')
const Endpoits = require('../constants/Endpoits')

function initSpTrans(endpoint, params) {
    return new SpTrans(process.env.SPTRANS_KEY)
}

exports.get_lines = async function (req, res) {
    const { search_term } = req.query;

    initSpTrans()
        .getLines({
            termosBusca: search_term
        })
        .then(({ data }) => res.json(data))
}

exports.get_lines_way = async function (req, res) {
    const { search_term, direction } = req.query;
    busAPI.find({
        auth: await doAuth(),
        type: 'linesDirection',
        terms: search_term,
        direction: direction
    })
        .then(data => res.json(data))
        .catch(err => console.log(err))
}

exports.get_shapes = async function (req, res) {
    const { shape_id } = req.query;
    busAPI.find({
        auth: await doAuth(),
        type: 'shapes',
        shapeId: shape_id
    })
        .then(data => res.json(data))
        .catch(err => console.log(err))
}

/* AJUSTAR MAIS TARDE */
exports.get_stops = async function (req, res) {
    const { search_term } = req.query;
    busAPI.find({
        auth: await doAuth(),
        type: 'stops',
        terms: search_term
    })
        .then(data => res.json(data))
        .catch(err => console.log(err))
}

exports.get_stops_line = async function (req, res) {
    const { code_line } = req.query;
    busAPI.find({
        auth: await doAuth(),
        type: 'stopsByLine',
        lineId: code_line
    })
        .then(data => res.json(data))
        .catch(err => console.log(err))
}
/* ---------------------------------- */

exports.get_bus_position = async function (req, res) {
    const { line_id } = req.query;
    busAPI.find({
        auth: await doAuth(),
        type: 'vehiclesPosition',
        lineId: line_id
    })
        .then(data => res.json(data))
        .catch(err => console.log(err))
}
