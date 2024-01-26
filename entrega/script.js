const fs = require('fs');

// 1.a) Função para ler os arquivos JSON
async function lerArquivosJSON() {
    try {
        const conteudoArquivo1 = await fs.promises.readFile('broken_database_1.json', 'utf-8');
        const conteudoArquivo2 = await fs.promises.readFile('broken_database_2.json', 'utf-8');

        const dados1 = JSON.parse(conteudoArquivo1);
        const dados2 = JSON.parse(conteudoArquivo2);

        return { dados1, dados2 };
    } catch (error) {
        console.error('Erro ao ler os arquivos JSON:', error);
        throw error;
    }
}

// 1.b)Função para corrigir os nomes
async function corrigirNomes() {
    try {
        const registros = await lerArquivosJSON();

        // Corrigir nomes em dados1
        if (registros.dados1) {
            for (let i = 0; i < registros.dados1.length; i++) {
                if (registros.dados1[i].nome) {
                    registros.dados1[i].nome = registros.dados1[i].nome.replace(/æ/g, 'a').replace(/ø/g, 'o');
                }
                if (registros.dados1[i].marca) {
                    registros.dados1[i].marca = registros.dados1[i].marca.replace(/æ/g, 'a').replace(/ø/g, 'o');
                }
            }
        }

        // Corrigir nomes em dados2
        if (registros.dados2) {
            for (let i = 0; i < registros.dados2.length; i++) {
                if (registros.dados2[i].nome) {
                    registros.dados2[i].nome = registros.dados2[i].nome.replace(/æ/g, 'a').replace(/ø/g, 'o');
                }
                if (registros.dados2[i].marca) {
                    registros.dados2[i].marca = registros.dados2[i].marca.replace(/æ/g, 'a').replace(/ø/g, 'o');
                }
            }
        }

        return registros;
    } catch (error) {
        console.error('Erro ao corrigir os nomes:', error);
        throw error;
    }
}

// 1.c)Função para corrigir as vendas
async function corrigirVendas() {
    try {
        const registros = await corrigirNomes();

        for (let i = 0; i < registros.dados1.length; i++) {
            if (typeof registros.dados1[i].vendas === 'string') {
                registros.dados1[i].vendas = parseFloat(registros.dados1[i].vendas);
            }
        }

        for (let i = 0; i < registros.dados2.length; i++) {
            if (typeof registros.dados2[i].vendas === 'string') {
                registros.dados2[i].vendas = parseFloat(registros.dados2[i].vendas);
            }
        }

        return registros;
    } catch (error) {
        console.error('Erro ao corrigir as vendas:', error);
        throw error;
    }
}

// 1.d) Função para exportar os arquivos JSON corrigidos
async function exportarArquivosCorrigidos() {
    try {
        const registrosCorrigidos = await corrigirVendas();

        const dadosJSON1 = JSON.stringify(registrosCorrigidos.dados1, null, 2);
        const dadosJSON2 = JSON.stringify(registrosCorrigidos.dados2, null, 2);

        await fs.promises.writeFile('fixed_database_1.json', dadosJSON1, 'utf-8');
        await fs.promises.writeFile('fixed_database_2.json', dadosJSON2, 'utf-8');

        console.log('Arquivos exportados com sucesso: fixed_database_1.json e fixed_database_2.json');
    } catch (error) {
        console.error('Erro ao exportar os arquivos corrigidos:', error);
    }
}

//função para exportar os arquivos JSON corrigidos
exportarArquivosCorrigidos();