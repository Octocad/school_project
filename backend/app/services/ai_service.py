import requests
import json
from app.core.config import settings

OLLAMA_API_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "mistral"

def generate_questions(subject, grade, topic, difficulty):
    prompt = f"""Você é um gerador de questões escolares. Retorne EXATAMENTE um JSON (nada mais, nada menos).

Procure no seu repertório de conhecimento sobre {subject} e
Gere 5 questões de múltipla escolha em relação a: {topic}
Série: {grade}
Dificuldade: {difficulty}

OBRIGADO: Retorne APENAS este formato JSON válido:
[
{{"question": "Qual é a capital do Brasil?", "options": ["Rio", "São Paulo", "Brasília", "Salvador"], "answer": "Brasília"}},
{{"question": "Quanto é 2+2?", "options": ["3", "4", "5", "6"], "answer": "4"}}
]

Retorne SOMENTE o JSON, sem texto adicional."""

    # Tenta usar Ollama primeiro
    try:
        print(f"[DEBUG] Enviando prompt para Ollama ({OLLAMA_MODEL})...")
        response = requests.post(
            OLLAMA_API_URL,
            json={
                "model": OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False
            },
            timeout=300  # 5 minutos
        )
        
        print(f"[DEBUG] Status da resposta: {response.status_code}")
        
        if response.status_code == 200:
            result_text = response.json()["response"]
            print(f"[DEBUG] Resposta bruta: {result_text[:200]}...")
            
            # Tenta parsear JSON da resposta
            try:
                # Remove possíveis caracteres extras antes/depois do JSON
                json_start = result_text.find('[')
                json_end = result_text.rfind(']') + 1
                
                if json_start != -1 and json_end > json_start:
                    json_str = result_text[json_start:json_end]
                    parsed = json.loads(json_str)
                    print(f"[DEBUG] JSON parseado com sucesso!")
                    return parsed
            except json.JSONDecodeError as e:
                print(f"[DEBUG] Erro ao fazer parse do JSON: {e}")
                print(f"[DEBUG] Retornando resposta bruta como texto")
                return [{"question": result_text, "options": [], "answer": ""}]
        else:
            print(f"[DEBUG] Erro HTTP: {response.status_code}")
    except requests.exceptions.Timeout:
        print(f"[DEBUG] TIMEOUT: Ollama demorou muito")
    except requests.exceptions.ConnectionError:
        print(f"[DEBUG] ERRO: Não conseguiu conectar em {OLLAMA_API_URL}")
    except Exception as e:
        print(f"[DEBUG] Erro ao conectar com Ollama: {e}")
    
    # MOCK caso Ollama não esteja disponível
    print(f"[DEBUG] Retornando resposta MOCK")
    return [
        {
            "question": f"O que é {topic}?",
            "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
            "answer": "Opção A"
        }
    ]
