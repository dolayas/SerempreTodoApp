import { Observable } from "rxjs"
import { FromEventTarget } from "rxjs/internal/observable/fromEvent"

declare module "rxjs"
{
    function fromEvent<K extends keyof WindowEventMap>(
        target : FromEventTarget<WindowEventMap[K]>,
        eventName : K
    ) : Observable<WindowEventMap[K]>

    function fromEvent<K extends keyof DocumentEventMap>(
        target : FromEventTarget<DocumentEventMap[K]>,
        eventName : K
    ) : Observable<DocumentEventMap[K]>
}