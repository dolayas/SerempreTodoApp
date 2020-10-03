import { Epic } from "redux-observable"
import { filter, map, mapTo, mergeMap } from "rxjs/operators"

import { TasksService } from "@app/features/tasks/services"

import { AddTask, LoadTasks, LoadTasksSuccess, RemoveTask, UpdateTask } from "./tasks.actions"

const loadTasks : Epic = (actions) =>
    actions
        .pipe (
            filter (LoadTasks.match),
            mergeMap (() =>
                TasksService
                    .getTasks ()
                    .pipe (map (LoadTasksSuccess)))
        )

const addTask : Epic = (actions) =>
    actions
        .pipe (
            filter (AddTask.match),
            mergeMap (({ payload }) =>
                TasksService
                    .createTask (payload)
                    .pipe (mapTo (LoadTasks ())))
        )

const updateTask : Epic = (actions) =>
    actions
        .pipe (
            filter (UpdateTask.match),
            mergeMap (({ payload }) =>
                TasksService
                    .updateTask (payload)
                    .pipe (mapTo (LoadTasks ())))
        )

const removeTask : Epic = (actions) =>
    actions
        .pipe (
            filter (RemoveTask.match),
            mergeMap (({ payload }) =>
                TasksService
                    .deleteTask (payload)
                    .pipe (mapTo (LoadTasks ())))
        )

const tasksEffects = [ loadTasks, addTask, updateTask, removeTask ]

export { tasksEffects }