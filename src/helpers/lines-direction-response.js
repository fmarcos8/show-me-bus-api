module.exports = function(lines) {
    return lines.map((line) => {
        return {
            lineId: line.cl,
            circular: line.lc,
            displaySign: line.lt,
            direction: line.sl,
            type: line.tl,
            mainTerminal: line.tp,
            secondaryTerminal: line.ts
        }
    })
}