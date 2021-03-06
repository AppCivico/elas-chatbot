module.exports = {
	avatarImage: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/88a30bf9-4f94-4bf4-b51e-1f325a6a1000.png',
	getStarted: 'Sou Donna, a assistente digital da ELAS (Escola de Liderança e Desenvolvimento). Converse comigo clicando em Começar!',
	greetings: {
		text1: 'Olá, <first_name>! Que bom te ver por aqui 🥰',
		text1extra: 'Olá! Que bom te ver por aqui 🥰',
		text2: 'Sou Donna, a assistente digital da ELAS (Escola de Liderança e Desenvolvimento). Estou aqui para ajudar você aluna ou futura aluna durante seu curso, '
		+ 'te ajudando, tirando dúvidas, lembrando suas tarefas e muito mais 😉',
		text3: 'Escolha uma das opções abaixo pra gente continuar:',
		menuOptions: ['Já sou aluna 😘', 'Quero ser aluna 🤩', 'Sobre ELAS 💁‍♀️'],
		menuPostback: ['jaSouAluna', 'queroSerAluna', 'sobreElas'],
	},
	mainMenu: {
		defaultText: 'O que deseja fazer?',
		menuOptions: ['Falar com Donna 💻', 'Sobre ELAS 💁‍♀️', 'Troca de Turma 👩‍🏫'],
		menuPostback: ['falarDonna', 'sobreElas', 'trocarTurma'],
	},
	trocarTurma: {
		text1: 'Aqui você poderá pedir para a equipe ELAS te transferir de turma.',
		text2: 'Deseja continuar?',
		text3: 'Tudo bem, um e-mail foi enviado para a equipe avisando da sua transferência.',
		mailSubject: 'ELAS - <NOME> quer trocar de turma!',
		mailText: 'A Aluna <NOME>, atualmente na turma <TURMA>, solicitou uma transferência de turma.\n',
		menuOptions: ['Quero Trocar', 'Voltar'],
		menuPostback: ['queroTrocar', 'mainMenu'],
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
	invalidCPF: {
		text1: 'Esse CPF não é válido. Por favor, tente novamente.',
		text2: 'Digite só números. Exemplo: 12345678911',
		menuOptions: ['Voltar'],
		menuPostback: ['mainMenu'],
	},
	CPFNotFound: {
		text1: 'Ainda não tenho esse CPF! Digite de novo!',
		menuOptions: ['Voltar'],
		menuPostback: ['mainMenu'],
	},
	confirmaMatricula: {
		text1: 'Já tenho as informações da sua próxima aula:',
		after1: 'Por aqui vou te enviar todas as notificações importantes durante o curso, como as atividades pré e pós módulos, etc. Também te lembrarei as datas, horas, locais dos módulos, te enviarei os links importantes das atividades e se quiser bater um papo comigo, responderei o que souber 😍',
		menuOptions: ['Entendi'],
		menuPostback: ['afterConfirma'],
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
	// shareElas: {
	// 	siteTitle: 'Compartilhar',
	// 	// siteSubTitle: '',
	// 	// imageURL: '',
	// 	siteURL: 'https://www.facebook.com/Elas-homol-287066982237234/',
	// },
	queroSerAluna: {
		text1: 'Uau!! Então vamos lá, vou enviar o que ELAS oferece 😉',
		text2: 'Espero que você venha aqui novamente me contando que é aluna do ELAS, hein.',
		text3: 'Enquanto isso, no menu há os serviços que você pode acessar 🤗',
		menuOptions: ['Já sou aluna 😘', 'Sobre ELAS 💁‍♀️'],
		menuPostback: ['jaSouAluna', 'sobreElas'],
		cards: [
			{
				title: 'Programa Elas',
				subtitle: 'Treinamento intensivo de 54 horas, um programa completo de aprendizado ao longo de 3 meses. Extremamente prático e vivencial.',
				image_url: 'https://programaelas.com.br/wp-content/uploads/2018/05/logo-elas-retangular-p-min.png',
				url: 'https://programaelas.com.br/programa-elas/',
			},
			{
				title: 'Influência e Autoridade',
				subtitle: 'O Workshop “Exercendo o Seu Poder de Influência e Autoridade” é uma vivência de 2h30.',
				image_url: 'https://programaelas.com.br/wp-content/uploads/2018/05/WORKSHOP-INFLUENCIA-AUTORIDADE-PROGRAMA-ELAS.jpg',
				url: 'https://programaelas.com.br/workshop-influencia-e-autoridade/',
			},
			{
				title: ' Autoconfiança',
				subtitle: 'O Workshop “Autoconfiança para Conquistar o Mundo” é uma vivência de 2h30 que mexe com as pessoas.',
				image_url: 'https://dev-staging-lw-attachments-paperclip-attachments.s3.amazonaws.com/000/000/668/original/8fa6433b117f53827f3f04b2d2b90bec7f26f960.jpg?1468383781',
				url: 'https://programaelas.com.br/workshop-autoconfianca/',
			},
			{
				title: ' Para empresas',
				subtitle: 'Oferecer aos colaboradores uma formação completa capaz de desenvolver a autoconfiança para assumirem posições de liderança',
				image_url: 'https://programaelas.com.br/wp-content/uploads/2018/05/workshop-lideranca-feminina-empresa-elas-escola-de-lideranca-1024x711.png',
				url: 'https://programaelas.com.br/lideranca-feminina-nas-empresas/',
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
		success: 'Obrigado por sua mensagem, vamos tentar te responder em breve',
		failure: 'Não consegui salvar a mensagem',
	},
	eMail: {
		depoisMatricula: {
			assunto: 'Matrícula Confirmada. Conheça a Donna! - Programa ELAS',
			textoBody: `Olá, [nome]

Recebemos sua matrícula com sucesso!

Gostaríamos de te apresentar a Donna, assistente digital do Programa ELAS.Ao entrar com contato com ela via Messenger, você receberá todas as notificações importantes sobre o curso, como as atividades pré e pós módulos.Ela também te lembrará as datas, horários e local, além de enviar os links importantes das atividades.Que tal conversar com a Donna?
printscreen do facebook
Você só precisa ter ou criar uma conta no Messenger(Facebook) .Clique em "Começar" e em seguida clique em "Já sou aluna".A Donna irá perguntar seu CPF e pronto, você receberá todas as informações! Se você desejar bater um papo com ela, a Donna responderá o que souber, caso contrário uma representante da Escola poderá entrar em contato.
Acesse a Donna nesse link: <link_donna>

Não tem Messenger? Tudo bem, as mesmas notificações que a Donna enviar via Messenger, ela te enviará também por e-mail. Então, fique atenta ao seu endereço eletrônico, por ele você receberá informações importantes!`,
			texto: 'mail_template/ELAS_Apresentar_Donna.html',
		},
	},
	Atividade2: {
		text1: 'Para garantir a melhor experiência possível, é importante que você complete as 3 atividades prévias até [MOD1_15DIAS], ok? Abaixo seguem essas atividades:',
		text2: 'A atividade 3, você receberá no [MOD1_2DIAS]. Imprima e leve para receber uma devolutiva no primeiro módulo 😉\n\nMãos à obra e prepare-se para uma grande jornada!!',
		menuOptions: ['Ok'],
		menuPostback: ['mainMenu'],
		cards: [
			// {
			// 	title: 'ATIVIDADE 1 - RELAÇÃO DE AVALIADORES',
			// 	subtitle: 'Como as pessoas te avaliam? Indique no mín. 4 pessoas do seu convívio.',
			// 	image_url: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/8619ef7a-f963-415b-a14d-491382fc11fc.jpg',
			// 	url: process.env.INDICACAO360_LINK,
			// },
			{
				title: 'ATIVIDADE 1 - SONDAGEM DE FOCO',
				subtitle: 'Sobre a sua evolução pessoal, algo que mediremos no final do programa.',
				image_url: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/c8cc8280-7c73-4caf-a07c-2a84bdd4bb93.jpg',
				url: process.env.SONDAGEM_PRE_LINK,
			},
			{
				title: 'ATIVIDADE 2 - INVENTÁRIO COMPORTAMENTAL',
				subtitle: '"Descobrir" o seu potencial e suas habilidades.Preencha em um momento calmo.',
				image_url: 'https://gallery.mailchimp.com/926cb477483bcd8122304bc56/images/9f6a19c4-571b-429f-b628-8ef4cedda1a9.jpg',
				url: '[DISC_LINK]',
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
	adminMenu: {
		firstMenu: {
			txt1: 'Esse é o menu do admin. Clique em uma opção:',
			menuOptions: ['Inserir Alunas', 'Inserir Avaliadores', 'Ver Turma', 'Remover Aluna', 'Mudar Turma', 'Aviso Respostas', 'Gerar Gráficos'],
			menuPostback: ['inserirAlunas', 'inserirAvaliadores', 'verTurma', 'removerAluna', 'mudarTurma', 'avisoResposta', 'graficos'],
		},
		inserirAlunas: {
			txt1: 'Envie o CSV com os dados das novas alunas. As colunas devem estar formatadas como esse arquivo de exemplo:',
			txt2: 'É necessário que cada aluna tenha o nome completo, o e-mail, o CPF e pertencer a uma turma válida! Se o CPF já estiver cadastrado, os dados da aluna serão atualizados com os valores no CSV (se houver algum).',
			invalidFile: 'Erro! Verifique se o arquivo CSV está formatado corretamente e envie novamente!',
			menuOptions: ['Voltar'],
			menuPostback: ['adminMenu'],
		},
		inserirAvaliadores: {
			txt1: 'Envie o CSV com os dados dos novos avaliadores. As colunas devem estar formatadas como esse arquivo de exemplo:',
			txt2: 'Para adicionar: É necessário que cada avaliador tenha o nome completo, o e-mail, assim como o CPF de uma Aluna! Um indicado com o mesmo e-mail não poderá ser inserido mais de uma vez na mesma aluna!',
			txt3: 'Para atualizar os valores de nome, e-mail, telefone, familiar e relação com aluna, insira o ID do indicado na coluna Indicado ID. ⚠️ Cuidado: Se quiser atualizar algum valor, use o Indicado ID, sem ele o indicado será adicionado novamente (se o e-mail já não existir)',
			txt4: 'Detalhe: Para transformar um avaliador em "Familiar", adicione a palavra "Sim" na coluna "Familiar". Para que o avaliador deixe de ser Familiar, escreva "Nao" (sem acento). Todos os outros valores serão ignorados e não mudarão o estado de familiar do Avaliador',
			invalidFile: 'Erro! Verifique se o arquivo CSV está formatado corretamente e envie novamente!',
			menuOptions: ['Voltar'],
			menuPostback: ['adminMenu'],
		},
		feedback: {
			aluna: ['Nenhuma aluna foi adicionada nem atualizada!', 'Uma aluna foi adicionada/atualizada!', 'alunas foram adicionadas/atualizadas!'],
			indicado: ['Nenhum indicado foi adicionado nem atualizado!', 'Um indicado foi adicionado/atualizado!', 'indicados foram adicionados/atualizados!'],
		},
		verTurma: {
			txt1: 'Aqui você poderá baixar um CSV com os dados das alunas de uma turma. Digite a turma, exemplo: T1-SP.',
			txt2: 'Se quiser os dados de outra turma basta digitar novamente.',
			noTurma: 'Não encontrei essa turma. Tente novamente.',
			menuOptions: ['Voltar'],
			menuPostback: ['adminMenu'],
		},
		graficos: {
			txt1: 'Escolha uma opção. A primeira gera o gráfico de média da turma. A segunda gera um zip com os PDFs da turma.',
			txt2: 'Entre com o nome da turma para gerar o gráfico com a média da turma. Ele será enviado para você através do Chatbot. Exemplo: T7-SP',
			txt3: 'Entre com o nome da turma para gerar o Zip com os PDFs de Sondagem e Avaliação 360 da turma. Ele será enviado para todas as administradoras por e-mail. Exemplo: T7-SP',
			success: 'Sucesso! Baixe o gráfico acima.',
			failure: 'Não foi possível construir o gráfico!',
			menuOptions: ['Média da Turma', 'Zip dos alunos'],
			menuPostback: ['graficoMedia', 'graficoZip'],
		},
		sendFeedbackZip: {
			askTurma: 'Entre com o nome da turma que você deseja receber por e-mail os arquivos de evolução e feedback.',
			turmaInvalida: 'Turma não encontrada! Tente novamente.',
			noDocs: 'Não foram encontradas alunas nessa turma',
			success: 'Arquivo ZIP com os resultados da turma <TURMA> foram enviados para o e-mail das avaliadoras.',
			failure: 'Ocorreu um erro ao enviar o ZIP da turma <TURMA>. Tente novamente.',
			mailSubject: 'ELAS - ZIP da turma',
			mailText: 'Olá, em anexo se encontra o arquivo zip contendo os gráficos da turma <TURMA>, tanto a sondagem quanto a avaliação 360. Quem fez a solicitação no chatbot foi: <ADMIN>.',
		},
		removerAluna: {
			txt1: 'Entre com o CPF da Aluna que deseja remover de turma. Pode ser só números. \nSe não souber o CPF, baixe o CSV com as informações da turma clicando no botão abaixo.',
			invalidCPF: 'CPF inválido. Tente novamente.',
			alunaNotFound: 'Não encontrei nenhuma aluna com esse CPF. Tente novemente.',
			alunaFound: 'Aluna encontrada:\n\n',
			menuOptions: ['Voltar', 'Ver Turma'],
			menuPostback: ['adminMenu', 'verTurma'],
		},
		removerAlunaConfirma: {
			txt1: 'Tem certeza que deseja remover a aluna dessa turma? ',
			txt2: 'Hoje, <NOME> está na turma <TURMA>',
			noTurma: 'Aluna <NOME> já não se encontra em nenhuma turma! Adicione a aluna em uma usando a transferência de turma!',
			menuOptions: ['Sim', 'Cancelar', 'Mudar de Aluna'],
			menuPostback: ['removerAlunaFim', 'adminMenu', 'removerAluna'],
		},
		removerAlunaFim: {
			success: '<NOME> foi removida da turma <TURMA>. A equipe ELAS também será avisada por e-mail.',
			erro: 'Obs, aconteceu um erro, não foi possível remover <NOME> da turma <TURMA>.',
			mailSubject: 'ELAS - Você foi removida da turma <TURMA>',
			mailText: 'Olá, <NOME>.\n\nVocê foi removida da turma <TURMA>.',
			adminMailSubject: 'ELAS - <NOME> foi removida da turma <TURMA>',
			adminMailText: 'Olá.\n\nA aluna <NOME> foi removida da turma <TURMA> conforme solicitação de <ADMIN> através do Chatbot.',
			menuOptions: ['Cancelar', 'Tentar Novamente', 'Mudar de Aluna'],
			menuPostback: ['adminMenu', 'removerAlunaFim', 'removerAluna'],
		},
		mudarTurma: {
			txt1: 'Entre o CPF da Aluna que deseja mudar de turma. Pode ser só números. \nSe não souber o CPF, baixe o CSV com as informações da turma clicando no botão abaixo.',
			invalidCPF: 'CPF inválido. Tente novamente.',
			alunaNotFound: 'Não encontrei nenhuma aluna com esse CPF. Tente novemente.',
			alunaFound: 'Aluna encontrada:\n\n',
			txt2: 'Entre com a turma para transferir a aluna. ',
			txt3: 'Hoje, <NOME> está na turma <TURMA>.',
			transferComplete: 'Aluna foi transferida para turma <TURMA> com sucesso!',
			transferFailed: 'Um erro aconteceu, tente novamente!',
			turmaInvalida: 'Turma inválida! Não existe nenhuma aluna nessa turma! Adicione alguma aluna nessa turma antes de transferir alguém pra lá!',
			turmaCount: 'Agora existem <COUNT> aluna(s) na turma <TURMA>.',
			menuOptions: ['Voltar', 'Ver Turma'],
			menuPostback: ['adminMenu', 'verTurma'],
		},
		// atualizarTurma: {
		// 	menuOptions: ['Voltar', 'Atualizar Novamente'],
		// 	menuPostback: ['adminMenu', 'updateTurma'],
		// },
		avisoResposta: {
			txt1: 'Aguarde, enviaremos o csv agora.',
		},
		simularNotificacao: {
			intro: 'Escolha um botão para receber suas notificações.',
			askCPF: 'Entre com o CPF da aluna que receberá as notificações.',
			menuOptions: ['Simular Trilha', 'Indicado', 'Uma Hora Antes', '24h Antes', 'Todas as Notificações', 'Trocar Aluna', 'Cancelar'],
			menuPostback: ['simularTrilha', 'simularIndicado', 'simular1H', 'simular24H', 'simularAll', 'simularAskCPF', 'adminMenu'],
		},
		notAdmin: 'Você não é admin!',
		errorMsg: 'Escreva novamente ou escolha uma das opções!',
	},
	adminCSV: {
		alunosTurmaCSV: {
			txt1: 'Alunas da Turma:',
			error: 'Não encontrei nenhuma aluna nessa turma!',
			filename: 'TURMA_<INPUT>',
		},
		alunosRespostasCSV: {
			txt1: 'Controle de preenchimento das atividades:',
			error: 'Não encontrei nenhuma resposta nessa turma!',
			filename: 'RESPOSTAS_TURMA_<INPUT>',
		},
		indicadosCSV: {
			txt1: 'Indicados da turma:',
			error: 'Não encontrei nenhum indicado nessa turma!',
			filename: 'INDICADOS_TURMA_<INPUT>',
		},
		turmaLinksCSV: {
			txt1: 'Links formatados da turma:',
			error: 'Não consegui montar os links dessa turma!',
			filename: 'LINKS_FORMATADOS_TURMA_<INPUT>',
		},
	},
	missingAnswersWarning: {
		mailSubject: 'Questionário não respondido',
		mailText: 'Baixe o arquivo acima para visualizar as alunas que não responderam os questionários para a próxima aula',
	},
	pesquisa: {
		textMsg: 'Olá como você está? Acreditamos que o seu processo de evolução não termina no módulo 3 e por isso gostaríamos de continuar te acompanhando. Por isso é muito importante que você responda essa atividade para continuarmos medindo sua evolução.\nResponda: <LINK_PESQUISA>',
	},
	notifications: {
		on: 'Legal! Estarei te interando das novidades! Se quiser parar de receber nossas novidades, clique na opção "Parar Notificações 🛑" no menu abaixo. ⬇️',
		off: 'Você quem manda. Não estarei mais te enviando nenhuma notificação. Se quiser voltar a receber nossas novidades, clique na opção "Ligar Notificações 👌" no menu abaixo. ⬇️',
	},
};
