const form = document.getElementById('form-cadastro');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);

    // Save form data to sessionStorage
    for (let [key, value] of data.entries()) {
        sessionStorage.setItem(key, value);
    }

    fetch('/cadastrar.php', {
        method: 'POST',
        body: data,
    }).then((response) => {
        if (response.ok) {
            // Usuário cadastrado com sucesso!
            window.location.href = '/sucesso';
        } else {
            // Erro ao cadastrar usuário
            alert('Erro ao cadastrar usuário!');
        }
    });
});
