import pg from "pg";

async function conectar() {
  const pool = new pg.Pool({
    connectionString: `postgres://aluno_20201214010034:1520@177.136.200.206:5439/temp?schema=aluno_20201214010034`,
  });
  const conexaoBancoDeDados = await pool.connect();
  console.log("Banco de dados conectado!");

  return conexaoBancoDeDados;
}

export default { conectar };