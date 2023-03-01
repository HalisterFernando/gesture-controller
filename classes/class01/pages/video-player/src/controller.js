export default class Controller {
    #view
    #service
    #worker
    constructor({view, service, worker}) {
        this.#view = view
        this.#service = service
        this.#worker = this.#configureWorker(worker)
        this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
    }

    static async initialze(deps) {
        console.log('olá')
        const controller = new Controller(deps);
        controller.log('not yet detect eye blink!, click on the button to start!')
        return controller.init()
    }

    #configureWorker(worker) {
        worker.onmessage = (msg) => {

            if ('READY' === data.msg) {
                this.#view.enableButton()
                return;
            }
            console.log('recebi')
        }



        return worker
    }

    async init() {
        console.log('init')
    }

    log(text) {
        this.#view.log(`logger: ${text}`)
    }

    onBtnStart() {
        this.log('initializing detection...')
    }
}