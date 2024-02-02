const _cpfLimpo = Symbol('cpfLimpo')
class ValidarCpf {
    constructor(cpf) {
        this[_cpfLimpo] = cpf.replace(/\D+/g, '')
    }

    get cpfLimpo() {
        return this[_cpfLimpo]
    }

    valida() {
        if(typeof this[_cpfLimpo] === 'undefined') return false
        if(this[_cpfLimpo].length !== 11 ) return false
        if(this.eSequencia()) return false

        let cpfParcial = this[_cpfLimpo].slice(0, 9)
        const digito1 = ValidarCpf.criaDigito(cpfParcial) //criando o primieiro dígito do cpf
        cpfParcial += digito1
        const digito2 = ValidarCpf.criaDigito(cpfParcial) //criando o segundo dígito do cpf
        
        const cpfGerado = cpfParcial + digito2
        
        if(cpfGerado !== this[_cpfLimpo]) return false

        return true
    }

    static criaDigito(cpfParcial) {
        let numeroRegressivo = cpfParcial.length + 1
        let cpfArray = Array.from(cpfParcial)

        const total = cpfArray.reduce(function(acumulador, valor) {
            acumulador += valor * numeroRegressivo
            numeroRegressivo--
            return acumulador
        }, 0)

        let digito = 11 - (total % 11)

        if(digito > 9) return '0'

        return String(digito)
    }

    eSequencia() {
        const numeroRepetido = this[_cpfLimpo][0].repeat(11)
        if(numeroRepetido !== this[_cpfLimpo]) return false
        return true
    }
}

