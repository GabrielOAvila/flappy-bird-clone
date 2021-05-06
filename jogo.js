console.log('Flappy Bird - Gabriel Avila');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoFundo = {
	spriteX: 390,
	spriteY: 0,
	largura: 275,
	altura: 204,
	x: 0,
	y: canvas.height - 204,
	desenha() {
		contexto.fillStyle = '#70c5ce';
		contexto.fillRect(0,0, canvas.width, canvas.height);
		
		contexto.drawImage(
			sprites,
			planoFundo.spriteX, planoFundo.spriteY,
			planoFundo.largura, planoFundo.altura,
			planoFundo.x, planoFundo.y,
			planoFundo.largura, planoFundo.altura
		)
		contexto.drawImage(
			sprites,
			planoFundo.spriteX, planoFundo.spriteY,
			planoFundo.largura, planoFundo.altura,
			(planoFundo.x + planoFundo.largura), planoFundo.y,
			planoFundo.largura, planoFundo.altura
		)
	}
};

const chao = {
	spriteX: 0,
	spriteY: 610,
	largura: 224,
	altura: 112,
	x: 0,
	y: canvas.height - 112,
	desenha() {
		contexto.drawImage(
			sprites,
			chao.spriteX, chao.spriteY,
			chao.largura, chao.altura,
			chao.x, chao.y,
			chao.largura, chao.altura
		);
		contexto.drawImage(
			sprites,
			chao.spriteX, chao.spriteY,
			chao.largura, chao.altura,
			(chao.x + chao.largura), chao.y,
			chao.largura, chao.altura
		);
	}
};

const passaro = {
	spriteX: 0,
	spriteY: 0,
	largura: 33,
	altura: 24,
	x: 10,
	y: 50,
	gravidade: 0.25,
	velocidade: 0,
	atualiza() {
		passaro.velocidade = passaro.velocidade + passaro.gravidade;
		passaro.y = passaro.y + passaro.velocidade;
	},
	desenha() {
		contexto.drawImage(
			sprites,
			passaro.spriteX, passaro.spriteY, // SpriteX, SpriteY
			passaro.largura, passaro.altura, // Tamanho do corte na sprites
			passaro.x, passaro.y, // Posicionamento no canvas
			passaro.largura, passaro.altura // Tamanho dentro do canvas
		);
	}
};

// Mensagem de Get Ready
const mensagemPronto = {
	sX: 134,
	sY: 0,
	w: 174,
	h: 152,
	x: (canvas.width / 2) - 174 / 2,
	y: 50,
	desenha() {
		contexto.drawImage(
			sprites,
			mensagemPronto.sX, mensagemPronto.sY,
			mensagemPronto.w, mensagemPronto.h,
			mensagemPronto.x, mensagemPronto.y,
			mensagemPronto.w, mensagemPronto.h
		);
	}
};

// Telas
let telaAtiva = {};
function mudaParaTela(novaTela) {
	telaAtiva = novaTela;
};

const Telas = {
	INICIO: {
		desenha() {
			planoFundo.desenha();
			chao.desenha();
			passaro.desenha();
			mensagemPronto.desenha();
		},
		atualiza() {
		},
		click() {
			mudaParaTela(Telas.JOGO);
		}
	},
	JOGO: {
		desenha() {
			planoFundo.desenha();
			chao.desenha();
			passaro.desenha();
		},
		atualiza() {
			passaro.atualiza();
		}
	}
};

Telas.JOGO = {
	desenha() {
		planoFundo.desenha();
		chao.desenha();
		passaro.desenha();
	},
	atualiza() {
		passaro.atualiza();
	}
};

function animacao() {
	telaAtiva.desenha();
	telaAtiva.atualiza();

	requestAnimationFrame(animacao);
};

window.addEventListener('click', function() {
	if(telaAtiva.click) {
		telaAtiva.click();
	}
});

mudaParaTela(Telas.INICIO);
animacao();