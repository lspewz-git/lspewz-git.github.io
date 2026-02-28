const tg = window.Telegram.WebApp;
const statusEl = document.getElementById('status');

// Сообщаем Telegram, что приложение готово
tg.ready();
tg.expand(); // Разворачиваем на все окно

// Устанавливаем данные пользователя из Telegram
if (tg.initDataUnsafe?.user) {
    document.getElementById('user-name').innerText = `Привет, ${tg.initDataUnsafe.user.first_name}!`;
    document.getElementById('user-id').innerText = tg.initDataUnsafe.user.id;
}

const SEND_BUTTON = document.getElementById('send-btn');

SEND_BUTTON.addEventListener('click', async () => {
    // ВАЖНО: Замени эту ссылку на ту, которую выдал тебе localtunnel!
    const LOCAL_TUNNEL_URL = 'https://calm-books-attack.loca.lt'; 

    const dataToSend = {
        queryId: tg.initDataUnsafe.query_id,
        user_id: tg.initDataUnsafe.user?.id,
        message: "Кнопка нажата в WebApp!"
    };

    statusEl.innerText = "Отправка на твой ПК...";

    try {
        const response = await fetch(`${LOCAL_TUNNEL_URL}/api/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            statusEl.innerText = "Успешно! Проверь чат с ботом.";
            // Закрыть WebApp через секунду после успеха
            setTimeout(() => tg.close(), 1500);
        } else {
            statusEl.innerText = "Ошибка сервера: " + response.status;
        }
    } catch (error) {
        statusEl.innerText = "Ошибка: проверь запущен ли localtunnel";
        console.error(error);
    }
});
