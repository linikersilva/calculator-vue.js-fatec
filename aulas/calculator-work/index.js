// Importa a função createApp do Vue
const { createApp } = Vue;

// Cria uma instância do aplicativo Vue
createApp({
    // Define os dados do aplicativo
    data() {
        return {
            display: '', // String que representa a expressão exibida na calculadora
            numeroAtual: null, // Número atual digitado pelo usuário
            numeroAnterior: null // Número anterior digitado pelo usuário
        }
    },
    // Define os métodos do aplicativo
    methods: {
        // Método para lidar com cliques em botões da calculadora
        lidarBotao(botao) {
            switch (botao) {
                // Caso o botão seja um operador matemático
                case "*":
                case "-":
                case "+":
                case "/":
                    this.lidarOperador(botao);
                    break;
                // Caso o botão seja um ponto decimal
                case ".":
                    this.lidarDecimal();
                    break;
                // Caso o botão seja o botão de igual
                case "=":
                    this.lidarIgual();
                    break;
                // Caso o botão seja o botão de limpar (AC)
                case "AC":
                    this.lidarClear();
                    break;
                // Caso o botão seja um número
                default:
                    this.lidarNumero(botao);
            }
        },
        // Método para lidar com cliques em operadores matemáticos
        lidarOperador(botao) {
            if (this.display !== '' && this.display !== 'A divisão por zero não é definida') {
                let ultimoCaractere = this.display.slice(-1);
                if (ultimoCaractere !== ' ') {
                    this.numeroAnterior = this.numeroAtual;
                    this.numeroAtual = null;
                    this.display += ' ' + botao + ' ';
                }
            }
        },
        // Método para lidar com cliques no botão decimal
        lidarDecimal() {
            if (this.numeroAtual !== null && !this.numeroAtual.includes('.')) {
                this.numeroAtual += '.';
                if (this.numeroAnterior !== null) {
                    this.display += '.';
                } else {
                    this.display = this.numeroAtual;
                }
            }
        },
        // Método para lidar com cliques no botão de igual
        lidarIgual() {
            if (this.numeroAnterior !== null) {
                let resultado = this.calcularExpressao(this.display);
                if (resultado === Infinity || isNaN(resultado)) {
                    this.display = 'A divisão por zero não é definida';
                } else {
                    this.display = resultado;
                }
                this.clearVariaveisExcetoDisplay();
            }
        },
        /* Método para calcular o resultado de uma expressão matemática
           Usei o eval() sabendo da discussão que existe
           acerca dos riscos e vulnerabilidades de segurança que ele traz,
           além da maior lentidão, no entanto, optei por usar pois ele
           resolveria o cálculo de uma expressão matemática de maneira
           extremamente simples, além de que não se trata de um código
           para um ambiente de produção corporativo, e sim de um exercício
           de faculdade.
         */
        calcularExpressao(expressao) {
            return eval(expressao);
        },
        // Método para lidar com cliques no botão de limpar (AC)
        lidarClear() {
            this.display = '';
            this.clearVariaveisExcetoDisplay();
        },
        // Método para limpar as variáveis, exceto a expressão exibida na tela
        clearVariaveisExcetoDisplay() {
            this.numeroAtual = null;
            this.numeroAnterior = null;
        },
        // Método para lidar com cliques em números
        lidarNumero(botao) {
            if (this.numeroAtual !== null) {
                this.numeroAtual += botao;
            } else {
                this.numeroAtual = botao;
            }
            if (this.numeroAnterior !== null) {
                this.display += botao;
            } else {
                this.display = this.numeroAtual;
            }
        }
    }
}).mount("#app"); // Monta o aplicativo na div com id "app"