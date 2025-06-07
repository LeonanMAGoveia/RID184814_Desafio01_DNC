document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#formulario form');
    const nameInput = contactForm.querySelector('.form-input[name="Name"]'); 
    const emailInput = contactForm.querySelector('.form-input[name="Email"]'); 
    
    contactForm.addEventListener('submit', (event) => {
        // Remove quaisquer mensagens de erro anteriores para evitar acúmulo.
        contactForm.querySelectorAll('.error-message').forEach(msg => msg.remove());
        let formIsValid = true;

        // Validação do campo Nome
        if (nameInput.value.trim() === '') {
            displayError(nameInput, 'Por favor, preencha seu nome.');
            formIsValid = false;
        }

        // Validação do campo Email
        if (emailInput.value.trim() === '') {
            displayError(emailInput, 'Por favor, preencha seu e-mail.');
            formIsValid = false;
        } else if (!validateEmailFormat(emailInput.value.trim())) {
            displayError(emailInput, 'Por favor, insira um e-mail válido.');
            formIsValid = false;
        }

        // Previne o envio padrão do formulário, crucial para a validação customizada.
        event.preventDefault(); 
        
        // Se o formulário não for válido, rola a página para o primeiro erro.
        if (!formIsValid) {
            const firstErrorMsg = contactForm.querySelector('.error-message');
            if (firstErrorMsg) {
                firstErrorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Ação de sucesso (apenas para demonstração)
            alert('Formulário enviado com sucesso!');
            contactForm.reset(); // Limpa os campos do formulário
        }
    });

    /**
     * Cria e exibe uma mensagem de erro abaixo do campo de input especificado.
     * @param {HTMLElement} inputElement O campo de input ao qual a mensagem de erro se refere.
     * @param {string} message A mensagem de erro a ser exibida.
     */
    function displayError(inputElement, message) {
        const errorParagraph = document.createElement('p');
        errorParagraph.classList.add('error-message');
        errorParagraph.textContent = message;
        
        // Estilos para garantir que a mensagem seja visível e alinhada
        errorParagraph.style.color = '#FF4D4D'; // Vermelho vibrante
        errorParagraph.style.fontSize = '1em'; // Garante um tamanho legível
        errorParagraph.style.marginTop = '8px'; // Aumenta um pouco a margem superior
        errorParagraph.style.marginBottom = '10px'; // Adiciona margem inferior para separar do próximo elemento
        errorParagraph.style.textAlign = 'left';
        errorParagraph.style.boxSizing = 'border-box'; // Inclui padding e borda na largura

        // Para alinhar com o input, pegamos a largura real do input
        // e centralizamos o parágrafo de erro.
        // O input é centralizado pelo text-align: center do pai (#formulario).
        // A mensagem de erro também precisa ser tratada como um bloco centralizado.
        errorParagraph.style.width = inputElement.offsetWidth + 'px'; 
        errorParagraph.style.marginLeft = 'auto'; 
        errorParagraph.style.marginRight = 'auto';
        
        // Ajusta o padding para alinhar o texto com o texto do input
        errorParagraph.style.paddingLeft = '20px'; 
        errorParagraph.style.display = 'block'; // Garante que seja um bloco para aplicar margin: auto

        // Inserção da mensagem no DOM. Inserimos após o input.
        // Se o input estiver dentro de uma div pai, a mensagem de erro também será colocada lá.
        inputElement.parentNode.insertBefore(errorParagraph, inputElement.nextSibling);
    }

    /**
     * Valida o formato de um endereço de e-mail usando uma expressão regular.
     * @param {string} email O endereço de e-mail a ser validado.
     * @returns {boolean} True se o e-mail for válido, False caso contrário.
     */
    function validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});