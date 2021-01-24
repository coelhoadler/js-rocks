// IIFE
(() => {

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
                this.disableResetButton(false)
            }
        }

        prepareButton(elButton$$, initFn) {
            console.log(elButton$$, initFn)
            elButton$$.addEventListener('click', initFn);
            return (valor = true) => {
                const attr = 'disabled'
                if (valor) {
                    elButton$$.setAttribute(attr, valor);
                    return;
                }

                elButton$$.removeAttribute(attr);
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

            {
                const elButton$$ = document.getElementById(RESET_BTN)
                const disableResetButton = this.prepareButton(elButton$$, () => this.init())
                disableResetButton()

                const args = { counterEl$$, intervalID }
                counter.efetuarParada = this.stopCounter.apply({ disableResetButton }, [args])
            }

        }

    }

    window.Counter = Counter

})()