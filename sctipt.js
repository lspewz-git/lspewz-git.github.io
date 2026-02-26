const tg = window.Telegram.WebApp;
const API_URL = 'https://ВАШ_АДРЕС_ИЗ_NGROK.ngrok-free.app/api';

function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.getElementById(tab + '-tab').style.display = 'block';
    if(tab === 'list') loadFriends();
}

async function saveFriend() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    
    await fetch(`${API_URL}/friends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, _auth: tg.initData })
    });
    tg.showAlert("Сохранено!");
}

async function loadFriends() {
    const res = await fetch(`${API_URL}/friends?_auth=${encodeURIComponent(tg.initData)}`);
    const friends = await res.json();
    const container = document.getElementById('friends-list');
    container.innerHTML = friends.map(f => `
        <div class="card">
            <span>${f.name} (${f.date})</span>
            <button onclick="deleteFriend('${f._id}')">❌</button>
        </div>
    `).join('');
}

async function deleteFriend(id) {
    await fetch(`${API_URL}/friends/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _auth: tg.initData })
    });
    loadFriends();
}
