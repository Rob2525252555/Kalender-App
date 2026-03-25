import { postTask } from "../../api/tasks.api.js";

const taskEvents = {

    handleSubmitTaskForm(e){
        postTask(e);    
    }
}

export default taskEvents;