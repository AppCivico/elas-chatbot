require('dotenv').config();

const testFolder = './.sessions/';
const fs = require('fs');
const { linkUserToLabelByName } = require('./app/utils/labels');
const { changeAdminStatus } = require('./app/utils/DB_helper');
const { getTurmaInCompany } = require('./app/utils/DB_helper');
const addQueue = require('./app/utils/notificationAddQueue');
const send = require('./app/utils/notificationSendQueue');
const { seeDataQueue } = require('./app/utils/notificationAddQueue');
const { sendDonnaMail } = require('./app/utils/surveys/questionario_followUp');
const { sendMatricula } = require('./app/utils/surveys/questionario_followUp');
const { saveAnswer } = require('./app/utils/surveys/questionario_callback');
const { syncRespostas } = require('./app/utils/surveys/questionario_sync');
const rules = require('./app/utils/notificationRules');
const { dateNoTimezone } = require('./app/utils/helper');

async function getFBIDJson() { // eslint-disable-line
	const result = {};

	await fs.readdirSync(testFolder).forEach(async (file) => {
		const obj = JSON.parse(await fs.readFileSync(testFolder + file, 'utf8'));
		result[obj.user.name] = obj.user.id;
	});

	return result;
}

async function getNameFBID(req, res) {
	const body = JSON.parse(req.body || '{}');
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else {
			const result = await getFBIDJson();
			if (result) {
				res.status(200); res.send(result);
			} else {
				res.status(500); res.send('Failure');
			}
		}
	}
}

async function addLabel(req, res) {
	if (!req.body || !req.body.user_id || !req.body.label_name || !req.body.security_token || !req.body.fb_access_token) {
		res.status(400); res.send('Params user_id, label_name, security_token and fb_access_token are required!');
	} else {
		const userID = req.body.user_id;
		const labelName = req.body.label_name;
		const securityToken = req.body.security_token;
		const pageToken = req.body.fb_access_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else {
			const response = {};
			response.facebook_label = await linkUserToLabelByName(userID, labelName, pageToken, true);
			if (labelName === 'admin') {
				response.database_label = await changeAdminStatus(userID, true);
			}

			res.status(200); res.send(response);
		}
	}
}

async function addMissingNotification(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else if (!body.notification_type || !body.turma_id) {
			res.status(401); res.send('Missing aluno_id or turma_id!');
		} else {
			addQueue.addMissingAlunoNotification(body.turma_id, body.notification_type);
			res.status(200); res.send('Processando');
		}
	}
}

async function addFamiliarQueue(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else if (!body.aluno_id || !body.turma_id) {
			res.status(401); res.send('Missing aluno_id or turma_id!');
		} else {
			const notificationRules = await rules.loadTabNotificationRules(await getTurmaInCompany(body.turma_id));
			console.log('notificationRules', notificationRules);
			const response = await addQueue.addQueueForFamiliar(body.aluno_id, notificationRules);

			res.status(200);
			res.send(response);
		}
	}
}

async function addNewQueue(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else if (!body.aluno_id || !body.turma_id) {
			res.status(401); res.send('Missing aluno_id or turma_id!');
		} else {
			addQueue.addNewNotificationAlunas(body.aluno_id, body.turma_id);
			res.status(200); res.send('Processando');
		}
	}
}

async function sendNotificationQueue(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else {
			const turmaID = body.turma_id;
			const alunoID = body.aluno_id;
			const indicadoID = body.indicado_id;
			const notificationType = body.notification_type;
			const { moment } = body;

			let dataComparacao = null;
			if (moment) {
				dataComparacao = new Date(moment);
				if (!Object.prototype.toString.call(dataComparacao) === '[object Date]' || isNaN(dataComparacao.getTime())) { // eslint-disable-line
					res.status(401); res.send('Data inválida, utilize uma string ISO como essa: 2020-02-15T17:30:00.000Z');
				}
			}

			if (dataComparacao && !Object.prototype.toString.call(dataComparacao) === '[object Date]') dataComparacao = null;

			const queue = await send.getQueue(turmaID, alunoID, indicadoID, notificationType);

			const result = await send.sendNotificationFromQueue(queue, dataComparacao, false);
			res.status(200); res.send(result);
		}
	}
}

async function dataQueue(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else if (!body.turma_id) {
			res.status(401); res.send('body.turma_id missing!');
		} else {
			const result = await seeDataQueue(body.turma_id);
			res.status(200); res.send(result);
		}
	}
}

async function seeQueue(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else if (!body.turma_id) {
			res.status(401); res.send('body.turma_id missing!');
		} else {
			const result = await addQueue.seeNotifications(body.turma_id);
			res.status(200); res.send(result);
		}
	}
}

async function donnaMail(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else if (!body.nome || !body.email) {
			res.status(401); res.send('body.nome or body.email missing');
		} else {
			const result = await sendDonnaMail(body.nome, body.email);
			res.status(200); res.send(result);
		}
	}
}


async function matriculaMail(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else {
			const turmaName = body.turma_name;
			const pagamentoID = body.pagamento_id;
			const buyerEmail = body.email;
			const { cpf } = body;
			const inCompany = body.in_company;

			if (!turmaName || !buyerEmail) {
				res.status(200); res.send('turma_name or email missing');
			} else {
				const result = await sendMatricula(turmaName, pagamentoID, buyerEmail, cpf, inCompany);
				res.status(200); res.send(result);
			}
		}
	}
}


async function saveNewAnswer(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else if (!body.questionarioID || !body.answerID || (!body.alunoID && !body.indicadoID)) {
			res.status(401); res.send('questionarioID or answerIDor or alunoID or indicadoID missing');
		} else if (body.alunoID && body.indicadoID) {
			res.status(401); res.send('Dont send both alunoID and indicadoID together');
		} else {
			const result = await saveAnswer(body.questionarioID, body.answerID, body.alunoID, body.indicadoID);
			res.status(200); res.send(result);
		}
	}
}

async function syncAnswers(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else if (body.syncID && typeof body.syncID !== 'number') {
			res.status(401); res.send('syncID invalid');
		} else {
			const result = await syncRespostas(body.syncID);
			res.status(200); res.send(result);
		}
	}
}

async function logMail(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else {
			const turmaID = body.turma_id;
			const alunoID = body.aluno_id;
			const notificationType = body.notification_type;
			const { moment } = body;

			let dataComparacao = null;
			if (moment) {
				dataComparacao = new Date(moment);
				if (!Object.prototype.toString.call(dataComparacao) === '[object Date]' || isNaN(dataComparacao.getTime())) { // eslint-disable-line
					res.status(401); res.send('Data inválida, utilize uma string ISO como essa: 2020-02-15T17:30:00.000Z');
				}
			} else {
				dataComparacao = await dateNoTimezone();
			}

			if (dataComparacao && !Object.prototype.toString.call(dataComparacao) === '[object Date]') dataComparacao = null;

			const queue = await send.getQueue(turmaID, alunoID, notificationType);

			const result = await send.sendNotificationFromQueue(queue, dataComparacao, true);
			res.status(200); res.send(result);
		}
	}
}

async function addQueueDetails(req, res) {
	const { body } = req;
	if (!body || !body.security_token) {
		res.status(400); res.send('Param security_token is required!');
	} else {
		const securityToken = body.security_token;
		if (securityToken !== process.env.SECURITY_TOKEN_MA) {
			res.status(401); res.send('Unauthorized!');
		} else {
			const turmaID = body.turma_id;
			const type = body.notification_type;
			const details = body.additional_details || null;

			if (!turmaID || !type) {
				res.status(401); res.send('Falta turma_id ou notification_type!');
			} else {
				const result = await addQueue.addQueueProvisorio(turmaID, type, details);
				console.log('result', result);
				res.status(200); res.send(result);
			}
		}
	}
}

module.exports = {
	getNameFBID,
	addLabel,
	addMissingNotification,
	sendNotificationQueue,
	dataQueue,
	seeQueue,
	addNewQueue,
	donnaMail,
	saveNewAnswer,
	syncAnswers,
	logMail,
	addQueueDetails,
	matriculaMail,
	addFamiliarQueue,
};
