const Joi = require("joi");

const Subscription = require("../models/subscription");
const ValidationError = require("../../errors/validation-error");

"use strict"

let validators = {
    "Subscription": {
        scopes: {
            default: Subscription.SubscriptionValidationSchema
        }
    }
}

function scopeExists(validator, scope) {
    return Object.keys(validator.scopes).find(key => key === scope) != undefined;
}

//scopeExists(validators.Subscription, "default"); //--->true
//scopeExists(validators.Subscription, "update"); //--->false

function getSchema(model, scope) {
    let validator = validators[model];
    if (!validator) {
        throw new Error("validator does nor exist");
    }
    if (validator.scopes) {
        if (scope) {
            if (!scopeExists(validator, scope)) {
                throw new Error(`scope ${scope} does not exist in model ${model}`);
            } else {
                return validator.scopes[scope];
            }
        } else {
            return validator.scopes.default;
        }
    } else {
        return validator
    }
}

function validate(model, object, scope) {
    return Joi.validate(object, getSchema(model, scope), {
        allowUnknown: true
    })

}

module.exports = function ValidationMiddleware(model, scope) {
    return (req, res, next) => {
        const validationResult = validate(model, req.body, scope);
        if (validationResult.error) {
            throw new ValidationError(validationResult.error.message, model)
        } else {
            next()
        }
    }
}
