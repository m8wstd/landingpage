function playImageSound() {
    const audio = document.getElementById('clickSound');
    if (audio) {
        audio.volume = 0.15;
        audio.play()
            .catch(error => {
                console.error('Erro ao tentar tocar o áudio:', error);
            });
    }
}

function playPhotoSound() {
    const audio = document.getElementById('clickSound2');
    if (audio) {
        audio.volume = 0.25;
        audio.play()
            .catch(error => {
                console.error('Erro ao tentar tocar o áudio:', error);
            });
    }
}

/* contato */

document.addEventListener("DOMContentLoaded", () => {
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  const btnEmail = document.getElementById("btn-email");
  const mensagemInput = document.getElementById("mensagem");

  btnWhatsapp.addEventListener("click", () => {
    const mensagem = encodeURIComponent(mensagemInput.value || "Olá Maxwell, gostaria de mais informações!");
    const telefone = "5527974002669";
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
  });

  btnEmail.addEventListener("click", () => {
    const mensagem = encodeURIComponent(mensagemInput.value || "Olá Maxwell, gostaria de mais informações!");
    const email = "mw.dev.contact@proton.me";
    const assunto = encodeURIComponent("Contato via site");
    window.open(`mailto:${email}?subject=${assunto}&body=${mensagem}`, "_blank");
  });
});