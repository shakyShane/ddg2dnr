const assert = require('assert')

const {
    SMARTER_ENCRYPTION_PRIORITY
} = require('../lib/smarterEncryption')

const {
    AMP_PROTECTION_PRIORITY
} = require('../lib/ampProtection')

const {
    GPC_HEADER_PRIORITY
} = require('../lib/gpc')

const {
    TRACKING_PARAM_PRIORITY
} = require('../lib/trackingParams')

const {
    BASELINE_PRIORITY: TRACKER_BLOCKING_BASELINE_PRIORITY,
    CEILING_PRIORITY: TRACKER_BLOCKING_CEILING_PRIORITY
} = require('../lib/tds')

const {
    COOKIE_PRIORITY
} = require('../lib/cookies')

const {
    BASELINE_PRIORITY: TRACKER_ALLOWLIST_BASELINE_PRIORITY,
    CEILING_PRIORITY: TRACKER_ALLOWLIST_CEILING_PRIORITY
} = require('../lib/trackerAllowlist')

const {
    CONTENT_BLOCKING_ALLOWLIST_PRIORITY,
    UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY
} = require('../lib/temporaryAllowlist')

const {
    AD_ATTRIBUTION_POLICY_PRIORITY,
    SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY,
    USER_ALLOWLISTED_PRIORITY,
    ATB_PARAM_PRIORITY
} = require('../lib/rulePriorities')

describe('Rule Priorities', () => {
    it('should have an up to date overview of all rule priorities', () => {
        assert.equal(SMARTER_ENCRYPTION_PRIORITY, 5000)
        assert.equal(TRACKER_BLOCKING_BASELINE_PRIORITY, 10000)
        assert.equal(TRACKER_BLOCKING_CEILING_PRIORITY, 19999)
        assert.equal(TRACKER_ALLOWLIST_BASELINE_PRIORITY, 20000)
        assert.equal(TRACKER_ALLOWLIST_CEILING_PRIORITY, 20100)
        assert.equal(AD_ATTRIBUTION_POLICY_PRIORITY, 30000)
        assert.equal(CONTENT_BLOCKING_ALLOWLIST_PRIORITY, 30000)
        assert.equal(AMP_PROTECTION_PRIORITY, 40000)
        assert.equal(GPC_HEADER_PRIORITY, 40000)
        assert.equal(TRACKING_PARAM_PRIORITY, 40000)
        assert.equal(COOKIE_PRIORITY, 40000)
        assert.equal(UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY, 1000000)
        assert.equal(SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY, 1000000)
        assert.equal(USER_ALLOWLISTED_PRIORITY, 1000000)
        assert.equal(ATB_PARAM_PRIORITY, 2000000)
    })

    it('should have the correct relative rule priorities', () => {
        // ATB is higher than allowlist
        assert.ok(ATB_PARAM_PRIORITY > UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY)
        assert.ok(ATB_PARAM_PRIORITY > USER_ALLOWLISTED_PRIORITY)
        assert.ok(ATB_PARAM_PRIORITY > SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY)

        // Ceiling priorities should always be higher than baseline.
        assert.ok(TRACKER_BLOCKING_BASELINE_PRIORITY < TRACKER_BLOCKING_CEILING_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_BASELINE_PRIORITY < TRACKER_ALLOWLIST_CEILING_PRIORITY)

        // Smarter encryption is lower priority than all other rules.
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < TRACKER_BLOCKING_CEILING_PRIORITY)
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < TRACKER_ALLOWLIST_CEILING_PRIORITY)
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < AD_ATTRIBUTION_POLICY_PRIORITY)
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < CONTENT_BLOCKING_ALLOWLIST_PRIORITY)
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < GPC_HEADER_PRIORITY)
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < TRACKING_PARAM_PRIORITY)
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY)
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY)
        assert.ok(SMARTER_ENCRYPTION_PRIORITY < USER_ALLOWLISTED_PRIORITY)

        // Tracker allowlist should take priority over tracker blocking and smarter encryption, but not
        // other features/allowlists.
        assert.ok(TRACKER_ALLOWLIST_BASELINE_PRIORITY > SMARTER_ENCRYPTION_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_BASELINE_PRIORITY > TRACKER_BLOCKING_CEILING_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_CEILING_PRIORITY < AD_ATTRIBUTION_POLICY_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_CEILING_PRIORITY < CONTENT_BLOCKING_ALLOWLIST_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_CEILING_PRIORITY < GPC_HEADER_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_CEILING_PRIORITY < TRACKING_PARAM_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_CEILING_PRIORITY < UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_CEILING_PRIORITY < SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY)
        assert.ok(TRACKER_ALLOWLIST_CEILING_PRIORITY < USER_ALLOWLISTED_PRIORITY)

        // Ad attribution allowlisting and the contentBlocking allowlist should
        // take priority over tracker blocking, the tracker allowlist and smarter encryption, but
        // not other features/allowlists.
        assert.ok(AD_ATTRIBUTION_POLICY_PRIORITY > SMARTER_ENCRYPTION_PRIORITY)
        assert.equal(AD_ATTRIBUTION_POLICY_PRIORITY, CONTENT_BLOCKING_ALLOWLIST_PRIORITY)
        assert.ok(AD_ATTRIBUTION_POLICY_PRIORITY > TRACKER_BLOCKING_CEILING_PRIORITY)
        assert.ok(AD_ATTRIBUTION_POLICY_PRIORITY > TRACKER_ALLOWLIST_CEILING_PRIORITY)
        assert.ok(AD_ATTRIBUTION_POLICY_PRIORITY < GPC_HEADER_PRIORITY)
        assert.ok(AD_ATTRIBUTION_POLICY_PRIORITY < TRACKING_PARAM_PRIORITY)
        assert.ok(AD_ATTRIBUTION_POLICY_PRIORITY < UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY)
        assert.ok(AD_ATTRIBUTION_POLICY_PRIORITY < SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY)
        assert.ok(AD_ATTRIBUTION_POLICY_PRIORITY < USER_ALLOWLISTED_PRIORITY)

        // Tracking parameter protection, AMP protection  and GPC should take
        // priority overtracker blocking, the tracker allowlist, smarter encryption and the
        // contentBlocking allowlist, but not over the other features/allowlists.
        assert.ok(TRACKING_PARAM_PRIORITY > SMARTER_ENCRYPTION_PRIORITY)
        assert.equal(TRACKING_PARAM_PRIORITY, AMP_PROTECTION_PRIORITY)
        assert.equal(TRACKING_PARAM_PRIORITY, GPC_HEADER_PRIORITY)
        assert.ok(TRACKING_PARAM_PRIORITY > TRACKER_BLOCKING_CEILING_PRIORITY)
        assert.ok(TRACKING_PARAM_PRIORITY > TRACKER_ALLOWLIST_CEILING_PRIORITY)
        assert.ok(TRACKING_PARAM_PRIORITY > CONTENT_BLOCKING_ALLOWLIST_PRIORITY)
        assert.ok(TRACKING_PARAM_PRIORITY < UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY)
        assert.ok(TRACKING_PARAM_PRIORITY < SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY)
        assert.ok(TRACKING_PARAM_PRIORITY < USER_ALLOWLISTED_PRIORITY)

        // The unprotectedTemporary allowlist, exception for ServiceWorker
        // initiated requests and the user allowlist should take priority over
        // everything else.
        assert.equal(UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY, SERVICE_WORKER_INITIATED_ALLOWING_PRIORITY)
        assert.equal(UNPROTECTED_TEMPORARY_ALLOWLIST_PRIORITY, USER_ALLOWLISTED_PRIORITY)
        assert.ok(USER_ALLOWLISTED_PRIORITY > TRACKER_BLOCKING_CEILING_PRIORITY)
        assert.ok(USER_ALLOWLISTED_PRIORITY > TRACKER_ALLOWLIST_CEILING_PRIORITY)
        assert.ok(USER_ALLOWLISTED_PRIORITY > AD_ATTRIBUTION_POLICY_PRIORITY)
        assert.ok(USER_ALLOWLISTED_PRIORITY > CONTENT_BLOCKING_ALLOWLIST_PRIORITY)
        assert.ok(USER_ALLOWLISTED_PRIORITY > GPC_HEADER_PRIORITY)
        assert.ok(USER_ALLOWLISTED_PRIORITY > TRACKING_PARAM_PRIORITY)
        assert.ok(USER_ALLOWLISTED_PRIORITY > SMARTER_ENCRYPTION_PRIORITY)

        // Cookie blocking should have higher priority than tracker allowlist
        // rules, so the allowlist rules do not prevent cookie blocking.
        assert.ok(COOKIE_PRIORITY > TRACKER_ALLOWLIST_CEILING_PRIORITY)
    })
})
