FROM ollama/ollama:latest

# Copia o script de inicialização
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 11434

# Executa o script quando o container inicia
ENTRYPOINT ["/entrypoint.sh"]
