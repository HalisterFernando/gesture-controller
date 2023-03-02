export default class Controller {
    #view
    #camera 
    #worker
    #blinkCounter = 0
    constructor({view, worker, camera}) {
        this.#view = view
        this.#service = service
        this.camera = camera
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
        let ready = false
        worker.onmessage = ({data}) => {
            
            if ('READY' === data) {
                this.#view.enableButton()
                ready = true
                return;
            }
            console.log('recebi')
            const blinked = data.blinked
            this.#blinkCounter += blinked
            this.#view.togglePlayVideo()
            console.log('blinked', blinked)
        }




        return {
            send (msg) {
                if (!ready) return;
                worker.postMessage(msg)
            }
        }
    }

    async init() {
        console.log('init')
    }

    log(text) {
        const times = ` - blinked times: ${this.#blinkCounter}`
        this.#view.log(`status: ${text}`.concat(this.#blinkCounter ? times : ''))
    }

    loop() {
        const video = this.#camera.video
        const img = this.#view.getVideoFrame(video)
        this.#worker.send(img)
        this.log('detecting eye blink')

        setTimeout(() => this.loop(), 100)

    }

    onBtnStart() {
        this.log('initializing detection...')
        this.#blinkCounter = 0
    }
}