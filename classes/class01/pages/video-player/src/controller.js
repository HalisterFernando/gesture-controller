export default class Controller {
    constructor() {

    }

    static async initialze(deps) {
        const controller = new Controller(deps);
        return controller.init()
    }

    async init() {
        console.log('init')
    }
}