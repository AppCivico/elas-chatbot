module.exports = {
	avatarImage: 'https://www.telegraph.co.uk/content/dam/news/2016/09/08/107667228_beech-tree-NEWS_trans_NvBQzQNjv4BqplGOf-dgG3z4gg9owgQTXEmhb5tXCQRHAvHRWfzHzHk.jpg?imwidth=450',
	getStarted: 'oi sou o bot',
	greetings: {
		text1: 'Olá, <first_name>! Que bom te ver por aqui 🥰',
		text2: 'Sou Donna, a assistente digital da ELAS (Escola de Liderança e Desenvolvimento). Estou aqui para ajudar você aluna ou futura aluna durante seu curso, '
		+ 'te ajudando, tirando dúvidas, lembrando suas tarefas e muito mais 😉',
		text3: 'Escolha uma das opções abaixo pra gente continuar:',
		menuOptions: ['Já sou aluna 😘', 'Quero ser aluna 🤩', 'Sobre ELAS 💁‍♀️'],
		menuPostback: ['jaSouAluna', 'queroSerAluna', 'sobreElas'],
	},
	jaSouAluna: {
		text1: '❤️',
		text2: 'Preciso localizar seu cadastro e saber quem é você, qual turma você está etc.',
		text3: 'Digite seu CPF. Só números, tá bom?',
		gif1: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/dae9dde4-6d85-462f-8ca0-7841d344ec42.gif',
		validCPF: 'Te achei! 🎉 Você está matriculada no Programa ELAS com o nome <name> e está na turma <turma>. Estou certa?',
		invalidCPF1: 'Esse CPF não é válido. Por favor, tente novamente.',
		invalidCPF2: 'Digite só números. Exemplo: 12345678911',
		menuOptions: ['Sim 😎', 'Não 😕'],
		menuPostback: ['confirmaMatricula', 'erradoMatricula'],
	},
	confirmaMatricula: {
		text1: 'Já tenho as informações da sua próxima aula:',
		// text2: '📝 Você está no módulo {módulo} de 3\n🗓️ Acontecerá no sábado dia {dia} e no domingo dia {dia}\n⏰ Das {horas1} às {horas2} '
		// + '\n🏠 Será no {local}. Endereço: {endereço}',
		menuOptions: ['Entendi'],
		menuPostback: ['sendFirst'],
	},
	erradoMatricula: {
		text1: '😳 Sem problemas. Você pode digitar seu CPF novamente ou entrar em contato com ELAS para ver o que houve.',
		menuOptions: ['Digitar Novamente', 'Falar com ELAS'],
		menuPostback: ['jaSouAluna', 'talkToElas'],
	},
	talkToElas: {
		text1: 'Combinado. Segue as informações para você entrar em contato:',
		text2: '📞 Telefones:  (11) 3587-1263 / 3587-1322\n🏠 Endereço: Alameda Santos, 200. Bela Vista, São Paulo - SP',
		text3: 'Quando resolver com ELAS venha conversar comigo novamente. No menu há os serviços que você pode acessar 🤗',
		text4: 'Até lá, que tal compartilhar ELAS para suas amigas?',
	},
	sendFirst: {
		text1: 'Queremos conhecer um pouco mais sobre você  😉 Clique no link abaixo e preencha o formulário.',
		text2: 'É muito importante preencher todas as perguntas. O nosso objetivo é poder te conhecer melhor para oferecer o conteúdo que vá direto ao encontro das suas necessidades. Entender melhor o seu perfil e suas expectativas será importante também para avaliar o resultado final no seu desenvolvimento.',
		cardTitle: 'Atividade 1',
		text3: '⚠️ Agora, um passo importante! ⚠️\nEscolha seus avaliadores, pessoas do seu convívio que podem avaliar o seu comportamento. '
		+ 'Escolha as pessoas cuja relação seja importante e estratégica para o seu desenvolvimento e crescimento.',
		text4: 'Eles responderão um questionário sobre você, um agora antes do curso e outro no fim. Clique no link abaixo para preencher esses dados',
		menuOptions: ['Já sei! Continuar'],
		menuPostback: ['avaliadores1'],
	},
	avaliadores1: {
		text1: 'Beleza 😀\n*Ah, é legal avisá-los sobre!',
		text2: 'Clique no link abaixo e preencha o formulário',
		cardTitle: 'Avaliadores',

	},
	shareElas: {
		siteTitle: 'Compartilhar',
		// siteSubTitle: '',
		// imageURL: '',
		siteURL: 'https://www.facebook.com/Elas-homol-287066982237234/',
	},
	queroSerAluna: {
		text1: 'Uau!! Então vamos lá, vou enviar o que ELAS oferece 😉 Lá vai textão ...',
		text2: 'Espero que você venha aqui novamente me contando que é aluna do ELAS, hein.',
		text3: 'Enquanto isso, no menu há os serviços que você pode acessar 🤗',
		cards: [
			{
				text: 'Programa ELAS:\nÉ um treinamento intensivo de 54 horas, um programa completo de aprendizado ao longo de 3 meses. Além dos conteúdos, as alunas são mentoradas durante todo o período por meio de uma comunidade secreta exclusiva para elas. O conteúdo é extremamente prático e vivencial, dividido em 3 módulos, dentro de um ambiente exclusivo e seguro para COMPARTILHAR INFORMAÇÕES e para PROMOVER UMA EXPERIÊNCIA MEMORÁVEL no desenvolvimento comportamental das alunas.',
				url: 'https://programaelas.com.br/programa-elas/',
			},
			{
				text: 'Imersão em Autoconfiança: \nO treinamento de 6 horas tem como objetivo levar informações sobre a participação de mulheres em altos cargos de liderança, bem como gerar profunda reflexão nas participantes para mergulharem em seu autoconhecimento e terem um despertar para a autoconfiança, se desafiarem a crescer, assumindo uma posição de destaque profissional.',
				url: 'https://programaelas.com.br/imersao-autoconfianca/',
			},
			{
				text: 'Imersão em Influência:\nO treinamento de 6 horas tem como objetivo sensibilizar as mulheres quanto a sua capacidade de gerar influência e assertividade em sua comunicação, bem como estimular ações efetivas que permitam uma postura com mais segurança para exercer autoridade com empatia.',
				url: 'https://programaelas.com.br/imersao-influencia/',
			},
			{
				text: 'Workshop: Exercendo seu poder de Influência e Autoridade:\nO Workshop “Exercendo o Seu Poder de Influência e Autoridade” é uma vivência de 2h30 focada em despertar a consciência de como podemos nos comunicar melhor e gerar mais influência no ambiente de trabalho e em outros contextos de vida.O objetivo é gerar um desconforto positivo para que cada participante possa aplicar imediatamente o que vai aprender e já obter resultados diferentes no seu dia-a-dia.',
				url: 'https://programaelas.com.br/workshop-influencia-e-autoridade/',
			},
			{
				text: 'Workshop: Autoconfiança para Conquistar o Mundo:\nO Workshop “Autoconfiança para Conquistar o Mundo” é uma vivência de 2h30 que mexe com as pessoas.O objetivo é gerar reflexões importantes e aumentar o poder pessoal das participantes.Mais de 3300 mulheres já vivenciaram essa experiência e tiveram resultados importantes em suas vidas.',
				url: 'https://programaelas.com.br/workshop-autoconfianca/',
			},
			{
				text: 'Para empresas:\nCom o objetivo de oferecer ao grupo de colaboradoras de empresas uma formação completa capaz de desenvolver a autoconfiança para assumirem posições de liderança, tivemos treinamentos de sucessos em grandes empresas.',
				url: 'https://programaelas.com.br/lideranca-feminina-nas-empresas/casos-de-sucesso/',
			},
		],
	},
	sobreElas: {
		text1: 'Adoro contar sobre o Programa ELAS 😍',
		text2: 'Uma empresa focada no desenvolvimento pessoal de mulheres que desejam assumir posições de destaque nas empresas, em seus negócios ou na sociedade, '
		+ 'tendo clareza das suas potencialidades, objetivos e se permitindo ser quem verdadeiramente é.',
		text3: 'Você pode saber no nosso site: https://programaelas.com.br/quem-somos/',
		gif1: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/d9391ccd-7c7b-43c4-89cc-203ecb7b285a.gif',
		menuOptions: ['Já sou aluna 😘', 'Quero ser aluna 🤩'],
		menuPostback: ['jaSouAluna', 'queroSerAluna'],
	},
	issueText: {
		success: 'Obrigado por sua mensagem',
		failure: 'Não consegui salvar a mensagem',
	},
	eMail: {
		atividade1: {
			assunto: 'Obrigada por sua compra! - Programa ELAS',
			texto: 'mail_template/ELAS_Matricula.html',
		},
		depoisMatricula: {
			assunto: 'Matrícula Confirmada. Conheça a Donna! - Programa ELAS',
			texto: 'mail_template/ELAS_Apresentar_Donna.html',
		},
	},
	Atividade2: {
		text1: 'Para garantir a melhor experiência possível, é importante que você complete as 3 atividades prévias até [MOD1_15DIAS], ok? Abaixo seguem essas atividades:',
		text2: 'A atividade 3, você receberá no [MOD1_2DIAS]. Imprima e leve para receber uma devolutiva no primeiro módulo 😉\n\nMãos à obra e prepare-se para uma grande jornada!!',
		menuOptions: ['Ok'],
		menuPostback: ['mainMenu'],
		cards: [
			{
				title: 'ATIVIDADE 1 - RELAÇÃO DE AVALIADORES',
				subtitle: 'Como as pessoas te avaliam? Indique no mín. 4 pessoas do seu convívio.',
				image_url: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/8619ef7a-f963-415b-a14d-491382fc11fc.jpg',
				url: process.env.INDICACAO360_LINK,
			},
			{
				title: 'ATIVIDADE 2 - SONDAGEM DE FOCO',
				subtitle: 'Sobre a sua evolução pessoal, algo que mediremos no final do programa.',
				image_url: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/c8cc8280-7c73-4caf-a07c-2a84bdd4bb93.jpg',
				url: process.env.SONDAGEM_PRE_LINK,
			},
			{
				title: 'ATIVIDADE 3 - INVENTÁRIO COMPORTAMENTAL',
				subtitle: '"Descobrir" o seu potencial e suas habilidades.Preencha em um momento calmo.',
				image_url: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/9f6a19c4-571b-429f-b628-8ef4cedda1a9.jpg',
				url: process.env.DISC_LINK1,
			},
		],
	},
	mail6pt2: {
		text1: `Escolha uma situação, que numa escala de desconforto de 1 a 10, tenha uma nota média  3 ou 4. É importante pensar nesta escala e se assegurar que neste cenário você tenha ficado um pouco desconfortável. Evite situações traumáticas onde o seu emocional ficou abalado.
	\nEssa cena pode ter acontecido com um chefe, um colega de trabalho, alguém mais íntimo, enfim. Você deve descrever a história exata que te promoveu o desconforto e porque essa situação não foi bem resolvida da forma que você almejava. Simplesmente descreva a história em um papel. Você deverá trazê-la em sala de aula para discutirmos no Módulo 2.
	\nAgora vamos para a segunda parte da atividade, beleza?`,
		menuOptions: ['Vamos!'],
		menuPostback: ['mail6pt3'],
	},
	mail6pt3: {
		text1: 'Após escrever a história, você deve ler o texto. Clique no link abaixo e leia atentamente, faça suas observações e leve-as para a sala de aula. \n<LINK_ANEXO>',
		menuOptions: ['Ok'],
		menuPostback: ['mainMenu'],
	},
};
