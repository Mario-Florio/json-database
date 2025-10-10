import LogTaskDispatcher from './LogTaskDispatcher.js';
import LogTask from './logTasks/LogTask.js';
import { Operation, isSubclassOf, must } from './imports.js';

const targets = {
    OPERATION: 'operation',
    LOG_TASK: 'logTask',
};

const queryOps = {
    $eq: '$eq',
    $ne: '$ne',
};

const types = {
    OPERATION_TYPES: Operation.types,
    LOG_TASK_TYPES: LogTaskDispatcher.logTasks,
};

class PolicyParams {
    static get targets() {
        return targets;
    }

    static get queryOp() {
        return queryOps;
    }

    static get types() {
        return types;
    }

    constructor(target, queryOp, type) {
        if (!Object.values(targets).includes(target))
            throw new Error(
                'target must be a valid target (see src/adapters/services/logging/FilterPolicies.js, line 8: targets or FilterPolicies.PolicyParams.targets)',
            );
        if (!Object.values(queryOps).includes(queryOp))
            throw new Error(
                'queryOp must be a valid queryOp (see src/adapters/services/logging/FilterPolicies.js, line 13: queryOps or FilterPolicies.PolicyParams.queryOps)',
            );
        if (
            !Object.values(types.LOG_TASK_TYPES).includes(type) ||
            !Object.values(types.OPERATION_TYPES)
        )
            throw new Error(
                'type must be a valid type (see src/adapters/services/logging/FilterPolicies.js, line 18: types or FilterPolicies.PolicyParams.types)',
            );

        this.target = target;
        this.queryOp = queryOp;
        this.type = type;
    }
}

class FilterPolicies {
    static PolicyParams = PolicyParams;

    #policies = new Map();

    get policies() {
        return this.#policies;
    }

    add(name, policyParams) {
        must(
            policyParams instanceof PolicyParams,
            'Invalid Type – policyParams must be an instance of PolicyParams',
        );

        const policy = new Policy(policyParams);
        this.#policies.set(name, policy);

        return this;
    }

    remove(name) {
        this.#policies.remove(name);
        return this;
    }
}

class Policy {
    static #queryOps = {
        [queryOps.$eq]: (a, b) => a === b,
        [queryOps.$ne]: (a, b) => a !== b,
    };

    constructor(policyParams) {
        must(
            Object.values(queryOps).includes(policyParams.queryOp),
            `Invalid Type – ${policyParams.queryOp} is not a valid queryOp`,
        );
        if (policyParams.target === targets.LOG_TASK_TYPES) {
            must(
                Object.values(LogTaskDispatcher.logTasks).includes(
                    policyParams.type,
                ),
                `Invalid Type – ${policyParams.type} is not a valid logTask`,
            );
        }
        if (policyParams.target === targets.OPERATION) {
            must(
                Object.values(Operation.TYPES).includes(policyParams.type),
                `Invalid Type – ${policyParams.type} is not a valid type of Operation`,
            );
        }

        this.target = policyParams.target;
        this.queryOp = policyParams.queryOp;
        this.type = policyParams.type;
    }

    check(logTask, operation) {
        must(
            isSubclassOf(logTask, LogTask),
            'Invalid Type – logTask must be an instance of LogTask',
        );
        must(
            operation instanceof Operation,
            'Invalid Type – operation must be an instance of Operation',
        );

        const arg = this.target === 'logTask' ? logTask : operation.type;
        return Policy.#queryOps[this.queryOp](arg, this.type);
    }
}

export default FilterPolicies;
