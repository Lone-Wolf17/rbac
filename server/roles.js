const AccessControl = require('accesscontrol');
const { RoleNames } = require('./constants/enums');
const ac = new AccessControl();

exports.roles = (function() {
    ac.grant(RoleNames.basic)
    .readOwn("profile")
    .updateOwn("profile");

    ac.grant(RoleNames.supervisor)
    .extend(RoleNames.basic)
    .readAny("profile")

    ac.grant(RoleNames.admin)
    .extend(RoleNames.basic)
    .extend(RoleNames.supervisor)
    .updateAny("profile")
    .deleteAny("profile")

    return ac;
})();