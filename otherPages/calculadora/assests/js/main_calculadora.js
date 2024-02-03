function Calculadora() {

        this.display = document.querySelector('.display');
        this.display.focus();

        this.iniciar = function() {
            this.cliqueBotoes();
            this.pressionaEnter();
            this.pressionaEsc();
        }

        this.pressionaEnter = function() {
            this.display.addEventListener('keyup', function(e) {
                if (e.keyCode === 13) {
                    this.calcula()
                }
            }.bind(this))
        }

        this.pressionaEsc = function() {
            document.addEventListener('keyup', e => {
                if (e.keyCode === 27) {
                    this.limpaDisplay()
                }
            })
        }

        this.cliqueBotoes = function() {
            document.addEventListener('click', function(e) {
                const elemento = e.target;
                const valor = elemento.innerText;
        
                if (elemento.classList.contains('btn-num') || elemento.classList.contains('btn-op')) {
                    this.btnParaDisplay(valor);
                } else if (elemento.classList.contains('btn-clear')) {
                    this.limpaDisplay();
                } else if (elemento.classList.contains('btn-del')) {
                    this.apagaCaracter();
                } else if (elemento.classList.contains('btn-eq')) {
                    this.calcula();
                }

            }.bind(this));
        }

        this.btnParaDisplay = function(valor) {
            this.display.value += valor;
            this.display.focus();
        }

        this.limpaDisplay = function() {
            this.display.value = ''
        }

        this.apagaCaracter = function() {
            this.display.value = this.display.value.slice(0, -1)
        }

        this.calcula = function() {
            const resultado = eval(this.display.value)
            this.display.value = resultado
        }
}


const calculadora = new Calculadora()
calculadora.iniciar()