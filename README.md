# School Project - Gerador de Provas com IA

Sistema inteligente para auxiliar professores na criação automatizada de provas personalizadas utilizando Inteligência Artificial.

---

## 📋 Resumo Executivo

O **School Project** é uma plataforma web full-stack que automatiza a geração de provas escolares utilizando IA local (Ollama com modelo Mistral). A solução permite que professores criem questões de múltipla escolha personalizadas em segundos, economizando tempo e padronizando a qualidade das avaliações.

**Impacto esperado:**
- Redução de 80% no tempo de criação de provas
- Padronização da qualidade das questões
- Banco de dados centralizado de avaliações
- Exportação profissional em PDF

---

## 🎯 Problema Identificado

### Desafio Enfrentado
Professores gastam em média **2-4 horas** por semana criando provas manualmente, enfrentando:

- **Falta de tempo:** Preparação de questões consome tempo que poderia ser usado no planejamento pedagógico
- **Qualidade irregular:** Questões criadas sob pressão podem ter dificuldade inadequada
- **Retrabalho constante:** Necessidade de adaptar provas para diferentes turmas/níveis
- **Desorganização:** Provas antigas perdidas ou mal arquivadas
- **Formatação inconsistente:** Documentos sem padrão profissional

### Justificativa
Automatizar a criação de provas com IA permite que professores:
1. Foquem na análise pedagógica dos resultados
2. Personalizem rapidamente avaliações por turma
3. Mantenham histórico organizado de provas aplicadas
4. Gerem materiais com qualidade profissional constante

---

## 💡 Descrição da Solução

### Como Funciona

O sistema oferece três funcionalidades principais:

#### 1. **Geração Inteligente de Provas**
- Professor preenche: Matéria, Série, Tema, Dificuldade e Número de Questões
- IA gera questões contextualizadas em português
- Questões incluem N alternativas + resposta correta
- Tempo de geração: 1-3 minutos

#### 2. **Repositório de Provas**
- Armazenamento permanente no MongoDB
- Visualização de todas as provas criadas
- Detalhamento completo de questões e gabaritos
- Busca por matéria, série ou data

#### 3. **Exportação em PDF**
- Download profissional com formatação padrão
- Página de questões + página de gabarito separada
- Pronto para impressão e distribuição

### Fluxo de Uso
```
Login → Gerar Prova → IA Processa → Revisar Questões → Salvar → Exportar PDF
```

---

## 🛠️ Processo de Desenvolvimento

### Metodologia Aplicada

**1. Design Thinking (Descoberta)**
- Conversas com professores para entender pain points
- Identificação do tempo gasto em criação manual de provas
- Análise de ferramentas existentes no mercado

**2. Brainstorming (Ideação)**
- Exploração de soluções baseadas em IA generativa
- Análise sobre viabilidade técnica e custos
- Definição de MVP focado em questões de múltipla escolha

**3. Prototipação (Desenvolvimento Iterativo)**
- **Sprint 1:** Setup de infraestrutura (Docker, MongoDB, FastAPI)
- **Sprint 2:** Integração com IA (OpenAI → Ollama local)
- **Sprint 3:** Interface React com navegação
- **Sprint 4:** Sistema de autenticação e repositório
- **Sprint 5:** Geração de PDF e ajustes finais

**4. Testes e Refinamento**
- Testes de usabilidade
- Ajustes de prompts da IA para melhor qualidade
- Correção de bugs de networking Docker
- Otimização de performance

---

## 🔧 Detalhes Técnicos

### Stack Tecnológico

#### **Backend**
- **FastAPI** (Python 3.10) - Framework web moderno e performático
- **MongoDB** - Banco NoSQL para armazenamento de provas
- **Ollama + Mistral** - IA local para geração de questões
- **ReportLab** - Biblioteca para geração de PDFs
- **Uvicorn** - Servidor ASGI de alta performance

#### **Frontend**
- **React 19** - Biblioteca para interfaces declarativas
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool rápida e moderna
- **Axios** - Cliente HTTP para comunicação com API

#### **Infraestrutura**
- **Docker Compose** - Orquestração de 4 containers
- **Docker Networking** - Comunicação entre serviços
- **Volume Persistence** - Dados permanentes (MongoDB + Ollama)

### Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Usuário)                  │
│                 http://localhost:5173                   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│               CONTAINER: Frontend (Vite)                │
│  - React + TypeScript                                   │
│  - Axios API Client                                     │
│  - Roteamento React Router                              │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP REST
                         ▼
┌─────────────────────────────────────────────────────────┐
│             CONTAINER: Backend (FastAPI)                │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Rotas:                                         │   │
│  │  • /ai/generate (POST)                          │   │
│  │  • /exams (GET/POST)                            │   │
│  │  • /repository (GET)                            │   │
│  │  • /exams/{id}/download-pdf (GET)              │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Services:                                      │   │
│  │  • ai_service.py                                │   │
│  │  • exam_service.py                              │   │
│  │  • repository_service.py                        │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Utils:                                         │   │
│  │  • pdf_generator.py (ReportLab)                 │   │
│  └─────────────────────────────────────────────────┘   │
└────────┬────────────────────────────────────┬───────────┘
         │                                    │
         ▼                                    ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│  CONTAINER: MongoDB      │   │  CONTAINER: Ollama       │
│  - Porta: 27017          │   │  - Modelo: Mistral 7B    │
│  - Coleção: exams        │   │  - Porta: 11434          │
│  - Volume: mongo-data    │   │  - Volume: ollama-data   │
└──────────────────────────┘   └──────────────────────────┘
```

### Estrutura de Diretórios

```
school_project/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py          # Configurações e variáveis de ambiente
│   │   │   ├── database.py        # Conexão MongoDB
│   │   │   └── security.py        # Funções de autenticação
│   │   ├── models/
│   │   │   ├── exam_model.py      # Modelo de dados de provas
│   │   │   └── user_model.py      # Modelo de usuários
│   │   ├── routes/
│   │   │   ├── ai_routes.py       # Endpoints de IA
│   │   │   ├── exam_routes.py     # CRUD de provas
│   │   │   ├── repository_routes.py
│   │   │   └── auth_routes.py
│   │   ├── schemas/
│   │   │   ├── ai_schema.py       # Validação Pydantic
│   │   │   └── exam_schema.py
│   │   ├── services/
│   │   │   ├── ai_service.py      # Lógica de geração IA
│   │   │   ├── exam_service.py    # Lógica de provas
│   │   │   └── repository_service.py
│   │   ├── utils/
│   │   │   ├── pdf_generator.py   # Geração de PDF
│   │   │   └── prompts.py         # Templates de prompts
│   │   └── main.py                # Entry point FastAPI
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/vite-project/
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.ts       # Configuração Axios
│   │   ├── components/
│   │   │   ├── ExamCard.tsx       # Card de prova
│   │   │   ├── Loader.tsx         # Spinner de loading
│   │   │   └── Navbar.tsx         # Navegação
│   │   ├── pages/
│   │   │   ├── Login.tsx          # Autenticação
│   │   │   ├── Dashboard.tsx      # Home
│   │   │   ├── GenerateExam.tsx   # Geração de provas
│   │   │   └── Repository.tsx     # Listagem de provas
│   │   ├── services/
│   │   │   └── examService.ts     # Funções de API
│   │   ├── hooks/
│   │   │   └── useAuth.ts         # Hook de autenticação
│   │   ├── App.tsx                # Roteamento principal
│   │   └── main.tsx               # Entry point React
│   ├── Dockerfile
│   └── package.json
│
├── ollama/
│   ├── Dockerfile
│   └── entrypoint.sh              # Script de auto-download do Mistral
│
└── docker-compose.yaml            # Orquestração de serviços
```

### Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/ai/generate` | Gera questões com IA |
| POST | `/exams` | Salva prova no banco |
| GET | `/exams` | Lista todas as provas |
| GET | `/repository` | Lista provas do repositório |
| GET | `/exams/{id}/download-pdf` | Download PDF da prova |
| POST | `/auth/login` | Autenticação de usuário |

### Modelo de Dados (MongoDB)

```json
{
  "_id": "ObjectId",
  "title": "Prova de Matemática",
  "subject": "matemática",
  "grade": "5º ano",
  "topic": "frações",
  "difficulty": "medium",
  "questions": [
    {
      "question": "Quanto é 1/2 + 1/4?",
      "options": ["1/4", "3/4", "1/2", "1"],
      "answer": "3/4"
    }
  ]
}
```

---

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- 8GB RAM mínimo (para rodar modelo Mistral)
- Portas disponíveis: 5173, 8000, 27017, 11434

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <repo-url>
cd school_project
```

2. **Configure variáveis de ambiente**
```bash
cd backend
cp .env.example .env
# Edite .env com suas configurações
```

3. **Suba os containers**
```bash
docker compose up --build
```

4. **Aguarde o download do modelo (primeira execução)**
O Ollama baixará o Mistral (~4GB) automaticamente.

5. **Acesse a aplicação**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Documentação Swagger: http://localhost:8000/docs

### Credenciais de Teste
- **Email:** professorTeste
- **Senha:** (qualquer valor)

---

## 🔗 Links Úteis

### Documentação Técnica
- **FastAPI Docs:** http://localhost:8000/docs
- **API Reference:** http://localhost:8000/redoc

### Recursos Externos
- [Ollama Documentation](https://ollama.ai/docs)
- [Mistral AI Model](https://mistral.ai/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)

---

## 📚 Aprendizados e Próximos Passos

**Técnico:**
- Integração de IA local vs APIs pagas (custo-benefício)
- Orquestração de múltiplos containers com Docker
- Parsing robusto de JSON retornado por LLMs
- Networking entre containers Docker
- Geração de PDFs dinâmicos com Python

**Processo:**
- Importância de MVP bem definido
- Iteração rápida com feedback de usuários
- Prototipação antes de implementação completa
- Documentação contínua facilita manutenção

**Negócio:**
- Validação de problema real antes de construir solução
- Trade-offs entre funcionalidades e tempo de desenvolvimento
- Valor de soluções que economizam tempo recorrente

### Limitações Atuais

- Suporte apenas para questões de múltipla escolha
- Geração pode levar 1-3 minutos (limitação do modelo local)
- Sem sistema de múltiplos usuários (apenas mock)
- Sem personalização manual de provas antes de salvar o PDF

### Roadmap Futuro

**Curto Prazo**
- [ ] Adicionar questões dissertativas
- [ ] Implementar sistema completo de autenticação (JWT)
- [ ] Adicionar filtros e busca no repositório
- [ ] Permitir edição de questões geradas
- [ ] Suporte a imagens nas questões

**Médio Prazo**
- [ ] Dashboard com estatísticas de uso
- [ ] Sistema de compartilhamento entre professores
- [ ] Integração com Google Classroom
- [ ] Modo offline com cache
- [ ] Aplicativo mobile (React Native)
- [ ] Possivel Sistema de RAG para gerar provas mais específicas

**Longo Prazo**
- [ ] Análise de performance de alunos
- [ ] Recomendação de questões baseada em desempenho
- [ ] Banco de questões colaborativo
- [ ] Marketplace de provas prontas
- [ ] Suporte multi-idioma

---

## 👥 Equipe

- **Desenvolvedor Full-Stack:** [Cadu Santana]

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato

Para dúvidas, sugestões ou feedback:
- **LinkedIn:** [Cadu Santana](https://www.linkedin.com/in/cadu-santana-46972b217/)
- **Issues:** [GitHub Issues]

---

**Desenvolvido para facilitar a vida dos professores**
