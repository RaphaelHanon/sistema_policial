const canvas = document.getElementById('grafico-casos');
const ctx = canvas.getContext('2d');

const dados = [
    { rotulo: 'Em andamento', valor: 5, cor: '#1a3c6e' },
    { rotulo: 'Resolvidos', valor: 8, cor: '#107c41' },
    { rotulo: 'Arquivados', valor: 3, cor: '#7a8494' }
];

const margem = 30;
const larguraBarra = 70;
const base = canvas.height - margem;
const maior = Math.max(...dados.map((d) => d.valor));
const escala = (base - margem) / maior;
const espaco = (canvas.width - dados.length * larguraBarra) / (dados.length + 1);

let progresso = 0;

function desenhar() {
    // Canvas não guarda o que foi desenhado: limpa tudo antes de cada quadro
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dados.forEach((item, i) => {
        const x = espaco + i * (larguraBarra + espaco);
        const altura = item.valor * escala * progresso;

        ctx.fillStyle = item.cor;
        ctx.fillRect(x, base - altura, larguraBarra, altura);

        ctx.fillStyle = '#1c2430';
        ctx.font = '14px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.rotulo, x + larguraBarra / 2, canvas.height - 8);
        ctx.fillText(item.valor, x + larguraBarra / 2, base - altura - 6);
    });
}

function animar() {
    progresso = Math.min(progresso + 0.03, 1);
    desenhar();
    if (progresso < 1) {
        requestAnimationFrame(animar);
    }
}

// Quem prefere menos movimento recebe o gráfico já pronto
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progresso = 1;
    desenhar();
} else {
    animar();
}
