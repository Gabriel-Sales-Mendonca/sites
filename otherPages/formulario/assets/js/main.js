class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.inputs = Array.from(document.querySelector('.formulario').querySelectorAll('input'))

        this.eventos()
    }

    eventos() { // Cuida do disparo do evento de submit para enviar o formulário
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        e.preventDefault() // Evita com que o formulário seja enviado antes de ser feita a verificação
        const camposValidos = this.camposValidos()

        if(camposValidos) {
            alert('Formulário enviado.')
            this.formulario.submit()
        }
    }

    camposValidos() { // Valida todos os campos, se todos estão dentro das regras e retorna true caso esteja tudo certo
        let valido = true
        
        for(let erro of document.querySelectorAll('.erros')) { // Remove os erros exibidos antes de clicar em enviar
            erro.remove()
        }

        for(let input of this.inputs) { // Faz a iteração emcima de cada campo do formulário, ou seja cada input

            let label = input.previousElementSibling.innerText
            if(!input.value.trim()) { // Verifica os campos que estão vazios
                this.criaErro(input, `O campo "${label}" não pode estar em branco.`)
                valido = false
            }

            if(input.classList.contains('cpf')) { // Verifica se o CPF é valido
                if(!this.validaCpf(input)) valido = false
            }

            if(input.classList.contains('usuario')) { // Verifica os requisitos do campo usuário
                if(!this.validaUsuario(input)) valido = false
            }

            if(input.classList.contains('senha') || input.classList.contains('repetir-senha')) {
                if(input.value.length < 6 || input.value.length > 12) {
                    this.criaErro(input, 'Senha precisa ter entre 6 a 12 caracteres.')
                    valido = false
                }
            }

            if(input.classList.contains('senha') || input.classList.contains('repetir-senha')) {

                const senha = document.querySelector('.senha')
                const repetirSenha = document.querySelector('.repetir-senha')

                if(senha.value !== repetirSenha.value) {
                    this.criaErro(input, 'Os campos "Senha" e "Repetir a senha" devem ser iguais.')
                    valido = false
                }
            }
        }

        return valido
    }

    criaErro(campo, mensagem) { // Exibe os erros na tela em baixo dos inputs
        let erro = document.createElement('p')
        erro.innerText = mensagem
        erro.classList.add('erros')

        campo.insertAdjacentElement('afterend', erro)
    }

    validaCpf(campo) {
        const cpf = new ValidarCpf(campo.value)

        if(!cpf.valida()) {
            this.criaErro(campo, 'Cpf inválido')
            return false
        }
        return true
    }

    validaUsuario(campo) {
        let valido = true

        if(!campo.value.match(/^[a-zA-Z0-9]+/g)) {
            this.criaErro(campo, 'Usuário só poderá conter letras e/ou números.')
            valido = false
        }

        if(campo.value.length < 3 || campo.value.length > 12) {
            this.criaErro(campo, 'Usuário deverá ter entre 3 a 12 caracteres.')
            valido = false
        }
        return valido
    }
}

const validacao = new ValidaFormulario()