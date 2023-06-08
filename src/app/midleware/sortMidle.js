module.exports = function sort(req, res, next) {
    res.locals._sort= {
        enable: false,
        type: 'default'
    }
    if(req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enable = true
        // res.locals._sort.colum = req.query.colum
        // res.locals._sort.type = req.query.type

        Object.assign(res.locals._sort, {
            enable: true,
            colum:req.query.colum,
            type: req.query.type
        })
    }
    next()
}