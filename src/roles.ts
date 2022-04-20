import { AccessControl } from "accesscontrol";
import {RoleNames, ResourceNames} from './constants/enums';


const ac = new AccessControl();

export default (function() : AccessControl{
    ac.grant(RoleNames.basic)
    .readOwn(ResourceNames.profile)
    .updateOwn(ResourceNames.profile);

    ac.grant(RoleNames.supervisor)
    .extend(RoleNames.basic)
    .readAny(ResourceNames.profile)

    ac.grant(RoleNames.admin)
    .extend(RoleNames.basic)
    .extend(RoleNames.supervisor)
    .updateAny(ResourceNames.profile)
    .deleteAny(ResourceNames.profile)

    return ac;
})();