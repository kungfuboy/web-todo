function pv(ctx) {
    // count是session自带的属性?
    ctx.session.count++
    global.console.log('====', ctx.path)
}

module.exports = function() {
    return async function(ctx, next) {
        pv(ctx)
        await next()
    }
}