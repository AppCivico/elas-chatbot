const { promisify } = require('util');
const fs = require('fs');
const chart = require('../simple_chart');
const chartsMaps = require('./charts_maps');
const help = require('./helper');
const db = require('./DB_helper');

async function buildTurmaChart(turmaID) {
	const allAnswers = await db.getTurmaRespostas(turmaID);
	const respostas = { pre: {}, pos: {} };
	const result = [];

	console.log('allAnswers.length', allAnswers.length);

	if (!allAnswers || allAnswers.length === 0) return false;

	allAnswers.forEach((answer) => { // sum all of the values in the answers
		Object.keys(answer.pre).forEach((e) => {
			if (!respostas.pre[e]) respostas.pre[e] = 0;
			respostas.pre[e] += parseInt(answer.pre[e], 10);
		});
		Object.keys(answer.pos).forEach((e) => {
			if (!respostas.pos[e]) respostas.pos[e] = 0;
			respostas.pos[e] += parseInt(answer.pos[e], 10);
		});
	});

	delete respostas.pre.answer_date;
	delete respostas.pre.cpf;
	delete respostas.pos.answer_date;
	delete respostas.pos.cpf;

	console.log('respostas.pre', respostas.pre);
	console.log('respostas.pos', respostas.pos);


	// get the average
	const divideBy = allAnswers.length;
	Object.keys(respostas.pre).forEach((e) => { respostas.pre[e] /= divideBy; });
	Object.keys(respostas.pos).forEach((e) => { respostas.pos[e] /= divideBy; });

	const secondHalf = [...chartsMaps.sondagemMedia];
	const firstHalf = secondHalf.splice(0, 23);
	const charts = [firstHalf, secondHalf];

	console.log('charts', charts);

	if (respostas && respostas.pre && respostas.pos) {
		for (let i = 0; i < charts.length; i++) {
			const e = charts[i];

			const data = {};
			e.forEach(async (element) => { // this map contains only the necessary answers
				console.log('element', element);
				console.log('respostas.pre[element.paramName]', respostas.pre[element.paramName]);
				console.log('respostas.pos[element.paramName]', respostas.pos[element.paramName]);

				if (respostas.pre[element.paramName] && respostas.pos[element.paramName]) { // build obj with param_name and the number variation
					data[element.questionName] = help.getPercentageChange(respostas.pre[element.paramName], respostas.pos[element.paramName]);
					console.log('data[element.questionName] ', data[element.questionName]);
				}
			});

			if (data && Object.keys(data) && Object.keys(data).length > 0) {
				const res = await chart.createChart(Object.keys(data), Object.values(data), turmaID, `Resultado auto-avaliação da Turma ${await db.getTurmaName(turmaID)}`);
				console.log('res', res);
				result.push(res);
			}
		}
		console.log('result', result);
		return result;
	}

	console.log('passei aqui');
	return false;
}

async function separateIndicadosData(cpf) {
	const indicado = await db.getIndicadoRespostas(cpf);

	let newMap = chartsMaps.avaliador360pre;
	const commomKeys = ['avalias', 'exemplo', 'melhora'];
	const size = newMap.length / commomKeys.length;
	const data = []; // contains only the answers from pre

	for (let i = 1; i <= size; i++) {
		const aux = {};
		aux.titlePre = newMap.find((x) => x.paramName === `${commomKeys[0]}${i}`); aux.titlePre = `Q${i}. ${aux.titlePre.questionName}`;
		commomKeys.forEach((element) => {
			aux[`${element}Pre`] = indicado.reduce((prev, cur) => `${prev} ${cur.pre && cur.pre[`${element}${i}`] ? `--${cur.pre[`${element}${i}`]}` : ''}`, '');
		});
		data.push(aux);
	}

	const result = []; // mixes pre and pos
	newMap = chartsMaps.avaliador360pos;
	commomKeys.pop(); // pos doesnt have "melhora"
	const posKeys = ['houve_evolucao', 'onde_evolucao'];

	for (let i = 1; i <= size; i++) {
		const aux = data[i - 1]; // getting aux from the previous array
		aux.titlePos = newMap.find((x) => x.paramName === `${commomKeys[0]}${i}`); aux.titlePos = `Q${i}. ${aux.titlePos.questionName}`;
    commomKeys.forEach((element) => { // eslint-disable-line
			aux[`${element}Pos`] = indicado.reduce((prev, cur) => `${prev} ${cur.pos && cur.pos[`${element}${i}`] ? `--${cur.pos[`${element}${i}`]}` : ''}`, '');
		});
    commomKeys.forEach((element) => { // eslint-disable-line
			aux.houveEvolucao = indicado.reduce((prev, cur) => `${prev} ${cur.pos && cur.pos[posKeys[0]] ? `--${cur.pos[posKeys[0]]}` : ''}`, '');
			aux.ondeEvolucao = indicado.reduce((prev, cur) => `${prev} ${cur.pos && cur.pos[posKeys[1]] ? `--${cur.pos[posKeys[1]]}` : ''}`, '');
		});

		result.push(aux);
	}

	return result;
}

// check if the generated pdf wont be created empty
async function checkIfDataExists(data) {
	let check = false;

	for (let i = 0; i < data.length; i++) {
		const element = data[i];

		if (element.avaliasPre || element.exemploPre || element.melhoraPre || element.avaliasPos || data[0].houveEvolucao || data[0].ondeEvolucao) {
			check = true; i = data.length;
		}
	}

	return check;
}

async function buildIndicadoChart(cpf) {
	const data = await separateIndicadosData(cpf);

	if (data && await checkIfDataExists(data) === true) {
		const styleDiv = 'font-size:10pt;margin-left:1.5em;margin-right:1.5em;margin-bottom:0.5em;margin-top:2.0em';
		let html = `<p style="${styleDiv}"><h1>Resultados</h1></p>`;
		html += `<table style="width:100% border:1px solid black " border=1>
		<tr> <th>Questão Pré</th> <th>Avaliação Pré</th> <th>Oportunidade Pré</th> `;
		data.forEach((element) => {
			html += `<tr> <td>${element.titlePre}</td> 
			<td>${element.avaliasPre}</td> <td>${element.melhoraPre}</td> </tr>`;
		});
		html += '</table><br><br>';
		html += `<table style="width:100% border:1px solid black" border=1>
		<tr> <th>Questão Pós</th> <th>Avaliação Pós</th>`;
		data.forEach((element) => {
			html += `<tr> <td>${element.titlePos}</td> <td>${element.avaliasPos}</td> </tr>`;
		});
		html += '</table>';

		html += `<p style="${styleDiv}"><h5>Houve evolução?</h5></p> <div> ${data[0].houveEvolucao} </div>`;
		html += `<p style="${styleDiv}"><h5>Onde houve evolução?</h5></p> <div> ${data[0].ondeEvolucao} </div>`;


		const createPDFAsync = promisify(help.pdf.create);
		const result = await createPDFAsync(html).then((tmp) => tmp).catch((err) => console.log(err));

		if (!result || !result.filename) { return { error: 'Não foi possível gerar o resultado da avaliação 360 da aluna' }; }
		return result;
	}
	return { error: 'Não foi possível recuperar as respostas para a avaliação 360 da aluna' };
}

async function formatSondagemPDF(buffer, name) {
	const img = [];
	for (let i = 0; i < buffer.length; i++) {
		img.push(buffer[i].toString('base64'));
	}

	const config = {
		base: `file://${process.cwd()}/mail_template/`,
	};

	let html = await fs.readFileSync(`${process.cwd()}/mail_template/chart.html`, 'utf-8');
	html = html.replace('{{name}}', name);
	html = html.replace('{{img0}}', img[0]);
	html = html.replace('{{img1}}', img[1]);
	const size = 50 - ((name.length - 1) * 0.95);
	html = html.replace('{{size}}', size);

	const createPDFAsync = promisify(help.pdf.create);
	const result = await createPDFAsync(html, config).then((tmp) => tmp).catch((err) => console.log(err));

	return result.filename;
}

/**
 * builds a pdf doc with the answers and grade variation of the sondagem questionnaires
 * @param {integer} cpf - aluno cpf
 * @return {object} obj with the temporary path of the pdf file. Ex: { filename: '/tmp/html-pdf-3098.pdf' }
 */
async function buildAlunoChart(cpf) {
	const respostas = await db.getAlunoRespostas(cpf);

	// check if user has every answer needed
	if (!respostas) { return { error: 'Não foi possível recuperar as respostas da Sondagem' }; }
	if (!respostas.pre) { return { error: 'Não respondeu a Sondagem Pré' }; }
	if (!respostas.pos) { return { error: 'Não respondeu a Sondagem Pós' }; }

	respostas.pre.answer_date = respostas.pre.answer_date ? await help.formatSondagem(respostas.pre.answer_date) : '';
	respostas.pos.answer_date = respostas.pos.answer_date ? await help.formatSondagem(respostas.pos.answer_date) : '';

	// divide the answers table into two to fit the page
	const size = [...chartsMaps.sondagem];
	const charts = [size.slice(0, 12), size.slice(12, 26), size.slice(26, 38), size.slice(38, size.length)];

	// calculates the average
	let media = 0; let divideBy = Object.keys(respostas.pre).length;
	Object.keys(respostas.pre).forEach((e) => { if (e !== 'cpf' && e !== 'answer_date') { media += parseInt(respostas.pre[e], 10); } });
	respostas.pre.media = (media / divideBy).toFixed(0);
	media = 0; divideBy = Object.keys(respostas.pos).length;
	Object.keys(respostas.pos).forEach((e) => { if (e !== 'cpf' && e !== 'answer_date') 	{ media += parseInt(respostas.pos[e], 10); } });
	respostas.pos.media = (media / divideBy).toFixed(0);
	media = 0; divideBy = 1; // we will use these two to ind the average later

	// header
	const styleDiv = 'font-size:10pt;margin-left:1.5em;margin-right:1.5em;margin-bottom:0.5em;margin-top:2.0em';
	let html = `<p style="${styleDiv}"><h3>Resultados Sondagem</h3></p>`;
	html += `<p>${await db.getTurmaName(respostas.turma_id)}<br>${respostas.nome}<br></p>`;

	// tables
	let questionNumber = -1;
	charts.forEach((map, i) => {
		html += `<table style="width:100% border:1px solid black; border-collapse:collapse; zoom:1" border=1 >
			<tr> <th>Questões</th> <th>Antes</th> <th>Depois</th> <th>Evolução</th> `;

		map.forEach((e) => {
			const questao = questionNumber !== -1 && questionNumber !== 0 ? `<td>${questionNumber}. ${e.questionName}</td>` : `<td align="center"><strong>${e.questionName}</strong></td>`;
			const key = e.paramName;
			const pre = respostas.pre[key] ? respostas.pre[key] : '';
			const pos = respostas.pos[key] ? respostas.pos[key] : '';
			let change = parseInt(pre, 10) && parseInt(pos, 10) ? help.getPercentageChange(pre, pos) : '';
			if (change) {
				media += parseInt(change, 10); divideBy += 1;
			}
			change = change ? `${change} %` : '';
			html += `<tr> ${questao} <td>${pre}</td> <td>${pos}</td> <td>${change}</td> </tr>`;
			questionNumber += 1;
		});

		if (i + 1 === charts.length) { // average of the evolution
			const evolution = (media / divideBy).toFixed(0);
			if (evolution) html += `<tr><td align="center"><strong>Evolução</strong></td> <td></td> <td></td> <td>${evolution} %</td> </tr>`;
		}

		html += '</table>';

		if (i + 1 !== charts.length) html += '<br><br><br>';
	});


	const createPDFAsync = promisify(help.pdf.create);
	const result = await createPDFAsync(html).then((tmp) => tmp).catch((err) => console.log(err));

	if (!result || !result.filename) { return { error: 'Não existe respostas para gerar o resultado da sondagem da aluna' }; }

	return result;
}

async function buildAlunosDocs(turmaID) {
	const alunos = await db.getAlunasFromTurma(turmaID);
	const result = [];

	for (let i = 0; i < alunos.length; i++) {
		const aluno = alunos[i];
		if (aluno && aluno.cpf) {
			const aux = await buildAlunoChart(aluno.cpf);
			if (aux && aux.filename) {
				result.push({ aluno: `${aluno.nome_completo}_${aluno.cpf}`, sondagem: aux.filename });
			} else if (aux && aux.error) {
				result.push({ aluno: `${aluno.nome_completo}_${aluno.cpf}`, error: aux.error });
			} else {
				result.push({ aluno: `${aluno.nome_completo}_${aluno.cpf}`, error: 'Erro inesperado na sondagem' });
			}

			// const aux2 = await buildIndicadoChart(aluno.cpf);
			// if (aux2 && aux2.filename) {
			// 	result.push({ aluno: aluno.nome_completo, avaliador360: aux2.filename });
			// } else if (aux2 && aux2.error) {
			// 	result.push({ aluno: aluno.nome_completo, error: aux2.error });
			// } else {
			// 	result.push({ aluno: aluno.nome_completo, error: 'Erro inesperado na avaliação 360' });
			// }
		}
	}

	return result;
}


module.exports = {
	buildAlunoChart, buildTurmaChart, separateIndicadosData, buildIndicadoChart, formatSondagemPDF, buildAlunosDocs,
};
