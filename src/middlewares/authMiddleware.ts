import Roles from '../roles';
import { Response, NextFunction } from 'express';
import { CustomRequestObject } from 'models/custom-request-object';
import { Permission } from 'accesscontrol';

export const checkAccess = function (permission: Permission) {
    return (req: CustomRequestObject, res: Response, next: NextFunction) => {
        try {
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have permission to perform this action"
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

export const allowIfLoggedIn = (req: CustomRequestObject, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user) {
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        next (error);
    }
}