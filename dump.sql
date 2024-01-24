--CRIAÇÃO DA TABELA UNIFICADA
CREATE TABLE unify_table AS
SELECT
    fixed_database_1.data,
    fixed_database_1.vendas,
    fixed_database_1.valor_do_veiculo,
    fixed_database_1.nome,
    fixed_database_2.id_marca,
    fixed_database_2.marca
FROM
    fixed_database_1
JOIN
    fixed_database_2 ON fixed_database_1.id_marca_ = fixed_database_2.id_marca;

--MARCA MAIS VENDIDA:
SELECT marca, SUM(vendas) AS volume_de_vendas
FROM unify_table
GROUP BY marca
ORDER BY volume_de_vendas DESC
LIMIT 1;

--VEICULO DE MAIOR RECEIRA

SELECT nome, valor_do_veiculo
FROM unify_table
ORDER BY valor_do_veiculo DESC
LIMIT 1;

--VEICULO DE MENOR RECEITA:

SELECT nome, valor_do_veiculo
FROM unify_table
ORDER BY valor_do_veiculo ASC
LIMIT 1;

--MEDIA DE VENDAS DO ANO POR MARCA:
SELECT marca, strftime('%Y', data) AS ano, AVG(vendas) AS media_de_vendas
FROM unify_table
GROUP BY marca, ano
ORDER BY marca, ano;


--  verificar esse  Quais marcas geraram uma receita maior com número menor de vendas?

SELECT marca, SUM(vendas) AS total_de_vendas, SUM(valor_do_veiculo) AS receita_total
FROM tabela_unificada
GROUP BY marca
ORDER BY receita_total DESC, total_de_vendas ASC;
--

SELECT marca, SUM(vendas) AS total_de_vendas, SUM(valor_do_veiculo) AS receita_total
FROM unify_table
GROUP BY marca
ORDER BY receita_total DESC, total_de_vendas ASC;

SELECT marca, SUM(vendas) AS total_de_vendas, SUM(valor_do_veiculo) AS receita_total
FROM unify_table
GROUP BY marca
ORDER BY receita_total DESC, total_de_vendas ASC;