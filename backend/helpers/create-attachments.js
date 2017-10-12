var models = require('../models');
module.exports = function (files, case_) {
    for (var file of files) {
        var filename = file.path;
        if (filename) {
            filename = filename.substr(filename.indexOf("/"));
        }
        models.Attachment.create({
            related_file : filename,
            CaseId: case_.id
        })
    }
}