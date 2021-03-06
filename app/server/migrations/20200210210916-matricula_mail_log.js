module.exports = {
	up(queryInterface, Sequelize) {
		return queryInterface.createTable('matricula_mail_log', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sent_to: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sent_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			error: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			atividade_link: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},
	down(queryInterface) {
		return queryInterface.dropTable('matricula_mail_log');
	},
};
