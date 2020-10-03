import { Subscription, TeardownLogic } from "rxjs"

interface SubscriptionController
{
    readonly push : (teardown : TeardownLogic) => SubscriptionController

    readonly remove : (teardown : Subscription) => void

    readonly unsubscribe : () => void
}

const SubscriptionController = (subscription : Subscription) : SubscriptionController =>
    ({
        push : teardown => SubscriptionController (subscription.add (teardown)),
        remove : teardown => subscription.remove (teardown),
        unsubscribe : () => subscription.unsubscribe ()
    })

export { SubscriptionController }