document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const user = {};

        data.forEach((value, key) => {
            user[key] = value;
        });

        // Guarda o usuário sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(user));

        // redireciona para uma pagina de sucesso
        window.location.href = '../cadastro/sucesso.html';
    });
});

