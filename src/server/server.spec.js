import { addNewTask, updateTask } from "./server";

(async function initS() {
    await addNewTask({
        name: "My task",
        id: '1234321'
    })
    await updateTask({
        id: '1234321',
        name: 'New updated task'

    })
})()


