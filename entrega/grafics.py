import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('unify_table.csv')
vendas_por_marca = df.groupby('marca')['vendas'].sum().sort_values(ascending=False)
porcentagens = (vendas_por_marca / vendas_por_marca.sum()) * 100

cores = sns.color_palette('pastel')[0:len(vendas_por_marca)]
sns.set_palette(cores)
sns.set(style="whitegrid")

plt.figure(figsize=(10, 6))
plt.pie(vendas_por_marca, labels=None, autopct='', startangle=140, colors=cores)

legend_labels = [f'{marca} ({percentagem:.1f}%)' for marca, percentagem in zip(vendas_por_marca.index, porcentagens)]
plt.legend(legend_labels, title='Marcas', bbox_to_anchor=(1, 0.5), loc="center left", fontsize='small')
plt.title('Distribuição de Vendas por Marca')
plt.show()

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
df = pd.read_csv('unify_table.csv')
df['receita'] = df['vendas'] * df['valor_do_veiculo']

media_vendas_por_marca = df.groupby('marca')['vendas'].mean().sort_values(ascending=False)
plt.figure(figsize=(12, 6))
sns.barplot(x=media_vendas_por_marca.index, y=media_vendas_por_marca, palette='Purples')
plt.xlabel('Marca')
plt.ylabel('Média de Vendas')
plt.title('Média de Vendas por Marca no Ano')
for i, valor in enumerate(media_vendas_por_marca):
    plt.text(i, valor + 0.2, f'{valor:.2f}', ha='center', va='bottom', rotation=45, fontsize=8)
plt.tight_layout()
plt.show()

import pandas as pd
import matplotlib.pyplot as plt
df = pd.read_csv('unify_table.csv')
df['receita'] = df['vendas'] * df['valor_do_veiculo']

receita_por_veiculo = df.groupby('nome').agg({'vendas': 'sum', 'receita': 'sum'}).sort_values(by='receita', ascending=False)

plt.figure(figsize=(12, 8))
bars = plt.barh(receita_por_veiculo.index, receita_por_veiculo['receita'], color='skyblue')

for bar in bars:
    plt.text(bar.get_width() + 5000, bar.get_y() + bar.get_height()/2, 
             f'R${bar.get_width():,.2f}', va='center')
plt.xlabel('Receita')
plt.ylabel('Veículo')
plt.title('Receita por Veículo')

legendas = [f'{nome}: R${receita:,.2f}' for nome, receita in zip(receita_por_veiculo.index, receita_por_veiculo['receita'])]
plt.legend(legendas, title='Legenda', bbox_to_anchor=(1, 1), loc='upper left')
plt.gca().invert_yaxis()
plt.show()


