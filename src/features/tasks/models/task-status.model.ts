type Completed = "Completed"

type NotStarted = "NotStarted"

type TaskStatus = Completed | NotStarted

const Completed : TaskStatus = "Completed"

const NotStarted : TaskStatus = "NotStarted"

const TaskStatus =
{
    Completed,
    NotStarted
}

export { TaskStatus }