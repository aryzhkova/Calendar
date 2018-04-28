'use strict';

module.exports = function() {
    $.gulp.task('copy:jquery-ui', function() {
        return $.gulp.src('./source/jquery-ui/**/*.*')
            .pipe($.gulp.dest($.config.root + '/assets/jquery-ui'));
    });
};
