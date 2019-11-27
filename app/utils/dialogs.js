const { readFileSync } = require('fs');
const { sendHTMLMail } = require('./mailer');
const db = require('./DB_helper');
const help = require('./helper');
const { sentryError } = require('./helper');
const { sendAlunaToAssistente } = require('./sm_help');
const { sendMatricula } = require('./sm_help');
const attach = require('./attach');
const flow = require('./flow');
const admin = require('./admin_menu/admin_helper');
const { sendTestNotification } = require('./notificationTest');
const { alunos } = require('../server/models');
const { turma } = require('../server/models');
const { addNewNotificationAlunas } = require('./notificationAddQueue');
const { getAluna } = require('./notificationSendQueue');
const { actuallySendMessages } = require('./notificationSendQueue');
const { addNewNotificationIndicados } = require('./notificationAddQueue');
const notificationTypes = require('../server/models').notification_types;
const { buildParametersRules } = require('./notificationRules');

module.exports.sendMainMenu = async (context, txtMsg) => {
	const text = txtMsg || flow.mainMenu.defaultText;
	let opt = [];

	if (context.state.matricula === true) {
		opt = await attach.getQR(flow.mainMenu);
	} else {
		opt = await attach.getQR(flow.greetings);
	}

	await context.sendText(text, opt);
};

module.exports.handleCPF = async (context) => {
	const cpf = await help.getCPFValid(context.state.whatWasTyped);
	if (!cpf) {
		await context.setState({ dialog: 'invalidCPF' });
	} else if (await db.checkCPF(cpf) === false) { // check if this cpf exists
		await context.setState({ dialog: 'CPFNotFound' });
	} else {
		await context.setState({ cpf, gotAluna: await db.getAlunaFromCPF(cpf) });
		await context.setState({ dialog: 'validCPF' });
	}
};

module.exports.getAgenda = async (context, userTurma) => {
	const result = {};
	if (!userTurma) return false;
	const today = new Date();
	result.turmaNome = userTurma.nome;
	result.local = userTurma.local;

	for (let i = 1; i <= 3; i++) { // loop through all 3 modules we have
		const newDate = userTurma[`horario_modulo${i}`] || userTurma[`modulo${i}`]; // get date for the start of each module

		if (newDate) {
			if (await help.moment(newDate).format('YYYY-MM-DD') >= await help.moment(today).format('YYYY-MM-DD')) { // check if the date for this module is after today or today
				result.currentModule = i; // we loop through the modules so this index is the same number as the module
				i = 4; // we have the date already, leave the loop
				// getting the day the module starts
				result.newDate = newDate;
				result.newDateDay = help.weekDayName[result.newDate.getDay()];
				// getting the next day
				result.nextDate = new Date(newDate);
				result.nextDate.setDate(result.nextDate.getDate() + 1);
				result.nextDateDay = help.weekDayName[result.nextDate.getDay()];
			}
		}
	}

	return result;
};

module.exports.buildAgendaMsg = async (data) => {
	let msg = '';
	if (data.turmaNome) msg = `📝 Sua Turma: ${data.turmaNome}\n`;
	if (data.currentModule) msg += `💡 Você está no módulo ${data.currentModule} de 3\n`;
	if (data.newDate) msg += `🗓️ Sua aula acontecerá ${data.newDateDay} dia ${await help.formatDate(data.newDate)} e ${data.nextDateDay} dia ${help.formatDate(data.nextDate)}\n`;
	if (data.local) msg += `🏠 Local: ${await help.toTitleCase(data.local)}`;

	return msg;
};

async function warnAlunaTroca(alunaData) {
	const subject = flow.trocarTurma.mailSubject.replace('<NOME>', alunaData.nome_completo);
	let mailText = flow.trocarTurma.mailText.replace('<TURMA>', alunaData.turma).replace('<NOME>', alunaData.nome_completo);
	let aux = '';

	if (alunaData.nome_completo) aux += `\nNome: ${alunaData.nome_completo}`;
	if (alunaData.turma) aux += `\nTurma: ${alunaData.turma}`;
	if (alunaData.telefone) aux += `\nTelefone: ${alunaData.telefone}`;
	if (alunaData.email) aux += `\nE-mail: ${alunaData.email}`;
	if (alunaData.cpf) aux += `\nCPF: ${alunaData.cpf}`;

	if (aux) mailText += `\nDados da aluna: \n${aux}`;

	let html = await readFileSync(`${process.cwd()}/mail_template/ELAS_Generic.html`, 'utf-8');
	html = await html.replace('[CONTEUDO_MAIL]', mailText);

	await sendHTMLMail(subject, alunaData.email, html);
}

module.exports.warnAlunaTroca = warnAlunaTroca;

async function warnAlunaRemocao(alunaData) {
	const subject = flow.adminMenu.removerAlunaFim.mailSubject.replace('<TURMA>', alunaData.turma);
	const mailText = flow.adminMenu.removerAlunaFim.mailText.replace('<TURMA>', alunaData.turma).replace('<NOME>', alunaData.nome_completo);

	let html = await readFileSync(`${process.cwd()}/mail_template/ELAS_Generic.html`, 'utf-8');
	html = await html.replace('[CONTEUDO_MAIL]', mailText);

	await sendHTMLMail(subject, alunaData.email, html);
}

module.exports.removerAluna = async (context) => {
	const feedback = await db.removeAlunaFromTurma(context.state.adminAlunaFound.id);
	if (!feedback) {
		await context.sendText(flow.adminMenu.removerAlunaFim.erro.replace('<NOME>', context.state.adminAlunaFound.nome_completo.trim()).replace('<TURMA>', context.state.adminAlunaFound.turma), await attach.getQR(flow.adminMenu.removerAlunaFim));
	} else {
		if (context.state.adminAlunaFound.email) await warnAlunaRemocao(context.state.adminAlunaFound);
		await admin.NotificationChangeTurma(context.state.adminAlunaFound.id, null);
		await admin.SaveTurmaChange(
			context.state.chatbotData.user_id, context.state.chatbotData.fb_access_token, context.state.adminAlunaFound.id, context.state.adminAlunaFound.turma_id, null,
		);
		await context.sendText(flow.adminMenu.removerAlunaFim.success.replace('<NOME>', context.state.adminAlunaFound.nome_completo.trim()).replace('<TURMA>', context.state.adminAlunaFound.turma));
		await context.sendText(flow.adminMenu.firstMenu.txt1, await attach.getQR(flow.adminMenu.firstMenu));
	}
};

module.exports.sendCSV = async (context) => { // verTurma
	const turmaID = context.state.searchTurma;
	let result = '';
	switch (context.state.dialog) {
	case 'alunosTurmaCSV':
		result = await db.getAlunasReport(turmaID);
		result = await admin.addTurmaTransferenceCSV(result);
		break;
	case 'alunosRespostasCSV': {
		const firstResult = await db.getAlunasRespostasReport(turmaID);
		result = { content: [], input: turmaID };
		result.content = await admin.formatRespostasCSV(firstResult.content, 'Respondido');
		break;
	}
	case 'indicadosCSV':
		result = await db.getAlunasIndicadosReport(turmaID);
		break;
	default:
		break;
	}

	result.content = await admin.putColumnsLast(result.content, ['Criado em', 'Atualizado em']);
	result = await admin.buildCSV(result, flow.adminCSV[context.state.dialog]);

	if (!result || result.error || !result.csvData) {
		await context.sendText(result.error);
	} else {
		await context.sendText(flow.adminCSV[context.state.dialog].txt1);
		await context.sendFile(result.csvData, { filename: result.filename || 'seu_arquivo.csv' });
	}
};

module.exports.sendFeedbackMsgs = async (context, errors, msgs, quickReplies) => {
	// because some erros can be ignored at the error count (but not on the error listing) we get the number of mandatory errors
	const notIgnoredErrorsLength = errors.filter((x) => !x.ignore).length;
	const feedbackMsgs = await admin.getFeedbackMsgs(context.state.csvLines.length - notIgnoredErrorsLength, errors, msgs);
	for (let i = 0; i < feedbackMsgs.length; i++) {
		const element = feedbackMsgs[i];
		if (i === 1) {
			await context.sendText('Aconteceram alguns erros, o número da linha exibido abaixo é contando com o header do CSV/Planilha');
		}
		await context.sendText(element, await attach.getQR(quickReplies || flow.adminMenu.inserirAlunas));
	}
};


module.exports.receiveCSVAluno = async (csvLines, chatbotUserId, pageToken) => { // createAlunos/ inserir
	if (csvLines) {
		const turmas = await turma.findAll({ where: {}, raw: true }).then((res) => res).catch((err) => help.sentryError('Erro em turma.findAll', err));
		const errors = []; // stores lines that presented an error

		for (let i = 0; i < csvLines.length; i++) {
			let element = csvLines[i];
			if (element.Turma) {
				element.Turma = await turmas.find((x) => x.nome === element.Turma.toUpperCase()); // find the turma that has that name
				element.turma_id = element.Turma ? element.Turma.id : false; // get that turma id
			} // convert turma as name to turma as id
			if (element.Turma && element.turma_id) { // check valid turma
				element = await admin.convertCSVToDB(element, admin.swap(admin.alunaCSV));
				if (element.nome_completo) { // check if aluno has the bare minumium to be added to the database
					element.cpf = await help.getCPFValid(element.cpf); // format cpf
					if (!element.cpf) {
						errors.push({ line: i + 2, msg: 'CPF inválido!' });
						help.sentryError('Erro em receiveCSVAluno => CPF inválido!', { element });
					} else if (!element.email) {
						errors.push({ line: i + 2, msg: 'Email inválido!' });
						help.sentryError('Erro em receiveCSVAluno => Email inválido!', { element });
					} else {
						const oldAluno = await alunos.findOne({ where: { cpf: element.cpf }, raw: true }).then((res) => res).catch((err) => help.sentryError('Erro em alunos.findOne', err));
						// if aluno existed before we save the turma and label change
						if (oldAluno) { await admin.SaveTurmaChange(chatbotUserId, pageToken, oldAluno.id, oldAluno.turma_id, element.turma_id); }
						if (!oldAluno) { await sendMatricula(element.Turma.nome, '', element.email); }
						element.added_by_admin = true;
						const newAluno = await db.upsertAlunoCadastro(element);
						await sendAlunaToAssistente(element.nome_completo, element.email, element.cpf, element.Turma.nome);
						if (!newAluno || newAluno.error || !newAluno.id) { // save line where error happended
							errors.push({ line: i + 2, msg: 'Erro ao salvar no banco' });
							help.sentryError('Erro em receiveCSVAluno => Erro ao salvar no banco', { element });
						} else {
							if (newAluno.email === newAluno.contato_emergencia_email) {
								errors.push({ line: i + 2, msg: `Contato de emergência tem o mesmo e-mail da aluna ${newAluno.nome_completo}: ${newAluno.contato_emergencia_email}`, ignore: true });
							}
							await admin.NotificationChangeTurma(newAluno.id, element.turma_id);
						}
					}
				} else {
					errors.push({ line: i + 2, msg: 'Falta o nome da aluna' });
					help.sentryError('Erro em receiveCSVAluno => aluna sem nome', { element });
				}
			} else {
				errors.push({ line: i + 2, msg: `Turma ${element.Turma || ''} inválida` });
				help.sentryError('Erro em receiveCSVAluno => turma inválida', { element });
			}
		}
		return { errors };
	}
	return help.sentryError('Erro em receiveCSVAluno => CSV inválido!', { csvLines });
};


module.exports.receiveCSVAvaliadores = async (csvLines) => {
	if (csvLines) {
		const errors = []; // stores lines that presented an error
		const indicados = [];
		for (let i = 0; i < csvLines.length; i++) {
			let element = csvLines[i];
			element = await admin.convertCSVToDB(element, admin.swap(admin.avaliadorCSV));
			element.aluno_cpf = await help.getCPFValid(element.aluno_cpf);
			if (element.nome && element.email && element.aluno_cpf) {
				const avaliadorAluno = await alunos.findOne({ where: { cpf: element.aluno_cpf }, raw: true }).then((res) => res).catch((err) => help.sentryError('Erro em avaliadorAluno.findOne', err));
				if (avaliadorAluno) {
					element.aluno_id = avaliadorAluno.id;
					element = await admin.formatBooleanToDatabase(element, 'Sim', 'Não', ['familiar']);
					const newIndicado = await db.upsertIndicado(element);
					if (!newIndicado || newIndicado.error || !newIndicado.id) { // save line where error happended
						errors.push({ line: i + 2, msg: 'Erro ao salvar no banco' });
						help.sentryError('Erro em receiveCSV => Erro ao salvar no banco', { element });
					} else {
						if (newIndicado.email === avaliadorAluno.email) {
							errors.push({ line: i + 2, msg: `Adicionado Indicado ${newIndicado.nome} com mesmo e-mail da aluna ${avaliadorAluno.nome_completo}: ${avaliadorAluno.email}`, ignore: true });
							help.sentryError('Erro em receiveCSVAvaliadores => Avaliador com e-mail igual aluna', { element });
						}
						indicados.push(newIndicado);
					}
				} else {
					errors.push({ line: i + 2, msg: `Nenhuma aluna com CPF ${element.aluno_cpf}` });
					help.sentryError('Erro em receiveCSVAvaliadores => Avaliador sem nome ou e-mail ou cpf do aluno', { element });
				}
			} else {
				errors.push({ line: i + 2, msg: `Avaliador sem ${await admin.getMissingDataAvaliadoresCSV(element)}.` });
				help.sentryError(`Erro em receiveCSVAvaliadores => Avaliador sem ${await admin.getMissingDataAvaliadoresCSV(element)}.`, { element });
			}
		}

		await admin.updateNotificationIndicados(indicados);
		return { errors };
	}
	return help.sentryError('Erro em receiveCSVAluno => CSV inválido!', { csvLines });
};

module.exports.adminAlunaCPF = async (context, nextDialog) => {
	await context.setState({ adminAlunaCPF: await help.getCPFValid(context.state.whatWasTyped) });
	if (!context.state.adminAlunaCPF) {
		await context.sendText(flow.adminMenu.mudarTurma.invalidCPF);
	} else {
		await context.setState({ adminAlunaFound: await db.getAlunaFromCPF(context.state.adminAlunaCPF) });
		if (!context.state.adminAlunaFound) {
			await context.sendText(flow.adminMenu.mudarTurma.alunaNotFound);
		} else {
			await context.sendText(flow.adminMenu.mudarTurma.alunaFound + await help.buildAlunaMsg(context.state.adminAlunaFound));
			await context.setState({ dialog: nextDialog });
		}
	}
};

module.exports.sendFeedbackFim = async (feedbackTurmaID) => {
	// const notification = await notificationTypes.findOne({ where: { id: 13 }, raw: true }).then((res) => res).catch((err) => help.sentryError('Erro em notification.findOne', err));
	const types = await notificationTypes.findAll({ where: {}, raw: true }).then((res) => res).catch((err) => sentryError('Erro ao carregar notification_types', err));
	const parametersRules = await buildParametersRules();
	const notification = { notification_type: 13 };
	const alunosToSend = await alunos.findAll({ where: { turma_id: feedbackTurmaID }, raw: true }).then((res) => res).catch((err) => help.sentryError('alunos em turma.findAll', err));

	for (let i = 0; i < alunosToSend.length; i++) {
		const e = alunosToSend[i];
		const aluna = await getAluna(e.id);
		await actuallySendMessages(parametersRules, types, notification, aluna, true);
	}
};

module.exports.sendFeedbackConfirm = async (context) => {
	await context.setState({ desiredTurma: context.state.whatWasTyped });
	const validTurma = await db.getTurmaID(context.state.desiredTurma);
	if (!validTurma) { // if theres no id then it's not a valid turma
		await context.sendText(flow.adminMenu.sendFeedback.turmaInvalida);
	} else {
		const turmaData = await turma.findOne({ where: { id: validTurma }, raw: true }).then((res) => res).catch((err) => help.sentryError('Erro em turma.findOne', err));
		const count = await alunos.count({ where: { turma_id: validTurma }, raw: true }).then((res) => res).catch((err) => help.sentryError('Erro em alunos.count', err));
		if (count) {
			await context.setState({ feedbackTurmaID: validTurma });
			await context.sendText(flow.adminMenu.sendFeedback.turmaFound.replace('<NOME>', turmaData.nome).replace('<COUNT>', count));
			await context.sendText(flow.adminMenu.sendFeedback.confirma, await attach.getQR(flow.adminMenu.sendFeedback));
		} else {
			await context.sendText(flow.adminMenu.sendFeedback.turmaInvalida);
			await context.sendText(flow.adminMenu.firstMenu.txt1, await attach.getQR(flow.adminMenu.firstMenu));
		}
	}
};

module.exports.mudarAskTurma = async (context, pageToken) => {
	await context.setState({ desiredTurma: context.state.whatWasTyped });
	const validTurma = await db.getTurmaID(context.state.desiredTurma); // get the id that will be user for the transfer

	if (!validTurma) { // if theres no id then it's not a valid turma
		await context.sendText(flow.adminMenu.mudarTurma.turmaInvalida);
	} else {
		const transferedAluna = await alunos.update({ turma_id: validTurma }, { where: { cpf: context.state.adminAlunaFound.cpf } }).then(() => true).catch((err) => sentryError('Erro em mudarAskTurma update', err));
		if (transferedAluna) {
			const turmaNome = await db.getTurmaName(validTurma);
			await admin.NotificationChangeTurma(context.state.adminAlunaFound.id, validTurma);
			await admin.SaveTurmaChange(context.state.chatbotData.user_id, pageToken, context.state.adminAlunaFound.id, context.state.adminAlunaFound.turma_id, validTurma);
			await context.sendText(flow.adminMenu.mudarTurma.transferComplete.replace('<TURMA>', turmaNome));
			const count = await alunos.count({ where: { turma_id: validTurma } })
				.then((alunas) => alunas).catch((err) => sentryError('Erro em mudarAskTurma getCount', err));
			if (count !== false) { await context.sendText(flow.adminMenu.mudarTurma.turmaCount.replace('<COUNT>', count).replace('<TURMA>', turmaNome)); }
			await context.setState({
				dialog: 'adminMenu', desiredTurma: '', adminAlunaFound: '', adminAlunaCPF: '',
			});
		} else {
			await context.sendText(flow.adminMenu.mudarTurma.transferFailed);
		}
	}
};

module.exports.mailTest = async (context) => {
	await context.setState({ dialog: '' });
	const aluna = await db.getAlunaFromFBID(context.session.user.id);

	if (aluna && aluna.id) {
		const result = await sendTestNotification(aluna.id);
		if (result && result.qtd) {
			await context.sendText(`Sucesso, suas ${result.qtd} notificações estão sendo enviadas`);
		} else {
			await context.sendText('Você não tem notificações. Vou criar novas notificações pra você e seus indicados (Se vc tiver algum)');
			await addNewNotificationAlunas(aluna.id, aluna.turma_id);
			await addNewNotificationIndicados(aluna.id, aluna.turma_id);
			await context.sendText('Pronto! As notificações começarão a ser mandadas em 30 segundos. Se não começarem a chegar, mande a palavra-chave novamente.');
		}
	} else {
		await context.sendText('Não consegui estabelecer o vínculo entre seu usuário no chatbot e alguma aluna cadastrada. Tente se vincular através do seu PDF, entre no fluxo Já Sou Aluna e se cadastre.');
	}
};

module.exports.checkReceivedFile = admin.checkReceivedFile;
