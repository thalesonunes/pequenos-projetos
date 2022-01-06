class Display {
    constructor(displayValorAnterior, displayValorAtual) {
        this.displayValorAtual = displayValorAtual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculadora = new Calculadora();
        this.tipoOperacao = undefined;
        this.valorAtual = '';
        this.valorAnterior = '';
        this.sinais = {
            somar : "+",
            subtrair : "-",
            multiplicar : "x",
            dividir : "/",
        };
    }

    apagarCaractere(){
        this.valorAtual = this.valorAtual.toString().slice(0, -1);
        this.imprimirValores();
    }

    limparDisplay(){
        this.valorAtual = "";
        this.valorAnterior = "";
        this.tipoOperacao = undefined;
        this.imprimirValores();
    }

    computar(tipo){
        this.tipoOperacao !== "igual" && this.calcular();
        this.tipoOperacao = tipo;
        this.valorAnterior = this.valorAtual || this.valorAnterior;
        this.valorAtual = "";
        this.imprimirValores();
    }

    agregarNumero(numero) {
        // tratando a questão do ponto
        // só se pode ter um unico ponto
        if(numero === '.' && this.valorAtual.includes('.')){
            return
        }else{
            this.valorAtual = this.valorAtual.toString() + numero.toString();
            this.imprimirValores();
        }       
    }

    imprimirValores() {
        this.displayValorAtual.textContent = this.valorAtual;
        // usando sintaxe de interpolação com variável
        // e se a varial não existir será passado o valor vazio 
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.sinais[this.tipoOperacao] || ''}`; 
    }

    calcular(){
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorAtual = parseFloat(this.valorAtual);

        if(isNaN(valorAtual) || isNaN(valorAnterior)) return // se for NaN o método é quebrado

        this.valorAtual = this.calculadora[this.tipoOperacao](valorAnterior, valorAtual)
    }
}