const RESET_BTN = 'reset'
const COUNTER_ID = 'counter'
const COUNTER_VALUE = 100
const INTERVAL_PERIOD = 10

class Counter {

    constructor() {
        this.init();
    }

    createProxy() {
        const handler = {
            set: (currentContext, propKey, newValue) => {

                if (currentContext['valor'] <= 0) {
                    currentContext.efetuarParada()
                }

                currentContext[propKey] = newValue
                return true
            }
        };

        const counter = new Proxy({
            valor: COUNTER_VALUE,
            efetuarParada: () => { }
        }, handler);

        return counter
    }

    updateText = ({ counterEl$$, counter }) => () => {
        const textId = '$$counter'
        const defalutText = `Startind in <strong>${textId}</strong> seconds`
        counterEl$$.innerHTML = defalutText.replace(textId, counter.valor--)
    }

    stopCounter({ counterEl$$, intervalID }) {
        return () => {
            clearInterval(intervalID);
            counterEl$$.innerHTML = '';
            this.disableButton()
        }
    }

    init() {
        const counterEl$$ = document.getElementById(COUNTER_ID)

        const counter = this.createProxy()
        const args = {
            counterEl$$,
            counter
        }

        const fn = this.updateText(args)
        const intervalID = setInterval(fn, INTERVAL_PERIOD)
        const disableButton = () => {
            document.getElementById(RESET_BTN).disabled = true
        }

        {
            const args = { counterEl$$, intervalID }
            counter.efetuarParada = this.stopCounter.apply({ disableButton }, [args])
        }

    }

}