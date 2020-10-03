import { useEffect, useRef } from "react"
import { Subscription } from "rxjs"

import { SubscriptionController } from "./subscription-controller"

const useSubscription = (unsubscribe : VoidFunction) : SubscriptionController =>
{
    const subscriptionRef = useRef (new Subscription (unsubscribe))

    useEffect (() =>
    {
        const { current } = subscriptionRef

        return () => current.unsubscribe ()
    }, [])

    return SubscriptionController (subscriptionRef.current)
}

export { useSubscription }