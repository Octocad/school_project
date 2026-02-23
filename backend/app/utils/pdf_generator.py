from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter


def generate_pdf(exam):
    """
    Generates a PDF file from exam data using reportlab Canvas.
    
    Args:
        exam: Dictionary containing exam data
    
    Returns:
        BytesIO object containing the PDF data
    """
    buffer = BytesIO()
    
    # Create canvas (basic PDF drawing)
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    
    # Define positions and spacing
    y_position = height - 40
    line_height = 14
    
    # Title
    c.setFont("Helvetica-Bold", 18)
    title = exam.get('title', 'Prova sem título')
    c.drawString(40, y_position, title)
    y_position -= 40
    
    # Exam info
    c.setFont("Helvetica", 10)
    subject = exam.get('subject', 'N/A')
    grade = exam.get('grade', 'N/A')
    topic = exam.get('topic', 'N/A')
    difficulty = exam.get('difficulty', 'N/A')
    
    info_text = f"Matéria: {subject} | Série: {grade} | Assunto: {topic} | Dificuldade: {difficulty}"
    c.drawString(40, y_position, info_text)
    y_position -= 30
    
    # Questions
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y_position, "QUESTÕES")
    y_position -= 20
    
    questions = exam.get('questions', [])
    for idx, q in enumerate(questions, 1):
        # Check if we need a new page
        if y_position < 80:
            c.showPage()
            y_position = height - 40
        
        # Question header
        c.setFont("Helvetica-Bold", 11)
        question_text = f"Questão {idx}: {q.get('question', 'N/A')}"
        
        # Wrap long text
        words = question_text.split()
        line = ""
        for word in words:
            if len(line + word) > 80:
                c.drawString(40, y_position, line)
                y_position -= line_height
                line = word
            else:
                line += " " + word if line else word
        if line:
            c.drawString(40, y_position, line)
            y_position -= line_height
        
        # Options
        c.setFont("Helvetica", 10)
        options = q.get('options', [])
        for opt_idx, option in enumerate(options):
            letter_opt = chr(65 + opt_idx)  # A, B, C, D, etc.
            option_text = f"  {letter_opt}) {option}"
            
            # Wrap long options
            words = option_text.split()
            line = ""
            for word in words:
                if len(line + word) > 80:
                    c.drawString(40, y_position, line)
                    y_position -= line_height
                    line = "     " + word
                else:
                    line += " " + word if line else word
            if line:
                c.drawString(40, y_position, line)
                y_position -= line_height
        
        y_position -= 10
    
    # Gabarito (Answer Key)
    if questions:
        if y_position < 100:
            c.showPage()
            y_position = height - 40
        
        y_position -= 20
        c.setFont("Helvetica-Bold", 12)
        c.drawString(40, y_position, "GABARITO")
        y_position -= 20
        
        c.setFont("Helvetica", 10)
        for idx, q in enumerate(questions, 1):
            if y_position < 80:
                c.showPage()
                y_position = height - 40
            
            answer = q.get('answer', 'N/A')
            answer_text = f"Questão {idx}: {answer}"
            c.drawString(40, y_position, answer_text)
            y_position -= line_height
    
    c.save()
    buffer.seek(0)
    return buffer

