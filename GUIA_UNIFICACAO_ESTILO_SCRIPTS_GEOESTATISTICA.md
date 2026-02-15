# Guia de unificacao de estilo para scripts didaticos de geoestatistica

## Objetivo

Este documento consolida a avaliacao dos 5 scripts (`Declustering.html`, `Estimation.html`, `Lagrange.html`, `Simulation.html`, `Variography.html`) e propoe um padrao unico para melhorar:

- intuicao conceitual;
- progressao de aprendizado;
- consistencia visual e textual entre os materiais.

---

## Diagnostico rapido (visao geral)

### Pontos fortes atuais

- Os scripts cobrem etapas-chave do fluxo geoestatistico (variografia, estimacao, simulacao, declustering, fundamento matematico).
- Ha bastante interatividade (canvas, sliders, mapas, tabelas, comparacoes).
- Os scripts de estimacao/simulacao ja possuem varios elementos tecnicos importantes (matrizes, passo a passo, comparacao de metodos).

### Principais barreiras ao aprendizado

1. **Inconsistencia de idioma e tom didatico (estado inicial)**
   - Havia mistura de ingles e portugues entre os scripts.
   - Havia tambem mistura pontual de idiomas dentro de alguns arquivos.

2. **Inconsistencia visual forte**
   - `Lagrange.html` usa tema escuro/estetica editorial, enquanto os demais usam tema claro de laboratorio.
   - Titulacao e hierarquia visual variam bastante (`h1` vs `h2`, subtitulos, secoes).

3. **Carga cognitiva alta em telas tecnicas**
   - `Estimation.html` e `Simulation.html` exibem muitos controles e blocos tecnicos sem trilha guiada explicita.
   - Para alunos iniciantes, e dificil identificar "o que fazer primeiro".

4. **Termos e simbolos nem sempre padronizados**
   - Ex.: "Polygonal/Voronoi", "Mean/E-type", "Summary/Results", "Show Labels/Labels".
   - A mesma ideia aparece com nomenclatura diferente em scripts distintos.

---

## Avaliacao por arquivo e sugestoes

## 1) Declustering.html

### O que funciona bem
- Comparacao de varios metodos de declustering no mesmo ambiente.
- Bons componentes visuais (comparacao de pesos, CDF, tabela de estatisticas).

### O que pode melhorar para intuicao
- Falta um roteiro curto do experimento ("passo 1, 2, 3").
- Usuario pode ativar metodos sem criterio didatico claro para interpretar diferencas.

### Sugestoes
- Adicionar bloco fixo "Como usar este laboratorio" no topo:
  1. carregar dados;
  2. aplicar metodo A;
  3. observar mudanca na media/CDF;
  4. comparar com metodo B.
- Incluir "Pergunta-guia" por metodo (ex.: "Este metodo aumenta peso em regioes pouco amostradas?").
- Criar um badge de metodo ativo (ex.: "Metodo atual: Voronoi").

## 2) Estimation.html

### O que funciona bem
- Cobertura tecnica robusta (krigagem, IDW, NN, matrizes, variograma).
- Comparador de metodos e boas saidas diagnosticas.

### O que pode melhorar para intuicao
- Excesso de blocos detalhados simultaneos para iniciantes.
- Falta separacao clara entre "modo iniciante" e "modo avancado".

### Sugestoes
- Colocar secoes tecnicas (matrizes, inversas, decomposicoes) dentro de paines expansivos.
- Criar dois modos:
  - **Essencial**: Z*, sigma2, pesos e mapa;
  - **Detalhado**: matrizes, inversas, decomposicoes.
- Padronizar nomes:
  - `Estimate (Z*)`
  - `Kriging variance (sigma2)`
  - `Slope of regression (SR)`
  - `Lagrange multiplier (mu)`.

## 3) Lagrange.html

### O que funciona bem
- Excelente narrativa conceitual e visual.
- Muito bom para construir intuicao geometrica.

### O que pode melhorar para unificacao
- Estilo visual e tipografico muito diferente dos outros 4 scripts.
- Dificulta sensacao de "suite unica" para o aluno.

### Sugestoes
- Manter conteudo didatico, mas alinhar UI-base com os outros scripts:
  - mesma familia de espacamento;
  - padrao de botoes;
  - padrao de caixas informativas;
  - mesmo esquema de nomes de secoes.
- Incluir ligacao explicita para os outros laboratorios:
  - "Agora aplique essa intuicao em Estimation/Simulation".

## 4) Simulation.html

### O que funciona bem
- Passo a passo da SGS e histogramas sao didaticamente fortes.
- Integra normal score e declustering.

### O que pode melhorar para intuicao
- Mistura de idiomas em labels e mensagens.
- Parametros avancados aparecem cedo demais para usuario iniciante.

### Sugestoes
- Criar trilha em 3 niveis:
  1. simulacao basica (rodar N realizacoes);
  2. interpretacao de incerteza (media/std);
  3. analise detalhada (passo a passo e vizinhos).
- Padronizar 100% idioma.
- Adicionar textos curtos "O que observar neste grafico?" nos histogramas.

## 5) Variography.html

### O que funciona bem
- Muito completo: variograma omni/direcional, ajuste de modelo, dados de imagem.
- Ferramentas praticas para ensino aplicado.

### O que pode melhorar para intuicao
- Dois contextos diferentes ("dados pontuais" e "imagem") no mesmo fluxo, sem separacao pedagogica forte.
- Muitos controles sem priorizacao.

### Sugestoes
- Separar em abas:
  - **Modo Dados Pontuais**
  - **Modo Imagem**
- Inserir presets didaticos:
  - isotropico simples;
  - anisotropico moderado;
  - efeito pepita alto.
- Exibir validacao de parametro em tempo real (ex.: lag muito alto para o alcance dos dados).

---

## Padrao unico recomendado (style system didatico)

## A) Idioma e microcopy

- Definir **um idioma unico** para toda a suite (padrao adotado: ingles).
- Tom: objetivo, instrucional, curto.
- Padrao de comandos em botoes: verbo no infinitivo + objeto.
  - Ex.: "Calcular variograma", "Rodar simulacoes", "Comparar metodos".

## B) Hierarquia de layout (igual nos 5 scripts)

1. **Cabecalho didatico**
   - titulo do laboratorio;
   - objetivo em 1 frase;
   - pre-requisitos.

2. **Coluna esquerda: Controles**
   - Secao 1: Dados
   - Secao 2: Modelo/Parametros
   - Secao 3: Execucao

3. **Coluna direita: Resultados**
   - Secao 4: Resultado principal
   - Secao 5: Diagnosticos
   - Secao 6: Interpretacao

## C) Semantica visual padronizada

- Azul: configuracao/modelo.
- Verde: resultado final/convergencia.
- Roxo: simulacao/estocastico.
- Ambar: atencao/transformacoes.
- Vermelho: erro/entrada invalida.

## D) Componentes didaticos comuns

Adicionar em todos:

- **"Como usar em 3 passos"** (bloco fixo no topo).
- **"Pergunta-guia"** por experimento.
- **"Checklist de interpretacao"** ao lado do resultado principal.
- **tooltip de simbolos** para `Z*`, `sigma2`, `mu`, `SR`, `CDF`, `nugget`, `sill`, `range`.

## E) Progressao pedagogica (iniciante -> avancado)

- `Modo Essencial` (padrao aberto):
  - poucos parametros;
  - resultado principal e leitura rapida.
- `Modo Avancado` (expansivel):
  - matrizes, detalhes numericos, decomposicoes e diagnosticos completos.

---

## Roadmap pratico de implementacao

## Fase 1 (quick wins, baixo risco)

1. Padronizar idioma dos 5 scripts.
2. Padronizar nomes de secoes e botoes.
3. Inserir bloco "Como usar em 3 passos" em todos.
4. Unificar titulos/subtitulos e termos tecnicos.

## Fase 2 (ganho didatico alto)

1. Criar modo Essencial vs Avancado.
2. Inserir perguntas-guia e checklists de interpretacao.
3. Adicionar presets didaticos (variograma/simulacao/estimacao).

## Fase 3 (refino de experiencia)

1. Tokens visuais compartilhados (cores, espacamentos, tipografia).
2. Componentes reutilizaveis (cards, toasts, tabelas, banners de ajuda).
3. Cross-links entre scripts (fluxo de estudo recomendado).

---

## Fluxo de estudo recomendado para o aluno (ordem dos scripts)

1. `Lagrange.html` (intuicao geometrica do problema de otimizacao)
2. `Variography.html` (estrutura espacial)
3. `Estimation.html` (estimacao pontual e mapas)
4. `Declustering.html` (impacto de amostragem preferencial)
5. `Simulation.html` (incerteza e multiplas realizacoes)

Assim o aluno avanca de fundamento -> modelagem -> estimacao -> correcao amostral -> simulacao.

