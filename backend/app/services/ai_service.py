import openai
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

def generate_questions(subject, grade, topic, difficulty):
    prompt = f"""
    Crie 5 questões de múltipla escolha sobre {topic} para alunos do {grade}.
    Dificuldade: {difficulty}.
    Retorne JSON com question, options e answer.
    """

    if not settings.OPENAI_API_KEY:
        # MOCK caso não tenha API
        return [
            {
                "question": f"O que é {topic}?",
                "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
                "answer": "Opção A"
            }
        ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message["content"]
