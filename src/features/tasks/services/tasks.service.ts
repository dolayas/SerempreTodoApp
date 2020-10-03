import { firestore } from "firebase/app"
import { collectionData, docData } from "rxfire/firestore"
import { from } from "rxjs"
import { map } from "rxjs/operators"

import { FirebaseService } from "@app/core/services"
import { Task, TaskInit, Tasks } from "@app/features/tasks/models"

const database = FirebaseService.database ()

const getTasks = () =>
    collectionData<TaskInit> (database.collection ("tasks"), "id")
        .pipe (map (data => Tasks (...data)))

const getTask = (id : string) =>
    docData<TaskInit> (database.collection ("tasks").doc (id))
        .pipe (map (Task))

const createTask = ({ id : _, createdDateTime, dueDate, linkedAttachments, ...task } : Task) =>
    from (
        database
            .collection ("tasks")
            .add ({
                createdDateTime : createdDateTime.toJSON(),
                dueDate : dueDate !== null ? dueDate.toJSON () : dueDate,
                ...task,
            })
    )

const updateTask = ({ id, createdDateTime, dueDate, linkedAttachments, ...task } : Task) =>
    from (
        database
            .collection ("tasks")
            .doc (id)
            .update ({
                createdDateTime : createdDateTime.toJSON(),
                dueDate : dueDate !== null ? dueDate.toJSON () : dueDate,
                linkedAttachments : linkedAttachments.length > 0
                    ? firestore.FieldValue.arrayUnion (...linkedAttachments.map (x => JSON.stringify (x)))
                    : [],
                ...task
            })
    )

const deleteTask = (id : string) =>
    from (
        database
            .collection ("tasks")
            .doc (id)
            .delete ()
    )

const TasksService =
{
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask
}

export { TasksService }