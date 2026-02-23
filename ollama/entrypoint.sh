#!/bin/bash
set -e

# Inicia o Ollama em background
ollama serve &
OLLAMA_PID=$!

# Aguarda o Ollama estar pronto
sleep 10

# Tenta baixar o modelo, se falhar continua mesmo assim
ollama pull mistral || echo "Aviso: Não foi possível baixar mistral, usando versão em cache se disponível"

# Mantém o processo rodando
wait $OLLAMA_PID
