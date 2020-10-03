import { from, Observable } from "rxjs"
import { map, mergeMap, toArray } from "rxjs/operators"

const filesToBase64 = (files : FileList) : Observable<Array<[File, string]>> =>
    from (files)
        .pipe (
            map (file => new Observable<[ File, string ]> (observer =>
            {
                const fileReader = new FileReader ()

                fileReader.readAsDataURL (file)

                fileReader.addEventListener ("load", () => observer.next ([ file, fileReader.result as string ]))

                fileReader.addEventListener ("error", error => observer.error (error))

                fileReader.addEventListener ("loadend", () => observer.complete ())
            }))
        )
        .pipe (mergeMap (xs => xs))
        .pipe (toArray ())

export { filesToBase64 }