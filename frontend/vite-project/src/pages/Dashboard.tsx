export default function Dashboard() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
      <h1>Bem-vindo ao School_Project</h1>
      
      <div style={{ 
        backgroundColor: "#2a2a2a", 
        padding: "30px", 
        borderRadius: "8px", 
        marginTop: "30px",
        lineHeight: "1.8"
      }}>
        <h2 style={{ marginTop: "0", color: "#61dafb" }}>O que é School_Project?</h2>
        <p style={{ fontSize: "16px", margin: "15px 0" }}>
          <strong>School_Project</strong> é uma plataforma inovadora que utiliza inteligência artificial 
          para gerar provas escolares de forma rápida, fácil e inteligente.
        </p>
        
        <h3 style={{ color: "#61dafb", marginTop: "25px" }}>Funcionalidades Principais:</h3>
        <ul style={{ textAlign: "left", display: "inline-block", margin: "15px 0" }}>
          <li style={{ marginBottom: "10px" }}>
            <strong>🤖 Geração com IA:</strong> Crie provas em segundos com a ajuda da inteligência artificial
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>📚 Repositório:</strong> Acesse e gerenciç um repositório de provas anteriores
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>⚙️ Customização:</strong> Selecione matéria, série e nível de dificuldade
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>💾 Salvar Provas:</strong> Guarde suas provas geradas para uso posterior
          </li>
        </ul>

        <h3 style={{ color: "#61dafb", marginTop: "25px" }}>Como Começar:</h3>
        <p style={{ fontSize: "14px", margin: "15px 0" }}>
          1. Acesse "Gerar Prova" para criar uma nova prova com IA<br />
          2. Preencha os dados da prova (matéria, série, tema)<br />
          3. Selecione o nível de dificuldade<br />
          4. Clique em "Gerar com IA" e aguarde a geração<br />
          5. Revise e salve a prova quando estiver satisfeito
        </p>
      </div>
    </div>
  )
}
