
module.exports = {
	up(queryInterface, Sequelize) {
		return queryInterface.createTable('aluno_pesquisa', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			aluno_id: {
				type: Sequelize.INTEGER,
			},
			data_inicial: {
				type: Sequelize.DATE,
			},
			msgs_enviadas: {
				type: Sequelize.INTEGER,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down(queryInterface) {
		return queryInterface.dropTable('aluno_pesquisa');
	},
};
